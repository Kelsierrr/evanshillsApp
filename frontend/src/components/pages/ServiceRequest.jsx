import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createServiceRequest } from '../../services/serviceRequests';
import Header from '../Header';
import Footer from '../Footer';
import Button from '../ui/Button';
import '../../styles/ServiceRequest.css';

export default function ServiceRequest() {
  const { packageName } = useParams();
  const [form, setForm] = useState({ name:'', email:'', phone:'' });

  const mutation = useMutation({
    mutationFn: (data) => createServiceRequest(data),
    onSuccess: () => setForm({ name:'', email:'', phone:'' })
  });

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ packageName, ...form });
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

        <form className="sr-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Phone
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} required />
          </label>
          <Button type="submit" variant="default" size="md" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Submitting…' : 'Submit Request'}
          </Button>
        </form>
      </main>
      <Footer />
    </>
  );
}
