// frontend/src/services/contactInquiries.js
export async function createContactInquiry(data) {
    const res = await fetch('/api/contact-inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to submit contact inquiry');
    }
    return res.json();
  }
  