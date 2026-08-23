import type { SectionType } from './types/content'
import content from './data/content.json'
import { 
  Hero, About, Stats, Projects, Experience, Skills, 
  Certifications, Education, Contact 
} from './components/content-types'
import './styles.css'

const sectionComponents = {
  hero: Hero,
  about: About,
  stats: Stats,
  projects: Projects,
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
            {['about', 'projects', 'experience', 'skills', 'contact'].map(id => (
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
        <p className="footer__donate">
          <span className="comment">{"// enjoy my free apps? "}</span>
          <a href="https://ko-fi.com/davepalt" target="_blank" rel="noopener noreferrer" className="footer__donate-link">
            ko-fi
          </a>
          <span className="comment">{" · "}</span>
          <a href="https://buymeacoffee.com/dave.palt" target="_blank" rel="noopener noreferrer" className="footer__donate-link">
            buy me a coffee
          </a>
        </p>
        <p className="footer__copyright">
          © {new Date().getFullYear()} {content.meta.author}
        </p>
      </footer>
    </div>
  )
}
