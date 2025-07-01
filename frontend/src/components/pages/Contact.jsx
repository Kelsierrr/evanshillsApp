import Header from '../Header'
import Footer from '../Footer'
import Button from '../ui/Button'
import { Card, CardContent } from '../ui/Card'
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createContactInquiry } from '../../services/contactInquiries';
import '../../styles/Contact.css'

export default function Contact() {
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        subject: 'Job Application Inquiry',
        message: '', consent: false
      });
      
      const contactMut = useMutation({
        mutationFn: (data) => createContactInquiry(data),
        onSuccess: () => {
          setForm({ firstName:'', lastName:'', email:'', phone:'',
                    subject:'Job Application Inquiry', message:'', consent:false });
        }
      });

      useEffect(() => {
        if (contactMut.isSuccess || contactMut.isError) {
          const timer = setTimeout(() => {
            contactMut.reset();
          }, 3000);
          return () => clearTimeout(timer);
        }
      }, [contactMut.isSuccess, contactMut.isError, contactMut]);
      
      const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
      };
      
      const handleSubmit = (e) => {
        e.preventDefault();
        contactMut.mutate({
          firstName: form.firstName,
          lastName:  form.lastName,
          email:     form.email,
          phone:     form.phone,
          subject:   form.subject,
          message:   form.message,
          consent:   form.consent,
        });
      };
      

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>Ready to start your international career journey? Get in touch with our recruitment specialists today.</p>
      </section>

      {/* Contact Information */}
      <section className="contact-info">
        <Card>
          <CardContent>
            <h3>Office Address</h3>
            <p>
              123 Samora Machel Avenue<br/>
              Harare Central Business District<br/>
              Harare, Zimbabwe
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3>Phone Numbers</h3>
            <p>
              Main Office: +263 123 456 789<br/>
              WhatsApp: +263 987 654 321<br/>
              Emergency: +263 111 222 333
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3>Email Addresses</h3>
            <p>
              Info: info@evanshillsrecruitment.com<br/>
              Applications: apply@evanshillsrecruitment.com<br/>
              Employers: employers@evanshillsrecruitment.com
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3>Office Hours</h3>
            <p>
              Mon–Fri: 8 AM – 5 PM<br/>
              Sat: 9 AM – 1 PM<br/>
              Sun: Closed<br/>
              <strong>24/7 WhatsApp Support</strong>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        {contactMut.isSuccess && (
  <div className="cf-success">✅ Your message has been sent!</div>
)}
{contactMut.isError && (
  <div className="cf-error">{contactMut.error.message}</div>
)}

        <Card>
          <CardContent>
          <form className="contact-form" onSubmit={handleSubmit}>
              <div className="cf-row">
                <label>
                  First Name
                  <input name="firstName" value={form.firstName} onChange={handleChange} required />
                </label>
                <label>
                  Last Name
                  <input name="lastName"  value={form.lastName}  onChange={handleChange} required />
                </label>
              </div>
              <div className="cf-row">
                <label>
                  Email Address
                  <input name="email"     value={form.email}     onChange={handleChange} required />
                </label>
                <label>
                  Phone Number
                  <input name="phone"     value={form.phone}     onChange={handleChange} required />
                </label>
              </div>
              <label>
                Subject
                <select name="subject"  value={form.subject}  onChange={handleChange}>
                  <option>Job Application Inquiry</option>
                  <option>Employer Services</option>
                  <option>Visa Support Questions</option>
                  <option>General Inquiry</option>
                  <option>Complaint or Feedback</option>
                </select>
              </label>
              <label>
                Message
                <textarea name="message" rows="5" value={form.message} onChange={handleChange} required />
              </label>
              <label className="cf-consent">
                <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} required />
                I consent to being contacted by EvansHills Recruitment regarding my inquiry.
              </label>
              <Button type="submit" variant="default" size="md" disabled={contactMut.isLoading}>{contactMut.isLoading ? 'Sending…' : 'Send Message'}</Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Map Placeholder */}
      <section className="contact-map">
        <div className="map-placeholder">
          <p>Interactive map will be embedded here</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq">
        <h2>Frequently Asked Questions</h2>
        <details>
          <summary>How long does the recruitment process take?</summary>
          <p>The complete process typically takes 6–12 months, depending on the destination country, visa requirements, and job availability.</p>
        </details>
        <details>
          <summary>What industries do you specialize in?</summary>
          <p>We focus on healthcare, logistics, and domestic support roles across various international markets.</p>
        </details>
        <details>
          <summary>Do you assist with visa applications?</summary>
          <p>Yes, we provide end-to-end support for visa processing and related documentation.</p>
        </details>
      </section>

      <Footer />
    </>
  )
}
