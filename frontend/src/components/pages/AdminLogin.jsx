// frontend/src/components/pages/AdminLogin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate }                  from 'react-router-dom';
import Button                           from '../ui/Button';
import '../../styles/Admin.css';

export default function AdminLogin() {
  const [pw, setPw]       = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // If a valid token is already stored, go straight to /admin/jobs
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/admin/jobs', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ password: pw })
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Login failed');
      }
      const { token } = await res.json();
      localStorage.setItem('token', token);
      navigate('/admin/jobs');
    } catch (err) {
      setError(err.message);
      setPw('');
    }
  };

  return (
    <div className="admin-login">
      <h1>Admin Login</h1>
      {error && <div className="admin-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Password
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            required
          />
        </label>
        <Button type="submit">Enter</Button>
      </form>
    </div>
  );
}
