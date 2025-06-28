import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import '../../styles/Accordion.css'  // adjust path if needed

export default function Accordion({ children }) {
  return <div className="accordion">{children}</div>
}

export function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="accordion-item">
      <button
        className="accordion-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="accordion-title">{title}</span>
        <ChevronDown
          className={`accordion-icon ${isOpen ? 'open' : ''}`}
        />
      </button>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  )
}
