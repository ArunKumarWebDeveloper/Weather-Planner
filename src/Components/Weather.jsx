import React, { useState, useEffect } from "react";
import { fetchWeather } from "../utilis/weatherAPI";

const Weather = () => {
  const [city, setCity] = useState("London"); // default city
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    handleSearch("London");
  }, []);

  const handleSearch = async (searchCity) => {
    try {
      setError("");
      const result = await fetchWeather(searchCity || city);
      setData(result);
    } catch (err) {
      setError("City not found. Try again.");
      console.log(err);
    }
  };

  const formatTime = (timestamp, timezone) => {
    if (!timestamp) return "";
    const date = new Date((timestamp + timezone) * 1000);
    return date.toUTCString().slice(17, 25); // HH:MM:SS
  };

  return (
    <div id="weather" className="weather-container">
      <h2>Weather.Info</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => handleSearch(city)}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="weather-card">
        {data ? (
          <>
            {/* Main temperature and city */}
            <div className="weather-header">
              <h1>{Math.round(data.main.temp)}°C</h1>
              <p className="location">
                {data.name}, {data.sys.country}
              </p>
              <p className="coords">
                Lat: {data.coord.lat}, Lon: {data.coord.lon}
              </p>

              {/* ✅ Weather condition with inline image mapping */}
              <div className="weather-condition">
                <img
                  src={
                    data.weather[0].main.toLowerCase() === "clear"
                      ? "/public/sun.png"
                      : data.weather[0].main.toLowerCase() === "clouds"
                      ? "/public/cloudy.png"
                      : data.weather[0].main.toLowerCase() === "rain"
                      ? "/public/rain.png"
                      : data.weather[0].main.toLowerCase() === "drizzle"
                      ? "/public/drizzl.png"
                      : data.weather[0].main.toLowerCase() === "thunderstorm"
                      ? "/public/thunderstrom.png"
                      : data.weather[0].main.toLowerCase() === "snow"
                      ? "/public/snow.png"
                      : ["mist", "fog", "haze"].includes(
                          data.weather[0].main.toLowerCase()
                        )
                      ? "/public/fog.png"
                      : "/public/normal.png"
                  }
                  alt={data.weather[0].description}
                />
                <p>
                  {data.weather[0].main} ({data.weather[0].description})
                </p>
              </div>
            </div>

            {/* Info grid */}
            <div className="weather-details">
              <div>
                <span>
                  <img src="/humidity.png" alt="humidity" /> Humidity
                </span>
                <strong>{data.main.humidity}%</strong>
              </div>
              <div>
                <span>
                  <img src="/sunrise.png" alt="sunrise" /> Sunrise
                </span>
                <strong>{formatTime(data.sys.sunrise, data.timezone)}</strong>
              </div>
              <div>
                <span>
                  <img src="/sunset.png" alt="sunset" /> Sunset
                </span>
                <strong>{formatTime(data.sys.sunset, data.timezone)}</strong>
              </div>
              <div>
                <span>
                  <img src="/pressure.png" alt="pressure" /> Pressure
                </span>
                <strong>{data.main.pressure} hPa</strong>
              </div>
              <div>
                <span>
                  <img src="/wind.png" alt="wind" /> Wind
                </span>
                <strong>{data.wind.speed} m/s</strong>
              </div>
              <div>
                <span>
                  <img src="/normal.png" alt="clouds" /> Clouds
                </span>
                <strong>{data.clouds.all}%</strong>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
