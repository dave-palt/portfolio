import { Section, SectionTitle } from '../Section'
import { TerminalBlock } from '../ui/TerminalBlock'
import type { ContactData } from '../../types/content'

export function Contact({ data }: { data: ContactData }) {
  const { email, linkedin, github, location } = data

  return (
    <Section id="contact">
      <SectionTitle>contact</SectionTitle>
      <TerminalBlock title="connect.sh" prompt="$">
        <div className="contact__content">
          <div className="contact__line">
            <span className="comment"># Let's connect!</span>
          </div>
          <div className="contact__line">
            <span className="variable">EMAIL</span>
            <span className="operator">=</span>
            <a href={`mailto:${email}`} className="string link">
              "{email}"
            </a>
          </div>
          {linkedin && (
            <div className="contact__line">
              <span className="variable">LINKEDIN</span>
              <span className="operator">=</span>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="string link">
                "linkedin/in/davide-palchetti"
              </a>
            </div>
          )}
          {github && (
            <div className="contact__line">
              <span className="variable">GITHUB</span>
              <span className="operator">=</span>
              <a href={github} target="_blank" rel="noopener noreferrer" className="string link">
                "github.com/dave-palt"
              </a>
            </div>
          )}
          {location && (
            <div className="contact__line">
              <span className="variable">LOCATION</span>
              <span className="operator">=</span>
              <span className="string">"{location}"</span>
            </div>
          )}
        </div>
      </TerminalBlock>
    </Section>
  )
}
