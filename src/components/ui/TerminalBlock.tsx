import { ReactNode } from 'react'

type TerminalBlockProps = {
  title?: string
  children: ReactNode
  prompt?: string
  className?: string
}

export function TerminalBlock({ 
  title, 
  children, 
  prompt = '$',
  className = '' 
}: TerminalBlockProps) {
  return (
    <div className={`terminal-block ${className}`}>
      {title && (
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="btn-close"></span>
            <span className="btn-minimize"></span>
            <span className="btn-maximize"></span>
          </div>
          <span className="terminal-title">{title}</span>
        </div>
      )}
      <div className="terminal-body">
        <span className="prompt">{prompt}</span>
        <div className="terminal-content">
          {children}
        </div>
      </div>
    </div>
  )
}
