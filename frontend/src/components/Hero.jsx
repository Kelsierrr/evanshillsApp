import { Link } from 'react-router-dom'
import '../styles/Hero.css'
import Button from './ui/Button'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">
          Connecting Zimbabwe's Talent to <span className="accent">Global Opportunities</span>
        </h1>
        <p className="hero-sub">
          Your trusted international recruitment partner specializing in healthcare, logistics, and domestic support roles across the UK, Canada, and UAE.
        </p>
        <div className="hero-ctas">
          <Button variant="default" size="lg" asChild>
            <Link to="/job-seekers">Apply Now</Link>
          </Button>
          <Button variant="outline" size="lg" className="hero-btn-secondary" asChild>
            <Link to="/employers">Hire Talent</Link>
          </Button>
        </div>
      </div>
    </section>
)
}
