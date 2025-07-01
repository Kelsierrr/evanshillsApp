// frontend/src/services/employerInquiries.js
export async function createEmployerInquiry(data) {
    const res = await fetch('/api/employer-inquiries', {
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
  