import { Section, SectionTitle } from '../Section'
import { TerminalBlock } from '../ui/TerminalBlock'
import type { ProjectData } from '../../types/content'

export function Projects({ data }: { data: ProjectData }) {
  const { items } = data

  return (
    <Section id="projects">
      <SectionTitle>projects</SectionTitle>
      <TerminalBlock title="git@github.com:dave-palt" prompt="$">
        <div className="projects__content">
          <div className="projects__line">
            <span className="comment"># Side projects & open source</span>
          </div>
          {items.map((item, i) => (
            <div className="projects__item" key={i}>
              <div className="projects__line">
                <span className="operator">{`> `}</span>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="projects__name link">
                  {item.name}
                </a>
                {item.link && (
                  <>
                    <span className="punctuation">{'  '}</span>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="projects__demo link">
                      [demo]
                    </a>
                  </>
                )}
              </div>
              <div className="projects__line projects__line--desc">
                <span className="projects__description">{item.description}</span>
              </div>
              {item.tech && (
                <div className="projects__line projects__line--tech">
                  {item.tech.map((t, j) => (
                    <span key={j} className="projects__tech">{t}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </TerminalBlock>
    </Section>
  )
}
