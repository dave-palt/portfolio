import { TypingText } from '../ui/TypingText'
import { TerminalBlock } from '../ui/TerminalBlock'
import type { HeroData } from '../../types/content'

export function Hero({ data }: { data: HeroData }) {
  const { name, title, tagline, terminalPrompt = '~/' } = data

  return (
    <section id="hero" className="hero">
      <TerminalBlock title="portfolio.sh" prompt={terminalPrompt}>
        <div className="hero__content">
          <div className="hero__line">
            <span className="keyword">const</span>{' '}
            <span className="variable">developer</span>{' '}
            <span className="operator">=</span>{' '}
            <span className="punctuation">{'{'}</span>
          </div>
          <div className="hero__line hero__line--indent">
            <span className="property">name</span>
            <span className="punctuation">:</span>{' '}
            <span className="string">"{name}"</span>
            <span className="punctuation">,</span>
          </div>
          <div className="hero__line hero__line--indent">
            <span className="property">title</span>
            <span className="punctuation">:</span>{' '}
            <TypingText text={`"${title}"`} speed={60} className="string" />
          </div>
          <div className="hero__line hero__line--indent">
            <span className="property">focus</span>
            <span className="punctuation">:</span>{' '}
            <span className="string">"{tagline}"</span>
          </div>
          <div className="hero__line">
            <span className="punctuation">{'}'}</span>
            <span className="punctuation">;</span>
          </div>
        </div>
      </TerminalBlock>
    </section>
  )
}
