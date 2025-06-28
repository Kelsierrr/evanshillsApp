import "../../styles/Card.css"

// A simple wrapper
export function Card({ className = '', children, ...props }) {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  )
}

// Header section
export function CardHeader({ children, className = '' }) {
  return <div className={`card-header ${className}`}>{children}</div>
}

// Title (usually inside header)
export function CardTitle({ children, className = '' }) {
  return <h3 className={`card-title ${className}`}>{children}</h3>
}

// Content section
export function CardContent({ children, className = '' }) {
  return <div className={`card-content ${className}`}>{children}</div>
}
