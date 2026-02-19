import { Section, SectionTitle } from '../Section'
import { Card, CardHeader, CardBody, Tag } from '../ui/Card'
import type { ExperienceData } from '../../types/content'

export function Experience({ data }: { data: ExperienceData }) {
  const { items } = data

  return (
    <Section id="experience">
      <SectionTitle>experience</SectionTitle>
      <div className="experience__timeline">
        {items.map((item, index) => (
          <Card key={index} variant="default" className="experience__item">
            <CardHeader subtitle={item.period}>
              <span className="experience__role">{item.role}</span>
              <span className="experience__company">@ {item.company}</span>
            </CardHeader>
            <CardBody>
              {item.location && (
                <p className="experience__location">{item.location}</p>
              )}
              {item.description && (
                <p className="experience__description">{item.description}</p>
              )}
              {item.technologies && (
                <div className="experience__tech">
                  {item.technologies.map((tech, i) => (
                    <Tag key={i}>{tech}</Tag>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </Section>
  )
}
