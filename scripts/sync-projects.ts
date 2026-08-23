#!/usr/bin/env bun
/**
 * sync-projects.ts — keep the projects section of src/data/content.json in
 * sync with GitHub, and open a PR when something changes.
 *
 * Eligibility: public, non-fork, non-archived repos of GH_USER, not in
 * EXCLUDE, WITH a repo description (a descriptionless repo isn't ready to
 * showcase). Already-listed projects are always kept, order = pushedAt desc.
 * Auto-adds are capped at MAX_PROJECTS. Existing tech/link fields survive.
 *
 * Local dry-run:  bun scripts/sync-projects.ts          (writes file, prints plan)
 * CI:             OPEN_PR=1 GH_TOKEN=… bun scripts/sync-projects.ts
 */
import { $, file } from 'bun'
import { join } from 'node:path'
import { isDeepStrictEqual } from 'node:util'

const GH_USER = 'dave-palt'
const REPO_SLUG = 'dave-palt/portfolio'
const BRANCH = 'sync/new-projects'
const MAX_PROJECTS = 8
const EXCLUDE = new Set(['portfolio'])

const CONTENT_PATH = join(import.meta.dir, '../src/data/content.json')

type Repo = {
  name: string
  fork: boolean
  archived: boolean
  description: string | null
  html_url: string
  pushed_at: string
  primary_language?: { name: string } | null
}

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN
const headers: Record<string, string> = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'portfolio-sync',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
}

async function gh(path: string, init?: RequestInit): Promise<any> {
  const res = await fetch(`https://api.github.com${path}`, { ...init, headers })
  if (!res.ok) throw new Error(`${init?.method ?? 'GET'} ${path} -> ${res.status} ${await res.text()}`)
  return res.json()
}

/**
 * Serialize preserving the file's compact style: flat arrays collapse without
 * padding (["a", "b"]), flat objects collapse with padding ({ "k": "v" }),
 * nested structures keep 2-space indentation. Deterministic → idempotent.
 */
function formatContent(data: any): string {
  let out = JSON.stringify(data, null, 2)
  for (let i = 0; i < 4; i++) {
    const before = out
    out = out
      .replace(/\[[^\[\]{}]*\]/g, (m) => `[${m.replace(/\[\s*|\s*\]/g, '').replace(/\s*\n\s*/g, ' ').replace(/,\s+/g, ', ')}]`)
      .replace(/\{[^{}\[\]]*\}/g, (m) => `{ ${m.replace(/^\{\s*|\s*\}$/g, '').replace(/\s*\n\s*/g, ' ').replace(/,\s+/g, ', ')} }`)
    if (out === before) break
  }
  return out + '\n'
}

const originalText = await file(CONTENT_PATH).text()
const content = JSON.parse(originalText)
const projectsSection = content.sections.find((s: any) => s.type === 'projects')
if (!projectsSection) throw new Error('projects section not found')

const changes: string[] = []

// ---------- fetch + filter repos ----------
const repos: Repo[] = await gh(`/users/${GH_USER}/repos?per_page=100&sort=pushed`)
const eligible = repos
  .filter((r) => !r.fork && !r.archived && !EXCLUDE.has(r.name))
  .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))

// ---------- build merged list ----------
const kept = projectsSection.data.items.filter((p: any) =>
  eligible.some((r) => r.name === p.name),
)
const known = new Set(kept.map((p: any) => p.name))
const candidates = eligible.filter((r) => !known.has(r.name))
const skipped = candidates.filter((r) => !r.description?.trim())
// /users/…/repos omits primary_language — fetch it per addition (usually 0–1)
const additions = []
for (const r of candidates.filter((r) => r.description?.trim()).slice(0, Math.max(0, MAX_PROJECTS - kept.length))) {
  const detail = await gh(`/repos/${GH_USER}/${r.name}`)
  additions.push({
    name: r.name,
    description: r.description!.trim(),
    url: r.html_url,
    ...(detail.language ? { tech: [detail.language] } : {}),
  })
}

