import { Section, SectionTitle } from '../Section'
import type { CertificationData } from '../../types/content'

export function Certifications({ data }: { data: CertificationData }) {
  const { items } = data

  return (
    <Section id="certifications">
      <SectionTitle>certifications</SectionTitle>
      <div className="certifications__grid">
        {items.map((item, index) => (
          <div key={index} className="certification__item">
            <div className="certification__header">
              <span className="certification__name">{item.name}</span>
            </div>
            <div className="certification__meta">
              <span className="certification__issuer">{item.issuer}</span>
              <span className="certification__separator">|</span>
              <span className="certification__date">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
