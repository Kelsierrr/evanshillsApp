import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import '../../styles/Admin.css';

const ADMIN_PASSWORD = 'Elvis123';

export default function AdminLogin() {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isAdmin') === 'true') {
      navigate('/admin/jobs', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = e => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/jobs');
    } else {
      setError('Incorrect password');
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
