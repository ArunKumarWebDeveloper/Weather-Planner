import React, { useState } from "react";


function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAdd = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = (id) => {
    if (!editingText.trim()) return;
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const doneCount = tasks.filter((task) => task.done).length;

  return (
    <div id="planner" className="todo-container">
      <h1 className="logo">
        <span>TODO-List</span>
      </h1>

      <div className="status-card">
        <div>
          <h2>Todo Done</h2>
          <p>keep it up</p>
        </div>
        <div className="status-circle">
          {doneCount}/{tasks.length}
        </div>
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="write your next task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAdd}>+</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              className="task-checkbox"
            />

            {editingId === task.id ? (
              <div className="edit-section">
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="edit-input"
                />
                <button className="save" onClick={() => saveEdit(task.id)}>
                  Save
                </button>
                <button className="cancel" onClick={cancelEdit}>
                  ✖
                </button>
              </div>
            ) : (
              <span className={task.done ? "task-text done" : "task-text"}>
                {task.text}
              </span>
            )}

            {editingId !== task.id && (
              <div className="task-actions">
                <button
                  className="edit"
                  onClick={() => startEdit(task.id, task.text)}
                >
                  ✎
                </button>
                <button className="delete" onClick={() => deleteTask(task.id)}>
                  🗑
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
