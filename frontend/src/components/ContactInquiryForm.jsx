// frontend/src/components/ContactInquiryForm.jsx
import React, { useEffect } from 'react';
import { useForm }           from 'react-hook-form';
import { zodResolver }       from '@hookform/resolvers/zod';
import { useMutation }       from '@tanstack/react-query';
import { createContactInquiry } from '../services/contactInquiries';
import { z }                 from 'zod';
import Button                from './ui/Button';
import '../styles/Contact.css';

// 1) Define the Zod schema
export const contactInquirySchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName:  z.string().min(1, 'Last name is required'),
  email:     z.string().email('Invalid email address'),
  phone:     z.string().min(10, 'Phone number must be at least 10 digits'),
  subject:   z.string().min(1, 'Subject is required'),
  message:   z.string().min(10, 'Message must be at least 10 characters'),
  consent:   z.literal(true, { errorMap: () => ({ message: 'You must consent before submitting' }) }),
});

export default function ContactInquiryForm() {
  // 2) Set up mutation
  const mutation = useMutation({
    mutationFn: data => createContactInquiry(data),
  });

  // 3) Auto‐dismiss success/error
  useEffect(() => {
    if (mutation.isSuccess || mutation.isError) {
      const t = setTimeout(() => mutation.reset(), 3000);
      return () => clearTimeout(t);
    }
  }, [mutation]);

  // 4) React Hook Form + Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactInquirySchema),
    mode: 'all',
  });

  return (
    <form className="contact-form" onSubmit={handleSubmit(data => mutation.mutate(data))}>
      <label>
        First Name
        <input {...register('firstName')} />
        {errors.firstName && <p className="cf-error">{errors.firstName.message}</p>}
      </label>

      <label>
        Last Name
        <input {...register('lastName')} />
        {errors.lastName && <p className="cf-error">{errors.lastName.message}</p>}
      </label>

      <label>
        Email Address
        <input type="email" {...register('email')} />
        {errors.email && <p className="cf-error">{errors.email.message}</p>}
      </label>

      <label>
        Phone Number
        <input type="tel" {...register('phone')} />
        {errors.phone && <p className="cf-error">{errors.phone.message}</p>}
      </label>

      <label>
        Subject
        <select {...register('subject')}>
          <option value="">Select a subject</option>
          <option value="Job Application Inquiry">Job Application Inquiry</option>
          <option value="Employer Services">Employer Services</option>
          <option value="Visa Support Questions">Visa Support Questions</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Complaint or Feedback">Complaint or Feedback</option>
        </select>
        {errors.subject && <p className="cf-error">{errors.subject.message}</p>}
      </label>

      <label>
        Message
        <textarea rows={5} {...register('message')} />
        {errors.message && <p className="cf-error">{errors.message.message}</p>}
      </label>

      <label className="cf-consent">
        <input type="checkbox" {...register('consent')} />
        I consent to being contacted by EvansHills Recruitment regarding my inquiry.
      </label>
      {errors.consent && <p className="cf-error">{errors.consent.message}</p>}

      <Button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </Button>

      {mutation.isSuccess && <div className="cf-success">✅ Your message has been sent!</div>}
      {mutation.isError   && <div className="cf-error">{mutation.error.message}</div>}
    </form>
  );
}
