import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMyApplications } from '../../services/applications';
import Header from '../Header';
import Footer from '../Footer';
import '../../styles/MyApplications.css';

export default function MyApplications() {
  const { data: apps = [], isLoading, isError, error } = useQuery({
    queryKey: ['myApplications'],
    queryFn: fetchMyApplications
  });

  if (isLoading) return <p className="ma-loading">Loading your applications…</p>;
  if (isError)   return <p className="ma-error">Error: {error.message}</p>;

  return (
    <>
      <Header />
      <main className="ma-page">
        <h1>My Applications</h1>
        {apps.length === 0 ? (
          <p>You haven’t submitted any applications yet.</p>
        ) : (
          <ul className="ma-list">
            {apps.map(app => (
              <li key={app._id} className="ma-card">
                <h2>{app.jobId.title}</h2>
                <p className="ma-meta">
                  {app.jobId.company} — {app.jobId.location}
                </p>
                <p className="ma-date">
                  Applied: {new Date(app.appliedAt).toLocaleDateString()}
                </p>
                {app.resumeUrl && (
                  <a 
                    href={app.resumeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ma-resume"
                  >
                    Download Resume
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}
