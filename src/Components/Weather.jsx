import React, { useState, useEffect } from "react";
import "../App.css";
import { fetchWeather } from "../utilis/weatherAPI";

const iconMap = {
  Clear: "/sun.png",
  Rain: "/rain.png",
  Clouds: "/cloudy.png",
  Snow: "/snow.png",
};

const WeatherCard = () => {
  const [cityInput, setCityInput] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const q = cityInput.trim();
    if (!q) return;
    try {
      const weatherData = await fetchWeather(q);
      setData(weatherData);
      setError("");
    } catch {
      setData(null);
      setError("City not found");
    }
  };

  const main = data?.weather?.[0]?.main;
  const iconSrc = main && iconMap[main] ? iconMap[main] : "/sun.png";

  return (
    <div className="card weather-card">
      <h1 className="city-name">{data ? data.name : "City Name"}</h1>
      <p className="weather-type">{data ? data.weather[0].main : "Weather Type"}</p>
      <img
        src={data ? iconSrc : "/normal.png"}
        alt="Weather Icon"
        className="weather-icon"
      />

      <input
        type="text"
        placeholder="Enter City Name"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        className="city-input"
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>

      {error && <p className="error-text">{error}</p>}

      <div className="weather-details">
        <p>Date: {data ? new Date(data.dt * 1000).toLocaleDateString() : new Date().toLocaleDateString()}</p>
        <p>Temperature: {data ? Math.round(data.main.temp) : 28}°C <img src="/temp.png" alt="temp" /></p>
        <p>Humidity: {data ? data.main.humidity : 65}% <img src="/humidity.png" alt="humidity" /></p>
        <p>Wind Speed: {data ? Math.round(data.wind.speed) : 10} km/h <img src="/wind.png" alt="wind" /></p>
      </div>
    </div>
  );
};

const Planner = () => {
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

  useEffect(() => {
    localStorage.setItem("planner_tasks", JSON.stringify(tasks));
  }, [tasks]);

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
    <div className="card planner-card">
      <div className="brand">Planner</div>

      <div className="status-card">
         <h3>To-do-List</h3>
         
       
        <div className="status-circle">{completed}/{tasks.length}</div>
      </div>

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

      <div className="tasks">
        {tasks.map(({ id, text, done }) => (
          <div className="task-card" key={id}>
            <input
              type="checkbox"
              checked={done}
              onChange={() => toggle(id)}
            />
            <span className={`task-text ${done ? "done" : ""}`}>{text}</span>
            <div className="actions">
              <button onClick={() => startEdit(id)}><img src="edit (1).png" alt="edit" /></button>
              <button onClick={() => remove(id)}><img src="delete (2).png" alt="delete" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WeatherPlannerPage = () => {
  return (
    <div className="container">
      <WeatherCard />
      <Planner />
    </div>
  );
};

export default WeatherPlannerPage;
