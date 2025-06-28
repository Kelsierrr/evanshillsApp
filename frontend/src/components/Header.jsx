import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/Header.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    // add more routes as needed
  ]

  const isActive = (href) => location.pathname === href

  return (
    <header className="site-header">
      <nav className="header-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-main">Evans</span>
            <span className="logo-accent">Hills</span>
            <span className="logo-sub">Recruitment</span>
          </Link>
        </div>

        <ul className="nav-links">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.href} 
                className={isActive(item.href) ? 'active-link' : ''}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <button 
          className="menu-button" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      {isMenuOpen && (
        <ul className="mobile-nav-links">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.href} 
                className={isActive(item.href) ? 'active-link' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
