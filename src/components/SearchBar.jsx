import React from 'react';
import { Thermometer, Wind } from 'lucide-react';
import { getWeatherIcon } from '../api/weatherApi';

const WeatherCard = ({ city }) => (
  <div className="bg-gray-100 p-4 rounded-lg">
    <h3 className="text-lg font-semibold mb-2">{city.city}</h3>
    <div className="flex items-center mb-2">
      <span className="text-3xl mr-2">{getWeatherIcon(city.main)}</span>
      <span>{city.main}</span>
    </div>
    <div className="flex items-center">
      <Thermometer className="text-red-500 mr-2" />
      <span>{city.temp}°C</span>
    </div>
    <div className="flex items-center">
      <Wind className="text-gray-500 mr-2" />
      <span>Feels like: {city.feels_like}°C</span>
    </div>
  </div>
);

const CurrentWeather = ({ data }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 col-span-full">
    <h2 className="text-2xl font-semibold mb-4">Current Weather</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {data.map((city) => (
        <WeatherCard key={city.city} city={city} />
      ))}
    </div>
  </div>
);

export default CurrentWeather;