import { Section, SectionTitle } from '../Section'
import { TerminalBlock } from '../ui/TerminalBlock'
import type { AboutData } from '../../types/content'

export function About({ data }: { data: AboutData }) {
  const { summary } = data

  return (
    <Section id="about">
      <SectionTitle>about</SectionTitle>
      <TerminalBlock title="README.md" prompt="cat">
        <div className="about__content">
          <p className="about__text">{summary}</p>
        </div>
      </TerminalBlock>
    </Section>
  )
}
