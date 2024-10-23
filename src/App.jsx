import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './api/weatherApi';
import { calculateDailyAggregates, checkAlertThresholds, formatChartData } from './utils/weatherUtils';
import { WEATHER_CONFIG } from './config/constants';
import CurrentWeather from './components/CurrentWeather';
import WeatherAggregates from './components/WeatherAggregates';
import WeatherAlerts from './components/WeatherAlerts';
import WeatherChart from './components/WeatherChart';

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dailyAggregates, setDailyAggregates] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // City search functionality
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C'); // Temperature unit (C, F, K)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherData();
        if (!data.length) {
          setError('No weather data available. Please check your API key and try again.');
          return;
        }

        setWeatherData(data);
        setFilteredData(data);
        setDailyAggregates(calculateDailyAggregates(data));
        setAlerts(checkAlertThresholds(data, WEATHER_CONFIG.TEMPERATURE_THRESHOLD));
        setError(null);
      } catch (err) {
        setError('Failed to fetch weather data. Please try again later.');
        console.error('Error in fetchData:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, WEATHER_CONFIG.UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filtered = weatherData.filter(city =>
      city.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setDailyAggregates(calculateDailyAggregates(filtered));
  }, [searchTerm, weatherData]);

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
        <div className="text-white text-2xl font-semibold">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
        <div className="text-white text-2xl font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Weather Monitoring System</h1>
        <p className="text-xl text-white opacity-80 mb-8">
          Real-Time Data Processing with Rollups and Aggregates
        </p>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <UnitSelector unit={unit} onUnitChange={handleUnitChange} />
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8">
        <WeatherAlerts alerts={alerts.filter(alert =>
          alert.city.toLowerCase().includes(searchTerm.toLowerCase())
        )} />
        <CurrentWeather data={filteredData} unit={unit} />
        <WeatherChart data={formatChartData(filteredData)} />
        <WeatherAggregates data={dailyAggregates} />
      </div>

      <footer className="mt-12 text-center text-white opacity-70">
        <p>Powered by OpenWeather API | &copy; 2023 Weather Monitoring System</p>
      </footer>
    </div>
  );
};

// SearchBar Component for city search functionality
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="p-2 rounded-lg"
        placeholder="Search by city"
      />
    </div>
  );
};

// UnitSelector Component for unit conversion (C, F, K)
const UnitSelector = ({ unit, onUnitChange }) => {
  return (
    <div className="unit-selector mb-6">
      <label className="text-white mr-2">Select Unit:</label>
      <select value={unit} onChange={(e) => onUnitChange(e.target.value)} className="p-2 rounded-lg">
        <option value="C">Celsius (°C)</option>
        <option value="F">Fahrenheit (°F)</option>
        <option value="K">Kelvin (K)</option>
      </select>
    </div>
  );
};

export default App;
