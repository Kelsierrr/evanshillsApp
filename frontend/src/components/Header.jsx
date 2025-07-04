// frontend/src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

export default function Header() {
  const navigate    = useNavigate();
  const location    = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // track auth
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(localStorage.getItem('token'));
  });
  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem('token')));
  }, [location.pathname]);
  
  function handleLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  }

  const navigation = [
    { name: 'Home',     href: '/' },
    { name: 'About',    href: '/about' },
    { name: 'Jobs',     href: '/jobs' },
    // …other public routes
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <header className="site-header">
      <nav className="header-container">
        {/* logo */}
        <div className="logo">
          <Link to="/">
            <span className="logo-main">Evans</span>
            <span className="logo-accent">Hills</span>
            <span className="logo-sub">Recruitment</span>
          </Link>
        </div>

        {/* desktop links */}
        <ul className="nav-links">
          {navigation.map(item => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={isActive(item.href) ? 'active-link' : ''}
              >
                {item.name}
              </Link>
            </li>
          ))}

          {/* auth links for desktop */}
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/register" className="auth-link">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="auth-link">
                  Log in
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/dashboard" className="auth-link">
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="auth-link  button-as-link">
                  Log out
                </button>
              </li>
            </>
          )}
        </ul>

        {/* mobile menu toggle */}
        <button
          className="menu-button"
          onClick={() => setIsMenuOpen(open => !open)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* mobile nav */}
      {isMenuOpen && (
        <ul className="mobile-nav-links">
          {navigation.map(item => (
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

          {/* auth links for mobile */}
          {!isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="auth-link"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="auth-link"
                >
                  Log in
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="auth-link"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="auth-link button-as-link"
                >
                  Log out
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </header>
);
}
