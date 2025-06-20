import { useState } from "react";

function TaskItem({ task, deleteTask, toggleComplete, updateTask }) {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(task.name);
  const [editDate, setEditDate] = useState(task.dueDate || "");

  function saveEdit() {
    updateTask(task.id, editName, editDate);
    setEditing(false);
  }

  return (
    <li className={`task d-flex justify-content-between slide-in`}>
      {editing ? (
        <div className="w-100">
          <input
            type="text"
            className="form-control mb-1"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input
            type="date"
            className="form-control mb-2"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
          />
          <div className="task-buttons">
            <button className="btn btn-sm btn-success" onClick={saveEdit}>
              Save
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex flex-column">
            <b className={task.completed ? "completed-text" : ""}>
              {task.name}
            </b>
            {task.dueDate && (
              <small className="text-muted">Due: {task.dueDate}</small>
            )}
          </div>
          <div className="task-buttons">
            <button
              className={`btn btn-sm ${
                task.completed ? "btn-warning" : "btn-success"
              }`}
              onClick={() => toggleComplete(task.id)}
            >
              {task.completed ? "Undo" : "Done"}
            </button>
            <button
              className="btn btn-sm btn-info"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;
