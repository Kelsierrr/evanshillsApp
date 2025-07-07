// frontend/src/components/pages/Apply.jsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMutation }    from '@tanstack/react-query';
import { createApplication } from '../../services/applications';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver }       from '@hookform/resolvers/zod';
import { applicationSchema } from '../../schemas/applicationSchema';
import Header  from '../Header';
import Footer  from '../Footer';
import Button  from '../ui/Button';
import '../../styles/Apply.css';

export default function Apply() {
  const { id: jobId } = useParams();

  const mutation = useMutation({
    mutationFn: data => createApplication(data)
  });

  // auto-dismiss toasts
  useEffect(() => {
    if (mutation.isSuccess || mutation.isError) {
      const t = setTimeout(() => mutation.reset(), 3000);
      return () => clearTimeout(t);
    }
  }, [mutation]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(applicationSchema),
    mode: 'all'
  });

  const [name, email, phone, coverLetter, resume] = useWatch({
    control,
    name: ['name', 'email', 'phone', 'coverLetter', 'resume']
  });

  const allFilled =
  typeof name === 'string' && name.trim().length > 0 &&
  typeof email === 'string' && email.trim().length > 0 &&
  typeof phone === 'string' && phone.trim().length > 0 &&
  typeof coverLetter === 'string'&& coverLetter.trim().length > 0 &&
  resume && resume.length > 0;

  const onSubmit = data => {
    const fd = new FormData();
    fd.append('jobId', jobId);
    fd.append('name', data.name);
    fd.append('email', data.email);
    fd.append('phone', data.phone);
    fd.append('coverLetter', data.coverLetter);
    const fileInput = document.querySelector('input[name="resume"]');
      if (fileInput.files.length > 0) {
        fd.append('resume', fileInput.files[0]);
        }
    mutation.mutate(fd);
  };

  return (
    <>
      <Header />
      <main className="apply-page">
        <Link to={`/jobs/${jobId}`}>
          <Button variant="outline" size="sm">← Back to Job</Button>
        </Link>

        <h1>Apply for This Job</h1>

        {mutation.isSuccess && (
          <div className="apply-success">✅ Your application has been submitted!</div>
        )}
        {mutation.isError && (
          <div className="apply-error">{mutation.error.message}</div>
        )}

        <form className="apply-form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            Name
            <input {...register('name')} />
            {errors.name && (
              <p className="form-error">{errors.name.message}</p>
            )}
          </label>

          <label>
            Email
            <input type="email" {...register('email')} />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </label>

          <label>
            Phone
            <input type="tel" {...register('phone')} />
            {errors.phone && (
              <p className="form-error">{errors.phone.message}</p>
            )}
          </label>

          <label>
            Cover Letter
            <textarea rows={6} {...register('coverLetter')}></textarea>
            {errors.coverLetter && (
              <p className="form-error">{errors.coverLetter.message}</p>
            )}
          </label>

          <label>
            Upload Resume (PDF or DOCX)
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              {...register('resume')}
            />
            {errors.resume && (
              <p className="form-error">{errors.resume.message}</p>
            )}
          </label>

          <Button type="submit" disabled={!allFilled || isSubmitting}>
            {isSubmitting ? 'Submitting…' : 'Submit Application'}
          </Button>
        </form>
      </main>
      <Footer />
    </>
  );
}
