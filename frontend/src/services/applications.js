// src/services/applications.js
const API = import.meta.env.VITE_API_URL;
export async function createApplication(formData) {
  const token = localStorage.getItem('token');
    const res = await fetch(`${API}applications`, {
      method: 'POST',
       headers: {
        'Authorization': `Bearer ${token}`
       },
      body: formData,  // Use FormData for multipart/form-data
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to submit application');
    }
    return res.json();
  }
  
  export async function fetchMyApplications() {
    const res = await fetch(`${API}/applications`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!res.ok) {
      throw new Error('Failed to fetch applications');
    }
    return res.json();
  }