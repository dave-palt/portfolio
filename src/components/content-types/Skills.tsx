import { Section, SectionTitle } from '../Section'
import type { SkillsData } from '../../types/content'

export function Skills({ data }: { data: SkillsData }) {
  const { categories } = data

  return (
    <Section id="skills">
      <SectionTitle>skills</SectionTitle>
      <div className="skills__grid">
        {categories.map((category, index) => (
          <div key={index} className="skills__category">
            <h3 className="skills__category-name">
              <span className="punctuation">[</span>
              {category.name}
              <span className="punctuation">]</span>
            </h3>
            <ul className="skills__list">
              {category.skills.map((skill, i) => (
                <li key={i} className="skills__item">
                  <span className="operator">*</span> {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
