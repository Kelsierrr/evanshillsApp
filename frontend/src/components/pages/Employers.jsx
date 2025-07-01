import Header from '../Header';
import Footer from '../Footer';
import Button from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Users, Award, Clock, Globe, CheckCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createEmployerInquiry } from '../../services/employerInquiries';
import '../../styles/Employers.css';

export default function Employers() {
  const benefits = [
    {
      icon: <Users />,
      title: 'Pre-screened Talent',
      description: 'All candidates undergo rigorous screening and skills assessment before being presented to you.'
    },
    {
      icon: <Award />,
      title: 'Quality Assurance',
      description: 'We ensure all candidates meet international standards and possess required qualifications.'
    },
    {
      icon: <Clock />,
      title: 'Fast Turnaround',
      description: 'Reduced recruitment time with our efficient matching and placement process.'
    },
    {
      icon: <Globe />,
      title: 'Global Reach',
      description: 'Access to talent across Zimbabwe, Kenya, and South Africa through our expanding network.'
    }
  ];

  const vettingSteps = [
    'Comprehensive background checks',
    'Skills and qualification verification',
    'Language proficiency assessment',
    'Cultural orientation and training',
    'Medical and police clearances',
    'Reference verification',
    'Interview preparation and coaching'
  ];

  const [form, setForm] = useState({
    company: '', contact: '', email: '', phone: '',
    industry: '', positions: '', details: ''
  });
  
  const inquiryMut = useMutation({
    mutationFn: (data) => createEmployerInquiry(data),
    onSuccess: () => {
      setForm({ company:'', contact:'', email:'', phone:'',
                industry:'', positions:'', details:'' });
    }
  });

  useEffect(() => {
    if (inquiryMut.isSuccess || inquiryMut.isError) {
      const timer = setTimeout(() => {
        inquiryMut.reset();
      }, 3000); // hide after 3s
      return () => clearTimeout(timer);
    }
  }, [inquiryMut.isSuccess, inquiryMut.isError, inquiryMut]);
  
  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    inquiryMut.mutate({
      companyName:   form.company,
      contactPerson: form.contact,
      email:         form.email,
      phone:         form.phone,
      industry:      form.industry,
      positions:     Number(form.positions),
      details:       form.details,
    });
  };
  

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="em-hero">
        <div className="em-hero-content">
          <h1>Find Exceptional Talent from Zimbabwe</h1>
          <p>Partner with EvansHills Recruitment to access Africa’s most skilled and dedicated professionals. We deliver pre-screened, trained, and ready-to-work talent to meet your staffing needs.</p>
          <Button asChild size="lg">
            <a href="#inquiry">Request Talent</a>
          </Button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
          alt="Professional meeting"
        />
      </section>

      {/* Benefits */}
      <section className="em-benefits">
        <h2>Why Recruit from Zimbabwe?</h2>
        <div className="em-grid">
          {benefits.map((b, i) => (
            <Card key={i}>
              <CardContent className="em-benefit-card">
                <div className="em-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Vetting */}
      <section className="em-vetting">
        <div className="em-vetting-text">
          <h2>Our Comprehensive Vetting Process</h2>
          <p>Every candidate goes through our rigorous 7-step vetting process to ensure they meet your standards and are prepared for international work environments.</p>
          <ul>
            {vettingSteps.map((step, i) => (
              <li key={i}>
                <CheckCircle /> {step}
              </li>
            ))}
          </ul>
        </div>
        <Card>
          <CardContent className="em-stats">
            <div><strong>500+</strong><span>Successful Placements</span></div>
            <div><strong>98%</strong><span>Client Satisfaction</span></div>
            <div><strong>15+</strong><span>Years Experience</span></div>
          </CardContent>
        </Card>
      </section>

      {/* Testimonial */}
      <section className="em-testimonial">
        <blockquote>
          “EvansHills consistently delivers exceptional healthcare professionals. Their thorough vetting process saves us time and ensures we get qualified, dedicated staff who integrate seamlessly into our teams.”
        </blockquote>
        <p className="em-author">— Dr. Sarah Johnson, HR Director, NHS Trust London</p>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="em-inquiry">
        <h2>Request Talent</h2>
        {inquiryMut.isSuccess && (
    <div className="em-success">✅ Your request has been submitted!</div>
  )}
  {inquiryMut.isError && (
    <div className="em-error">{inquiryMut.error.message}</div>
  )}
        <Card>
          <CardContent>
            <form className="em-form" onSubmit={handleSubmit}>
              <div className="em-form-row">
                <label>
                  Company Name
                  <input name="company"   value={form.company}   onChange={handleChange} required />
                </label>
                <label>
                  Contact Person
                  <input name="contact"   value={form.contact}   onChange={handleChange} required />
                </label>
              </div>
              <div className="em-form-row">
                <label>
                  Email Address
                  <input name="email"     value={form.email}     onChange={handleChange} required />
                </label>
                <label>
                  Phone Number
                  <input name="phone"     value={form.phone}     onChange={handleChange} required />
                </label>
              </div>
              <div className="em-form-row">
                <label>
                  Industry
                  <select name="industry" value={form.industry}  onChange={handleChange}>
                    <option>Healthcare</option>
                    <option>Logistics</option>
                    <option>Domestic Support</option>
                    <option>Other</option>
                  </select>
                </label>
                <label>
                  Number of Positions
                  <input name="positions" type="number" value={form.positions} onChange={handleChange} required />
                </label>
              </div>
              <label>
                Job Requirements & Details
                <textarea name="details" rows="4" value={form.details} onChange={handleChange} required />
              </label>
              <Button type="submit" variant="default" size="md" disabled={inquiryMut.isLoading}>
              {inquiryMut.isLoading ? 'Submitting…' : 'Submit Request'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </>
  );
}
