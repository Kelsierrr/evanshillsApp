import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchJobs,
  createJob,
  updateJob,
  deleteJob
} from '../../services/jobs';
import Button from '../ui/Button';
import '../../styles/Admin.css';

export default function AdminJobs() {
  const navigate = useNavigate();
  const qc       = useQueryClient();
  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs'], queryFn: fetchJobs });

  // Redirect if not logged in
  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  // Form state for create
  const [newJob, setNewJob] = useState({
    title:'', company:'', location:'', description:''
  });

  const createMut = useMutation({
    mutationFn: () => createJob(newJob),
    onSuccess: () => {
      qc.invalidateQueries(['jobs']);
      setNewJob({ title:'', company:'', location:'', description:'' });
    }
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }) => updateJob(id, data),
    onSuccess: () => qc.invalidateQueries(['jobs'])
  });

  const deleteMut = useMutation({
    mutationFn: id => deleteJob(id),
    onSuccess: () => qc.invalidateQueries(['jobs'])
  });

  // Edit state per-job
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData]   = useState({});

  if (isLoading) return <p>Loading…</p>;

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Job Management</h1>
        <Button onClick={() => {
          localStorage.removeItem('isAdmin');
          navigate('/');
        }}>Logout</Button>
      </header>

      {/* Create Form */}
      <section className="admin-section">
        <h2>Add New Job</h2>
        {createMut.isError && <div className="admin-error">{createMut.error.message}</div>}
        <form
          className="admin-form"
          onSubmit={e => {
            e.preventDefault();
            createMut.mutate();
          }}
        >
          <input
            placeholder="Title"
            value={newJob.title}
            onChange={e => setNewJob(f=>({...f,title:e.target.value}))}
            required
          />
          <input
            placeholder="Company"
            value={newJob.company}
            onChange={e => setNewJob(f=>({...f,company:e.target.value}))}
            required
          />
          <input
            placeholder="Location"
            value={newJob.location}
            onChange={e => setNewJob(f=>({...f,location:e.target.value}))}
            required
          />
          <textarea
            placeholder="Description"
            value={newJob.description}
            onChange={e => setNewJob(f=>({...f,description:e.target.value}))}
            required
          />
          <Button type="submit" disabled={createMut.isLoading}>
            {createMut.isLoading ? 'Saving…' : 'Add Job'}
          </Button>
        </form>
      </section>

      {/* List & Edit */}
      <section className="admin-section">
        <h2>Existing Jobs</h2>
        {jobs.map(job => (
          <div key={job._id} className="admin-job-card">
            {editingId === job._id ? (
              <>
                <input
                  value={editData.title}
                  onChange={e=>setEditData(d=>({...d,title:e.target.value}))}
                />
                <input
                  value={editData.company}
                  onChange={e=>setEditData(d=>({...d,company:e.target.value}))}
                />
                <input
                  value={editData.location}
                  onChange={e=>setEditData(d=>({...d,location:e.target.value}))}
                />
                <textarea
                  value={editData.description}
                  onChange={e=>setEditData(d=>({...d,description:e.target.value}))}
                />
                <Button
                  onClick={()=>updateMut.mutate({id:job._id,data:editData})}
                  disabled={updateMut.isLoading}
                >
                  Save
                </Button>
                <Button variant="outline" onClick={()=>setEditingId(null)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <h3>{job.title}</h3>
                <p>{job.company} — {job.location}</p>
                <p>{job.description}</p>
                <Button variant="outline" onClick={() => {
                  setEditingId(job._id);
                  setEditData({
                    title: job.title,
                    company: job.company,
                    location: job.location,
                    description: job.description
                  });
                }}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteMut.mutate(job._id)}
                  disabled={deleteMut.isLoading}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