if (skipped.length) {
  console.log(`note: skipping (no repo description): ${skipped.map((r) => r.name).join(', ')}`)
}

const merged = [...kept, ...additions]
  .sort((a: any, b: any) => {
    const ra = eligible.find((r) => r.name === a.name)
    const rb = eligible.find((r) => r.name === b.name)
    if (ra && rb) return rb.pushed_at.localeCompare(ra.pushed_at)
    if (ra) return -1
    if (rb) return 1
    return 0
  })
  .slice(0, MAX_PROJECTS)

// ---------- diff ----------
const currentNames: string[] = projectsSection.data.items.map((p: any) => p.name)
const newNames: string[] = merged.map((p: any) => p.name)
for (const n of newNames) {
  if (!currentNames.includes(n)) {
    const r = eligible.find((x) => x.name === n)
    changes.push(`+ ${n} — ${r?.description ?? ''}`)
  }
}
for (const n of currentNames) {
  if (!newNames.includes(n)) changes.push(`- ${n} (removed)`)
}
if (currentNames.join() !== newNames.join() && !changes.some((c) => c.startsWith('+') || c.startsWith('-'))) {
  changes.push(`~ reordered: ${newNames.join(', ')}`)
}
for (const p of merged) {
  const r = eligible.find((x) => x.name === p.name)
  if (r?.description?.trim() && r.description.trim() !== p.description) {
    if (currentNames.includes(p.name)) {
      // curated local description wins for already-listed projects; note drift as FYI
      changes.push(`~ ${p.name}: repo description differs from portfolio (kept portfolio version)`)
    } else {
      p.description = r.description.trim()
    }
  }
}

// ---------- stats sync ----------
const statsSection = content.sections.find((s: any) => s.type === 'stats')
if (statsSection) {
  const stat = statsSection.data.items.find((i: any) => i.label === 'Open Source Projects')
  if (stat && stat.value !== String(merged.length)) {
    stat.value = String(merged.length)
    changes.push(`~ stats: Open Source Projects ${stat.value} → ${merged.length}`)
  }
}

if (changes.length === 0) {
  console.log('✓ projects already in sync — nothing to do')
  process.exit(0)
}
console.log('changes:\n  ' + changes.join('\n  '))

// ---------- write ----------
projectsSection.data.items = merged
const formatted = formatContent(content)
if (!isDeepStrictEqual(JSON.parse(formatted), content)) {
  throw new Error('internal error: formatter changed data — refusing to write')
}
if (formatted === originalText) {
  console.log('✓ no file delta (notes above are FYI only) — nothing to commit')
  process.exit(0)
}
await Bun.write(CONTENT_PATH, formatted)

// ---------- optional: branch + PR (CI) ----------
if (process.env.OPEN_PR === '1') {
  await $`git config user.name "portfolio-sync-bot"`.quiet()
  await $`git config user.email "actions@github.com"`.quiet()
  await $`git checkout -B ${BRANCH}`.quiet()
  await $`git add ${CONTENT_PATH}`.quiet()
  await $`git commit -m "chore(sync): refresh projects from GitHub"`.quiet()
  await $`git push origin ${BRANCH} --force`.quiet()

  const body = [
    'Auto-generated by `scripts/sync-projects.ts` (weekly via `sync-projects.yml`, or manual dispatch).',
    '',
    ...changes.map((c) => `- ${c.replace(/^[+~-] /, '')}`),
    '',
    'Merge to publish. Descriptions/tech tags are yours to curate — manual edits to listed projects persist (the script only fills in new additions).',
  ].join('\n')

  try {
    const pr = await gh(`/repos/${REPO_SLUG}/pulls`, {
      method: 'POST',
      body: JSON.stringify({
        title: 'chore(sync): refresh projects from GitHub',
        body,
        base: 'main',
        head: BRANCH,
      }),
    })
    console.log(`✓ PR opened: ${pr.html_url}`)
  } catch (e: any) {
    if (String(e.message).includes('already exists')) {
      console.log('✓ PR already open on this branch — force-pushed updated commit')
    } else {
      throw e
    }
  }
}
