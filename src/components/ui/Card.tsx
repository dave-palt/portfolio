import { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
  variant?: 'default' | 'outlined' | 'filled'
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  return (
    <div className={`card card--${variant} ${className}`}>
      {children}
    </div>
  )
}

type CardHeaderProps = {
  children: ReactNode
  subtitle?: string
}

export function CardHeader({ children, subtitle }: CardHeaderProps) {
  return (
    <div className="card__header">
      <h3 className="card__title">{children}</h3>
      {subtitle && <span className="card__subtitle">{subtitle}</span>}
    </div>
  )
}

type CardBodyProps = {
  children: ReactNode
}

export function CardBody({ children }: CardBodyProps) {
  return <div className="card__body">{children}</div>
}

type TagProps = {
  children: ReactNode
}

export function Tag({ children }: TagProps) {
  return <span className="tag">{children}</span>
}
