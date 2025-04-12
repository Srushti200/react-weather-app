import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      if (!searchedCity) return;

      setLoading(true);
      setError("");
      setWeather(null);

      try {
        const response = await fetch(
          `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${searchedCity}`
        );
        const data = await response.json();

        if (data.error || !data.location) {
          setError("City not found.");
        } else {
          setWeather(data);
        }
      } catch (err) {
        setError("Failed to fetch weather.");
      }

      setLoading(false);
    };

    fetchWeather();
  }, [searchedCity]);

  
  const handleSearch = () => {
    if (city.trim()) {
      setSearchedCity(city.trim());
      setCity(""); 
    }
  };

  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="app">
      <h1>🌤️ Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.location.name}</h2>
          <p>🌡️ {weather.current.temperature} °C</p>
          <p>{weather.current.weather_descriptions[0]}</p>
          <img src={weather.current.weather_icons[0]} alt="Weather Icon" />
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind: {weather.current.wind_speed} km/h</p>
         

        </div>
      )}
    </div>
  );
}

export default App;
