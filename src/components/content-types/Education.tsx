import { Section, SectionTitle } from '../Section'
import type { EducationData } from '../../types/content'

export function Education({ data }: { data: EducationData }) {
  const { items } = data

  return (
    <Section id="education">
      <SectionTitle>education</SectionTitle>
      <div className="education__list">
        {items.map((item, index) => (
          <div key={index} className="education__item">
            <div className="education__header">
              <span className="education__institution">{item.institution}</span>
              <span className="education__period">{item.period}</span>
            </div>
            <div className="education__details">
              <span className="education__degree">{item.degree}</span>
              {item.field && (
                <>
                  <span className="education__separator">-</span>
                  <span className="education__field">{item.field}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
