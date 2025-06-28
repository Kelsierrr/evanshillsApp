// src/services/api.js
export async function fetchHealth() {
    const res = await fetch('/api');
    return res.json();
  }
  