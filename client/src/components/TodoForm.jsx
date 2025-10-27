import { useState } from 'react';


export default function TodoForm({ onAdd }) {
const [title, setTitle] = useState('');
const [notes, setNotes] = useState('');
const [loading, setLoading] = useState(false);


const handleSubmit = async (e) => {
e.preventDefault();
if (!title.trim()) return;
setLoading(true);
try {
await onAdd({ title: title.trim(), notes: notes.trim() });
setTitle('');
setNotes('');
} finally {
setLoading(false);
}
};


return (
<form onSubmit={handleSubmit} className="card" style={{ marginBottom: 16 }}>
<div className="row" style={{ marginBottom: 8 }}>
<input
placeholder="Add a new todo…"
value={title}
onChange={(e) => setTitle(e.target.value)}
/>
</div>
<div className="row" style={{ marginBottom: 12 }}>
<textarea
rows={3}
placeholder="Optional notes"
value={notes}
onChange={(e) => setNotes(e.target.value)}
/>
</div>
<div className="row" style={{ justifyContent: 'flex-end' }}>
<button disabled={loading}>{loading ? 'Adding…' : 'Add Todo'}</button>
</div>
</form>
);
}