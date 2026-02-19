import { Section, SectionTitle } from '../Section'
import type { StatsData } from '../../types/content'

export function Stats({ data }: { data: StatsData }) {
  const { items } = data

  return (
    <Section id="stats">
      <SectionTitle>stats</SectionTitle>
      <div className="stats__grid">
        {items.map((item, index) => (
          <div key={index} className="stats__item">
            <span className="stats__value">{item.value}</span>
            <span className="stats__label">{item.label}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}
