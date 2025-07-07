// frontend/src/services/employerInquiries.js
const API = import.meta.env.VITE_API_URL
export async function createEmployerInquiry(data) {
    const res = await fetch(`${API}/employer-inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to submit employer inquiry');
    }
    return res.json();
  }
  