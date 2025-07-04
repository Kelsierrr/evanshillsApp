import Header from '../Header'
import Footer from '../Footer'
import Button from '../ui/Button'
import { Card, CardContent } from '../ui/Card'
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createContactInquiry } from '../../services/contactInquiries';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactInquirySchema } from '../../schemas/contactInquirySchema';
import '../../styles/Contact.css'

export default function Contact() {
  const contactMut = useMutation({
    mutationFn: data => createContactInquiry(data)
  });

  // auto-dismiss banners
  useEffect(() => {
    if (contactMut.isSuccess || contactMut.isError) {
      const t = setTimeout(() => contactMut.reset(), 3000);
      return () => clearTimeout(t);
    }
  }, [contactMut]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    resolver: zodResolver(contactInquirySchema),
    mode: 'onChange'
  });

  const onSubmit = data => {
    contactMut.mutate(data);
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
            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="cf-row">
                <label>
                  First Name
                  <input {...register('firstName')} />
                  {errors.firstName && (
                    <p className="form-error">{errors.firstName.message}</p>
                  )}
                </label>
                <label>
                  Last Name
                  <input {...register('lastName')} />
                  {errors.lastName && (
                    <p className="form-error">{errors.lastName.message}</p>
                  )}
                </label>
              </div>

              <div className="cf-row">
                <label>
                  Email Address
                  <input type="email" {...register('email')} />
                  {errors.email && (
                    <p className="form-error">{errors.email.message}</p>
                  )}
                </label>
                <label>
                  Phone Number
                  <input type="tel" {...register('phone')} />
                  {errors.phone && (
                    <p className="form-error">{errors.phone.message}</p>
                  )}
                </label>
              </div>

              <label>
                Subject
                <select {...register('subject')}>
                  <option value="Job Application Inquiry">Job Application Inquiry</option>
                  <option value="Employer Services">Employer Services</option>
                  <option value="Visa Support Questions">Visa Support Questions</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Complaint or Feedback">Complaint or Feedback</option>
                </select>
                {errors.subject && (
                  <p className="form-error">{errors.subject.message}</p>
                )}
              </label>

              <label>
                Message
                <textarea rows={5} {...register('message')}></textarea>
                {errors.message && (
                  <p className="form-error">{errors.message.message}</p>
                )}
              </label>

              <label className="cf-consent">
                <input type="checkbox" {...register('consent')} />
                I consent to being contacted by EvansHills Recruitment regarding my inquiry.
              </label>
              {errors.consent && (
                <p className="form-error">{errors.consent.message}</p>
              )}

              <Button
                type="submit"
                variant="default"
                size="md"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </>
  )
}
