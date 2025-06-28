// src/components/pages/Home.jsx
import Header from '../Header'
import Hero from '../Hero'
import KeyRoles from '../KeyRoles'
import Testimonials from '../Testimonials'
import Footer from '../Footer'
import { useEffect, useState } from 'react'
import { fetchHealth } from '../../services/api'

export default function Home() {
    const [health, setHealth] = useState(null)

    useEffect(() => {
        fetchHealth()
            .then(data => setHealth(data))
            .catch(err => console.error('Failed to fetch health:', err))    
    }
    , []);
  return (
    <div>
      <Header />
      <Hero />
      <KeyRoles />
      <Testimonials />
      <Footer />
        {health && ( <div style={{ margin: '2rem 0', textAlign: 'center' }}>
          <strong>API Status:</strong> {health.status}
        </div>)}
    </div>
  )
}
