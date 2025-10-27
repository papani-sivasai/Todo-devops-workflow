export default function TodoItem({ todo, onToggle, onSave, onDelete }) {
  return (
    <li className="todo-item">
      <div className="todo-content">
        <div
          className="todo-title"
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            opacity: todo.completed ? 0.6 : 1,
          }}
        >
          <strong>{todo.title}</strong>
        </div>

        {todo.notes && (
          <div
            className="todo-notes"
            style={{ opacity: todo.completed ? 0.6 : 0.9 }}
          >
            {todo.notes}
          </div>
        )}

        <div className="todo-meta">
          <span>{new Date(todo.createdAt).toLocaleString()}</span>
        </div>
      </div>

      <div className="actions">
        <button
          className={`secondary ${todo.completed ? 'done' : ''}`}
          onClick={() => onToggle(todo._id)}
        >
          {todo.completed ? 'Undo' : 'Done'}
        </button>
        <button
          className="secondary"
          onClick={() => {
            const title = prompt('Edit title', todo.title) ?? todo.title;
            const notes = prompt('Edit notes', todo.notes || '') ?? todo.notes;
            onSave(todo._id, { ...todo, title, notes });
          }}
        >
          Edit
        </button>
        <button className="danger" onClick={() => onDelete(todo._id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
