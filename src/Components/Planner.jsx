import React, { useEffect, useState } from "react";

const Planner = () => {
  // ----- inject CSS once -----
  useEffect(() => {
    const id = "planner-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      
    }
  }, []);

  // ----- state -----
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("planner_tasks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [editId, setEditId] = useState(null);

  // persist
  useEffect(() => {
    localStorage.setItem("planner_tasks", JSON.stringify(tasks));
  }, [tasks]);

  // helpers
  const completed = tasks.filter(t => t.done).length;

  const addOrUpdate = () => {
    const val = text.trim();
    if (!val) return;
    if (editId) {
      setTasks(prev => prev.map(t => (t.id === editId ? { ...t, text: val } : t)));
      setEditId(null);
    } else {
      setTasks(prev => [...prev, { id: crypto.randomUUID(), text: val, done: false }]);
    }
    setText("");
  };

  const toggle = (id) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const remove = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  const startEdit = (id) => {
    const t = tasks.find(x => x.id === id);
    if (!t) return;
    setText(t.text);
    setEditId(id);
  };

  return (
    <div id="planner" className="planner">
      <div className="brand">Planner</div>

      {/* Status Card */}
      <div className="status-card">
        <div>
          <h3 className="status-title">Todo-List</h3>
          <p className="status-sub">keep it up</p>
        </div>
        <div className="status-circle">{completed}/{tasks.length}</div>
      </div>

      {/* Input Card */}
      <div className="input-card">
        <input
          className="input"
          placeholder="write your next task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addOrUpdate()}
        />
        <button className="add-btn" onClick={addOrUpdate}>
          {editId ? "✓" : "+"}
        </button>
      </div>

      {/* Tasks List */}
      <div className="tasks">
        {tasks.map(({ id, text, done }) => (
          <div className="task-card" key={id}>
            <input
              className="check"
              type="checkbox"
              checked={done}
              onChange={() => toggle(id)}
              title="Mark complete"
            />
            <span className={`task-text ${done ? "done" : ""}`}>{text}</span>
            <div className="actions">
              <button className="icon-btn" onClick={() => startEdit(id)} title="Edit"><img src="edit11.png"></img></button>
              <button className="icon-btn" onClick={() => remove(id)} title="Delete"><img src="delete.png"></img></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planner;

