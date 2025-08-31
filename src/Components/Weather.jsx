import React from 'react';


const Weather = ({ city, temperature, description, icon }) => {
    return (

        <div id="weather" className="weather-container">
            <h2>Weather in {city}</h2>
            <div className="weather-info">
                {icon && (
                    <img
                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt={description}
                    />
                )}
                <div>
                    <p>Temperature: {temperature}°C</p>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default Weather;