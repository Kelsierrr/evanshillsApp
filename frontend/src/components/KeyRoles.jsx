import '../styles/KeyRoles.css'
import { Card, CardContent } from './ui/Card'
import { Users, Briefcase, Home } from 'lucide-react'

const roles = [
  {
    icon: <Users />,
    title: 'Healthcare',
    list: ['Nurses', 'Care Assistants', 'Healthcare Support Workers'],
    destinations: 'UK, Canada, UAE'
  },
  {
    icon: <Briefcase />,
    title: 'Logistics',
    list: ['Truck Drivers', 'Warehouse Staff', 'Supply Chain Specialists'],
    destinations: 'UK, Canada, Australia'
  },
  {
    icon: <Home />,
    title: 'Domestic Support',
    list: ['House Helps', 'Childcare', 'Elderly Care'],
    destinations: 'UAE, Saudi Arabia, Qatar'
  }
]

export default function KeyRoles() {
  return (
    <section className="keyroles">
      <h2 className="keyroles-title">Key Recruitment Areas</h2>
      <p className="keyroles-sub">
        We specialize in connecting talented Zimbabweans with international opportunities.
      </p>
      <div className="keyroles-grid">
        {roles.map((role, i) => (
          <Card key={i} className="keyroles-card">
            <CardContent className="keyroles-content">
              <div className="keyroles-icon">{role.icon}</div>
              <h3 className="keyroles-card-title">{role.title}</h3>
              <ul className="keyroles-list">
                {role.list.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
              <div className="keyroles-dest">
                Destinations: {role.destinations}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
