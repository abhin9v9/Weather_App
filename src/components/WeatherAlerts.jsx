import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { getWeatherIcon } from '../api/weatherApi';

const WeatherAlerts = ({ alerts }) => {
  if (!alerts.length) return null;

  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg">
      <h3 className="flex items-center text-lg font-semibold mb-2">
        <AlertTriangle className="mr-2" /> Weather Alerts
      </h3>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index} className="mb-2">
            <span className="font-semibold">{alert.city}:</span>{' '}
            {getWeatherIcon(alert.main)} {alert.temp}°C - High temperature alert!
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherAlerts;