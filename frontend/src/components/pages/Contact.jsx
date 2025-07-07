import Header from '../Header'
import Footer from '../Footer'
// import Button from '../ui/Button'
import { Card, CardContent } from '../ui/Card'
import React from 'react';
import ContactInquiryForm from '../ContactInquiryForm';
import '../../styles/Contact.css'

export default function Contact() {

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
        <ContactInquiryForm />
      </section>

      <Footer />
    </>
  )
}
