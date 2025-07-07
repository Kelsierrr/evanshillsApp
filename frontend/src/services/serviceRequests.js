const API = import.meta.env.VITE_API_URL
export async function createServiceRequest(data) {
    const res = await fetch(`${API}/service-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to submit request');
    }
    return res.json();
  }
  