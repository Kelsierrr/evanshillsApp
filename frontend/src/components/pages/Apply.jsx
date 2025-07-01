import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createApplication } from '../../services/applications';
import Header from '../Header';
import Footer from '../Footer';
import Button from '../ui/Button';
import '../../styles/Apply.css';

export default function Apply() {
  const { id: jobId } = useParams();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', coverLetter: ''
  });

  const mutation = useMutation({
    mutationFn: (data) => createApplication(data),
    onSuccess: () => setForm({ name:'', email:'', phone:'', coverLetter:'' })
  });

  useEffect(() => {
    if (mutation.isSuccess || mutation.isError) {
      const timer = setTimeout(() => {
        mutation.reset();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mutation.isSuccess, mutation.isError, mutation]);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ jobId, ...form });
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
          <div className="apply-success">Your application has been submitted!</div>
        )}
        {mutation.isError && (
          <div className="apply-error">{mutation.error.message}</div>
        )}

        <form className="apply-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              name="name" value={form.name}
              onChange={handleChange} required
            />
          </label>

          <label>
            Email
            <input
              name="email" type="email"
              value={form.email} onChange={handleChange} required
            />
          </label>

          <label>
            Phone
            <input
              name="phone" type="tel"
              value={form.phone} onChange={handleChange} required
            />
          </label>

          <label>
            Cover Letter
            <textarea
              name="coverLetter" rows="6"
              value={form.coverLetter}
              onChange={handleChange}
              required
            />
          </label>

          <Button
            type="submit"
            variant="default"
            size="md"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Submitting…' : 'Submit Application'}
          </Button>
        </form>
      </main>
      <Footer />
    </>
  );
}
