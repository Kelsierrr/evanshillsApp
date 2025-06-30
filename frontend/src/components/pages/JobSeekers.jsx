import Header from '../Header';
import Footer from '../Footer';
import Button from '../ui/Button';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { CheckCircle, ArrowRight, Upload, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../styles/JobSeekers.css';

export default function JobSeekers() {
  // Data for the sections
  const processSteps = [
    { step: 1, title: 'Application Submission', description: 'Submit your CV and complete our detailed application form' },
    { step: 2, title: 'Skills Assessment',      description: 'We evaluate your qualifications and experience against international standards' },
    { step: 3, title: 'Training & Preparation', description: 'Receive specialized training, interview preparation, and language support' },
    { step: 4, title: 'Job Matching',            description: 'We match you with suitable international employers' },
    { step: 5, title: 'Visa & Documentation',    description: 'Complete support with visa applications and required documentation' },
    { step: 6, title: 'Departure & Support',     description: 'Pre-departure briefing and ongoing support after placement' },
  ];

  const availableRoles = [
    { category: 'Healthcare', roles: ['Registered Nurses','Care Assistants','Healthcare Support Workers','Physiotherapists'], destinations: ['UK','Canada','UAE','Australia'] },
    { category: 'Logistics',   roles: ['Truck Drivers','Warehouse Supervisors','Supply Chain Specialists','Forklift Operators'], destinations: ['UK','Canada','Australia','New Zealand'] },
    { category: 'Domestic',    roles: ['House Helps','Childcare Specialists','Elderly Care','Personal Assistants'],     destinations: ['UAE','Saudi Arabia','Qatar','Kuwait'] },
  ];

  const serviceTiers = [
    { name: 'Basic',    price: '$500',  features: ['CV Review & Optimization','Basic Interview Preparation','Job Matching Service','Email Support'] },
    { name: 'Standard', price: '$1,000', popular: true, features: ['Everything in Basic','IELTS Training Support','Advanced Interview Coaching','Visa Application Guidance','Phone Support'] },
    { name: 'Premium',  price: '$1,500', features: ['Everything in Standard','Complete Visa Processing','Medical & Police Check Support','Pre-departure Training','24/7 Support','Post-placement Follow-up'] },
  ];

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="js-hero">
        <div className="js-hero-content">
          <h1>Start Your International Career Journey</h1>
          <p>Join thousands of Zimbabwean professionals who have successfully built careers abroad with our comprehensive recruitment and support services.</p>
          <Button variant="outline" size="lg">
            <Link to="/jobs">Browse Available Jobs</Link>
          </Button>
        </div>
      </section>

      {/* Process Steps */}
      <section className="js-process">
        <h2>Our Recruitment Process</h2>
        <div className="js-process-grid">
          {processSteps.map((s) => (
            <Card key={s.step}>
              <CardHeader>
                <div className="js-process-step">{s.step}</div>
                <h3>{s.title}</h3>
              </CardHeader>
              <CardContent>
                <p>{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Available Roles */}
      <section className="js-roles">
        <h2>Available Roles & Destinations</h2>
        <div className="js-roles-grid">
          {availableRoles.map((cat) => (
            <Card key={cat.category}>
              <CardHeader><h3>{cat.category}</h3></CardHeader>
              <CardContent>
                <ul>
                  {cat.roles.map((r)=> <li key={r}><CheckCircle /> {r}</li>)}
                </ul>
                <div className="js-dests">
                  {cat.destinations.join(', ')}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Service Tiers */}
      <section className="js-tiers">
        <h2>Choose Your Service Package</h2>
        <div className="js-tiers-grid">
          {serviceTiers.map((tier) => (
            <Card key={tier.name} className={tier.popular ? 'popular' : ''}>
              <CardHeader>
                <h3>{tier.name}</h3>
                <div className="js-tier-price">{tier.price}</div>
                {tier.popular && <div className="js-popular-badge"><Star /> Most Popular</div>}
              </CardHeader>
              <CardContent>
                <ul>
                  {tier.features.map((f)=> <li key={f}><CheckCircle /> {f}</li>)}
                </ul>
                <Link to={`/service-request/${encodeURIComponent(tier.name)}`}>
                      <Button variant={tier.popular ? 'default' : 'outline'}>
    Choose {tier.name}
                     </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Apply CTA */}
      <section className="js-apply-cta">
        <h2>Ready to Apply?</h2>
        <Button variant="default" size="lg">
          <Link to="/jobs">Browse Jobs</Link>
        </Button>
      </section>

      <Footer />
    </>
  );
}
