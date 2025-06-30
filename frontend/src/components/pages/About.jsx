// src/components/pages/About.jsx
import Header from '../Header'
import Footer from '../Footer'
import { Card, CardContent } from '../ui/Card'
import '../../styles/About.css'

export default function About() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="about-hero">
        <h1>About EvansHills Recruitment</h1>
        <p>Bridging talent across continents with integrity, professionalism, and unwavering commitment to success.</p>
      </section>

      {/* Our Mission */}
      <section className="about-section">
        <div className="about-container">
          <div>
            <h2>Our Mission</h2>
            <p>
              At EvansHills Recruitment, we are dedicated to connecting Zimbabwe’s exceptional talent with life‐changing international opportunities. Talent knows no borders…
            </p>
          </div>
          <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop" alt="Our team at work" />
        </div>
      </section>

      {/* Founder */}
      <section className="about-section founder">
        <h2>Meet Our Founder</h2>
        <Card className="founder-card">
          <CardContent>
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop&crop=face"
              alt="Elvis Adoh"
              className="founder-img"
            />
            <div>
              <h3>Elvis Adoh</h3>
              <p>With over 15 years of experience … Elvis founded EvansHills Recruitment with a vision to transform how African talent connects with global opportunities.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Expansion */}
      <section className="about-section">
        <h2>Our Expansion</h2>
        <div className="expansion-grid">
          <Card><CardContent><h4>Zimbabwe</h4><p>Our flagship office in Harare…</p></CardContent></Card>
          <Card><CardContent><h4>Kenya</h4><p>Expanding our reach…</p></CardContent></Card>
          <Card><CardContent><h4>South Africa</h4><p>Serving talent continent‐wide…</p></CardContent></Card>
        </div>
      </section>

      <Footer />
    </>
  )
}
