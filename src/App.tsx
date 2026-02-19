import type { SectionType } from './types/content'
import content from './data/content.json'
import { 
  Hero, About, Stats, Experience, Skills, 
  Certifications, Education, Contact 
} from './components/content-types'
import './styles.css'

const sectionComponents = {
  hero: Hero,
  about: About,
  stats: Stats,
  experience: Experience,
  skills: Skills,
  certifications: Certifications,
  education: Education,
  contact: Contact,
} as const

export function App() {

  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <span className="nav__logo">{'{ }'}</span>
          <div className="nav__links">
            {['about', 'experience', 'skills', 'contact'].map(id => (
              <a key={id} href={`#${id}`} className="nav__link">
                {id}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main className="main">
        {content.sections.map((section, index) => {
          const Component = sectionComponents[section.type as SectionType]
          if (!Component) return null
          // @ts-expect-error - dynamic component
          return <Component key={section.type || index} data={section.data} />
        })}
      </main>

      <footer className="footer">
        <p className="footer__text">
          <span className="comment">{`// Built with Bun + React`}</span>
        </p>
        <p className="footer__copyright">
          © {new Date().getFullYear()} {content.meta.author}
        </p>
      </footer>
    </div>
  )
}
