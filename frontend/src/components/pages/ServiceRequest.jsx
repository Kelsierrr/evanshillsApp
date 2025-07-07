import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Button from '../ui/Button';
import { useParams, Link } from 'react-router-dom';
import ServiceRequestForm from '../../components/ServiceRequestForm';
import '../../styles/ServiceRequest.css';

export default function ServiceRequest() {
  const { packageName } = useParams();
  return (
    <>
      <Header />
      <main className="sr-page">
        <Link to="/job-seekers">
          <Button variant="outline" size="sm">← Back to Packages</Button>
        </Link>

        <h1>Request: {packageName} Package</h1>
        <ServiceRequestForm />
      </main>
      <Footer />
    </>
  );
}
