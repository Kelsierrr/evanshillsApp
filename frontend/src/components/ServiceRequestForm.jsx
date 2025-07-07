// frontend/src/components/ServiceRequestForm.jsx
import React, { useEffect } from 'react';
import { useParams }         from 'react-router-dom';
import { useForm }           from 'react-hook-form';
import { zodResolver }       from '@hookform/resolvers/zod';
import { useMutation }       from '@tanstack/react-query';
import { createServiceRequest } from '../services/serviceRequests';
import { z }                 from 'zod';
import Button                from './ui/Button';
import '../styles/ServiceRequest.css';

// Zod schema
export const serviceRequestSchema = z
  .object({
    name:  z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  })
  // we'll pick up packageName from the URL separately
  .strict();

export default function ServiceRequestForm() {
  // grab the selected package from the URL
  const { packageName } = useParams();

  // mutation setup
  const mutation = useMutation({
    mutationFn: data => createServiceRequest(data),
  });

  // auto-dismiss feedback
  useEffect(() => {
    if (mutation.isSuccess || mutation.isError) {
      const t = setTimeout(() => mutation.reset(), 3000);
      return () => clearTimeout(t);
    }
  }, [mutation]);

  // react-hook-form + zod
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(serviceRequestSchema),
    mode: 'all',
  });

  // on valid submit, include packageName
  const onSubmit = data => {
    mutation.mutate({ packageName, ...data });
  };

  return (
    <form className="sr-form" onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name
        <input {...register('name')} />
        {errors.name && <p className="sr-error">{errors.name.message}</p>}
      </label>

      <label>
        Email
        <input type="email" {...register('email')} />
        {errors.email && <p className="sr-error">{errors.email.message}</p>}
      </label>

      <label>
        Phone
        <input type="tel" {...register('phone')} />
        {errors.phone && <p className="sr-error">{errors.phone.message}</p>}
      </label>

      <Button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? 'Submitting…' : 'Submit Request'}
      </Button>

      {mutation.isSuccess && <div className="sr-success">Your request has been submitted!</div>}
      {mutation.isError   && <div className="sr-error">{mutation.error.message}</div>}
    </form>
  );
}
