export type HeroData = {
  name: string
  title: string
  tagline: string
  terminalPrompt?: string
}

export type AboutData = {
  summary: string
}

export type StatsData = {
  items: Array<{
    label: string
    value: string
    icon?: string
  }>
}

export type ExperienceData = {
  items: Array<{
    company: string
    role: string
    period: string
    location?: string
    description?: string
    technologies?: string[]
  }>
}

export type SkillsData = {
  categories: Array<{
    name: string
    skills: string[]
  }>
}

export type CertificationData = {
  items: Array<{
    name: string
    issuer: string
    date: string
    credentialUrl?: string
  }>
}

export type EducationData = {
  items: Array<{
    institution: string
    degree: string
    field?: string
    period: string
  }>
}

export type ProjectData = {
  items: Array<{
    name: string
    description: string
    url: string
    tech?: string[]
    link?: string
  }>
}

export type ContactData = {
  email: string
  linkedin?: string
  github?: string
  location?: string
  donate?: Array<{
    label: string
    url: string
  }>
}

export type SectionType = 
  | 'hero'
  | 'about'
  | 'stats'
  | 'projects'
  | 'experience'
  | 'skills'
  | 'certifications'
  | 'education'
  | 'contact'

export type Section<T = unknown> = {
  type: SectionType
  data: T
}

export type ContentSchema = {
  meta: {
    title: string
    description: string
    author: string
  }
  sections: Section[]
}

export type SectionMap = {
  hero: HeroData
  about: AboutData
  stats: StatsData
  projects: ProjectData
  experience: ExperienceData
  skills: SkillsData
  certifications: CertificationData
  education: EducationData
  contact: ContactData
}
