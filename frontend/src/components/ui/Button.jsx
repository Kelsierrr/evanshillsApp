import '../../styles/Button.css'

export default function Button({
  variant = 'default',   // default | outline | destructive
  size = 'md',           // sm | md | lg
  children,
  ...props
}) {
  const className = `btn btn-${variant} btn-${size} ${props.className || ''}`
  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}
