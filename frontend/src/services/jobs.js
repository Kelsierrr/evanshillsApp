export async function fetchJobs(){
    const res = await fetch('/api/jobs');
    if (!res.ok) 
        throw new Error('Failed to fetch jobs');
        return res.json();
}

export async function createJob(data) {
    const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) 
        throw new Error('Failed to create job');
    return res.json();
}

export async function fetchJob(id) {
    const res = await fetch(`/api/jobs/${id}`);
    if (!res.ok) 
        throw new Error('Failed to fetch job');
    return res.json();
}

export async function updateJob(id, data) {
    const res = await fetch(`/api/jobs/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) 
        throw new Error('Failed to update job');
    return res.json();
}

export async function deleteJob(id) {
    const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });
    if (!res.ok) 
        throw new Error('Failed to delete job');
    return res.json();
}