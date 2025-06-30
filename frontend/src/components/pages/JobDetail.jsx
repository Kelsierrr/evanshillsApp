import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchJob } from '../../services/jobs';
import Header from '../Header';
import Footer from '../Footer';
import Button from '../ui/Button';
import '../../styles/JobDetail.css';

export default function JobDetail() {
  const { id } = useParams();
  const { data: job, isLoading, error } = useQuery({
    queryKey: ['job', id],
    queryFn: () => fetchJob(id),
  });

  if (isLoading) return <p className="jobdetail-loading">Loading...</p>;
  if (error)     return <p className="jobdetail-error">Error loading job</p>;

  return (
    <>
      <Header />
      <main className="jobdetail-page">
        <Link to="/jobs">
          <Button variant="outline" size="sm">← Back to Listings</Button>
        </Link>

        <h1 className="jobdetail-title">{job.title}</h1>
        <p className="jobdetail-meta">
          <strong>{job.company}</strong> — {job.location}
        </p>
        <p className="jobdetail-date">
          Posted on {new Date(job.postedAt).toLocaleDateString()}
        </p>

        <section className="jobdetail-desc">
          <h2>Job Description</h2>
          <p>{job.description}</p>
        </section>

        <Link to={`/jobs/${id}/apply`}>
          <Button variant="default" size="md">Apply Now</Button>
        </Link>
      </main>
      <Footer />
    </>
  );
}
