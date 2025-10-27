const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';


async function request(path, options = {}) {
const res = await fetch(`${API_URL}/api${path}`, {
headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
...options,
});
if (!res.ok) {
const text = await res.text();
throw new Error(text || `Request failed (${res.status})`);
}
return res.json();
}


export const TodoAPI = {
list: () => request('/todos'),
create: (data) => request('/todos', { method: 'POST', body: JSON.stringify(data) }),
update: (id, data) => request(`/todos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
toggle: (id) => request(`/todos/${id}/toggle`, { method: 'PATCH' }),
remove: (id) => request(`/todos/${id}`, { method: 'DELETE' }),
};