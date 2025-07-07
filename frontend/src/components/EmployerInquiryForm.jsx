// frontend/src/components/EmployerInquiryForm.jsx
import React, { useEffect } from 'react';
import { useForm }           from 'react-hook-form';
import { zodResolver }       from '@hookform/resolvers/zod';
import { useMutation }       from '@tanstack/react-query';
import { employerInquirySchema } from '../schemas/employerInquirySchema';
import { createEmployerInquiry } from '../services/employerInquiries';
import Button                from './ui/Button';
import '../styles/Employers.css';

export default function EmployerInquiryForm() {
  const inquiryMut = useMutation({
    mutationFn: data => createEmployerInquiry(data)
  });

  useEffect(() => {
    if (inquiryMut.isSuccess || inquiryMut.isError) {
      const t = setTimeout(() => inquiryMut.reset(), 3000);
      return () => clearTimeout(t);
    }
  }, [inquiryMut]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    resolver: zodResolver(employerInquirySchema),
    mode: 'all'
  });

  return (
    <form className="em-form" onSubmit={handleSubmit(data => inquiryMut.mutate(data))}>
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

      <label>
        Email Address
        <input type="email" {...register('email')} />
        {errors.email && <p className="form-error">{errors.email.message}</p>}
      </label>

      <label>
        Phone Number
        <input type="tel" {...register('phone')} />
        {errors.phone && <p className="form-error">{errors.phone.message}</p>}
      </label>

      <label>
        Industry
        <select {...register('industry')}>
          <option value="">Select industry</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Logistics">Logistics</option>
          <option value="Domestic Support">Domestic Support</option>
          <option value="Other">Other</option>
        </select>
        {errors.industry && <p className="form-error">{errors.industry.message}</p>}
      </label>

      <label>
        Number of Positions
        <input type="number" {...register('positions')} />
        {errors.positions && <p className="form-error">{errors.positions.message}</p>}
      </label>

      <label>
        Job Requirements & Details
        <textarea rows={4} {...register('details')} />
        {errors.details && <p className="form-error">{errors.details.message}</p>}
      </label>

      <Button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? 'Submitting…' : 'Submit Request'}
      </Button>

      {inquiryMut.isSuccess && <div className="em-success">✅ Your request has been submitted!</div>}
      {inquiryMut.isError   && <div className="em-error">{inquiryMut.error.message}</div>}
    </form>
  );
}
