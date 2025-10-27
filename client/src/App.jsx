import { useEffect, useState } from 'react';
import { TodoAPI } from './api.js';
import TodoForm from './components/TodoForm.jsx';
import TodoItem from './components/TodoItem.jsx';

export default function App() {
const [todos, setTodos] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');


const load = async () => {
setLoading(true);
setError('');
try {
const data = await TodoAPI.list();
setTodos(data);
} catch (e) {
setError(e.message);
} finally {
setLoading(false);
}
};


useEffect(() => { load(); }, []);


const add = async (payload) => {
const created = await TodoAPI.create(payload);
setTodos(prev => [created, ...prev]);
};


const toggle = async (id) => {
const updated = await TodoAPI.toggle(id);
setTodos(prev => prev.map(t => (t._id === id ? updated : t)));
};


const save = async (id, payload) => {
const updated = await TodoAPI.update(id, payload);
setTodos(prev => prev.map(t => (t._id === id ? updated : t)));
};


const remove = async (id) => {
await TodoAPI.remove(id);
setTodos(prev => prev.filter(t => t._id !== id));
};


return (
<div className="container">
<h1>MERN Todo</h1>


<TodoForm onAdd={add} />


<div className="card">
{loading && <p>Loading…</p>}
{error && <p style={{ color: '#ef4444' }}>{error}</p>}
{!loading && todos.length === 0 && <p>No todos yet. Add one above!</p>}
<ul>
{todos.map(todo => (
<TodoItem key={todo._id} todo={todo} onToggle={toggle} onSave={save} onDelete={remove} />)
)}
</ul>
</div>
</div>
);
}