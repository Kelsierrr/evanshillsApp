import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchJobs } from '../../services/jobs';
import Header from '../Header';
import Footer from '../Footer';
import '../../styles/Jobs.css';

export default function Jobs() {
    const { data: jobs, isLoading, error } = useQuery({
        queryKey: ['jobs'],
        queryFn: fetchJobs
      });

  if (isLoading) return <p className="jobs-loading">Loading jobs…</p>;
  if (error)     return <p className="jobs-error">Error loading jobs</p>;

  return (
    <>
      <Header />
      <main className="jobs-page">
        <h1>Available Jobs</h1>
        <ul className="jobs-list">
          {jobs.map(job => (
            <li key={job._id} className="job-card">
              <Link to={`/jobs/${job._id}`}>
              <h2>{job.title}</h2>
              <p className="job-company">{job.company} — {job.location}</p>
              <p className="job-desc">{job.description.slice(0, 200)}…</p>
              <p className="job-date">
                Posted: {new Date(job.postedAt).toLocaleDateString()}
              </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
