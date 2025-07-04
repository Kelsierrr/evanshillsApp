import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm }          from 'react-hook-form';
import { zodResolver }      from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createServiceRequest } from '../../services/serviceRequests';
import { serviceRequestSchema } from '../../schemas/serviceRequestSchema';
import Header from '../Header';
import Footer from '../Footer';
import Button from '../ui/Button';
import '../../styles/ServiceRequest.css';

export default function ServiceRequest() {
  const { packageName } = useParams();

  const mutation = useMutation({
    mutationFn: data => createServiceRequest(data),
  });

  useEffect(() => {
    if (mutation.isSuccess || mutation.isError) {
      const t = setTimeout(() => mutation.reset(), 3000);
      return () => clearTimeout(t);
    }
  }, [mutation]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    resolver: zodResolver(serviceRequestSchema),
    mode: 'onChange'
  });

  const onSubmit = data => {
    // include the packageName from the URL
    mutation.mutate({ packageName, ...data });
  };

  return (
    <>
      <Header />
      <main className="sr-page">
        <Link to="/job-seekers">
          <Button variant="outline" size="sm">← Back to Packages</Button>
        </Link>

        <h1>Request: {packageName} Package</h1>

        {mutation.isSuccess && (
          <div className="sr-success">Your request has been submitted!</div>
        )}
        {mutation.isError && (
          <div className="sr-error">{mutation.error.message}</div>
        )}

<form className="sr-form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            Name
            <input {...register('name')} />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </label>

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

          <Button
            type="submit"
            variant="default"
            size="md"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? 'Submitting…' : 'Submit Request'}
          </Button>
        </form>
      </main>
      <Footer />
    </>
  );
}
