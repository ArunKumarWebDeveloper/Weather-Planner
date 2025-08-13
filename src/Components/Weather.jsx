import React, { useState } from "react";
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
    console.log("🔍 Searching for:", cityInput);
    const q = cityInput.trim();
    if (!q) {
      console.log("❗️ Empty input, returning");
      return;
    }
    try {
      const weatherData = await fetchWeather(q);
      setData(weatherData);
      setError("");
    } catch (err) {
      console.error("❌ fetchWeather error:", err);
      setData(null);
      setError("City not found");
    }
  };

  const main = data?.weather?.[0]?.main;
  const iconSrc = main && iconMap[main] ? iconMap[main] : "/sun.png";

  return (
    <div id="weather" className="weather-container">
      <div className="weather-card">
        <h1 className="city-name">{data ? data.name : "City Name"}</h1>
        <p className="weather-type">
          {data ? data.weather[0].main : "Weather Type"}
        </p>
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

        {error && (
          <p className="error-text" style={{ color: "red", marginTop: 8 }}>
            {error}
          </p>
        )}

        <div className="weather-details">
          <p className="date">
            Date:{" "}
            {data
              ? new Date(data.dt * 1000).toLocaleDateString()
              : new Date().toLocaleDateString()}
          </p>
          <p className="temp">
            Temperature: {data ? Math.round(data.main.temp) : 28}°C
            <img src="/temp.png" alt="temp" />
          </p>
          <p className="hum">
            Humidity: {data ? data.main.humidity : 65}%{" "}
            <img src="/humidity.png" alt="humidity" />
          </p>
          <p className="wind">
            Wind Speed: {data ? Math.round(data.wind.speed) : 10} km/h
            <img src="/wind.png" alt="wind" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;