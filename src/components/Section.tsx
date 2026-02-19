import { ReactNode } from 'react'

type SectionProps = {
  id?: string
  children: ReactNode
  className?: string
}

export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`section ${className}`}>
      {children}
    </section>
  )
}

type SectionTitleProps = {
  children: ReactNode
  icon?: string
}

export function SectionTitle({ children, icon }: SectionTitleProps) {
  return (
    <h2 className="section__title">
      {icon && <span className="section__icon">{icon}</span>}
      <span className="comment">{"// "}</span>
      {children}
    </h2>
  )
}
