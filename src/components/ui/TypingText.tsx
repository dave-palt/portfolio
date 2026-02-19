import { useEffect, useState } from 'react'

type TypingTextProps = {
  text: string
  speed?: number
  className?: string
  cursorChar?: string
  onComplete?: () => void
}

export function TypingText({ 
  text, 
  speed = 50, 
  className = '', 
  cursorChar = '▌',
  onComplete 
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setIsComplete(true)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, onComplete])

  return (
    <span className={className}>
      {displayedText}
      <span className={`cursor ${isComplete ? 'blink' : ''}`}>{cursorChar}</span>
    </span>
  )
}
