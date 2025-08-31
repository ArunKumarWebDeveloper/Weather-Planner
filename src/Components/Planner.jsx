import React, { useState } from "react";

const Planner = () => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");

    const handleAddTask = () => {
        if (input.trim() !== "") {
            setTasks([...tasks, { text: input, completed: false }]);
            setInput("");
        }
    };

    const handleToggleTask = (index) => {
        const newTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
    };

    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <div id="planner" className="planner">
            <h2>To-Do List</h2>
            <div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={handleAddTask}>Add</button>
            </div>
            <ul>
                {tasks.map((task, idx) => (
                    <li key={idx} style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                        <span onClick={() => handleToggleTask(idx)}>{task.text}</span>
                        <button onClick={() => handleDeleteTask(idx)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Planner;