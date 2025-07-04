import Header from '../Header';
import Footer from '../Footer';
import Button from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Users, Award, Clock, Globe, CheckCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createEmployerInquiry } from '../../services/employerInquiries';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employerInquirySchema } from '../../schemas/employerInquirySchema';
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

  const inquiryMut = useMutation({ mutationFn: data => createEmployerInquiry(data) });

  // Auto-dismiss banners
  useEffect(() => {
    if (inquiryMut.isSuccess || inquiryMut.isError) {
      const t = setTimeout(() => inquiryMut.reset(), 3000);
      return () => clearTimeout(t);
    }
  }, [inquiryMut]);
  
  // RHF + Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    resolver: zodResolver(employerInquirySchema),
    mode: 'onChange'
  });
  
  const onSubmit = data => inquiryMut.mutate({
    companyName:   data.companyName,
    contactPerson: data.contactPerson,
    email:         data.email,
    phone:         data.phone,
    industry:      data.industry,
    positions:     Number(data.positions),
    details:       data.details,
  });
  
  

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

  {inquiryMut.isSuccess && <div className="em-success">✅ Your request has been submitted!</div>}
  {inquiryMut.isError   && <div className="em-error">{inquiryMut.error.message}</div>}

  <Card>
    <CardContent>
      <form className="em-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="em-form-row">
          <label>
            Company Name
            <input {...register('companyName')} />
            {errors.companyName && <p className="form-error">{errors.companyName.message}</p>}
          </label>
          <label>
            Contact Person
            <input {...register('contactPerson')} />
            {errors.contactPerson && <p className="form-error">{errors.contactPerson.message}</p>}
          </label>
        </div>
        <div className="em-form-row">
          <label>
            Email
            <input type="email" {...register('email')} />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </label>
          <label>
            Phone
            <input type="tel" {...register('phone')} />
            {errors.phone && <p className="form-error">{errors.phone.message}</p>}
          </label>
        </div>
        <div className="em-form-row">
          <label>
            Industry
            <input {...register('industry')} />
            {errors.industry && <p className="form-error">{errors.industry.message}</p>}
          </label>
          <label>
            Number of Positions
            <input type="number" {...register('positions', { valueAsNumber: true })} />
            {errors.positions && <p className="form-error">{errors.positions.message}</p>}
          </label>
        </div>
        <label>
          Job Requirements & Details
          <textarea rows={4} {...register('details')} />
          {errors.details && <p className="form-error">{errors.details.message}</p>}
        </label>
        <Button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Submitting…' : 'Submit Request'}
        </Button>
      </form>
    </CardContent>
  </Card>
</section>
      <Footer />
    </>
  );
}
