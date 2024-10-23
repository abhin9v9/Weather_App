import React from 'react';
import { ArrowDown, ArrowUp, Thermometer } from 'lucide-react';

const TableHeader = () => (
  <tr className="bg-gray-100">
    <th className="p-2 text-left">Date</th>
    <th className="p-2 text-left">Avg Temp</th>
    <th className="p-2 text-left">Min Temp</th>
    <th className="p-2 text-left">Max Temp</th>
    <th className="p-2 text-left">Dominant Weather</th>
  </tr>
);

const TableRow = ({ day, index }) => (
  <tr className={index % 2 === 0 ? 'bg-gray-50' : ''}>
    <td className="p-2">{day.date}</td>
    <td className="p-2   items-center">
      <Thermometer className="text-orange-500 mr-1" size={16} />
      {day.avgTemp}°C
    </td>
    <td className="p-2 items-center">
      <ArrowDown className="text-blue-500 mr-1" size={16} />
      {day.minTemp}°C
    </td>
    <td className="p-2  items-center">
      <ArrowUp className="text-red-500 mr-1" size={16} />
      {day.maxTemp}°C
    </td>
    <td className="p-2">{day.dominantWeather}</td>
  </tr>
);

const WeatherAggregates = ({ data }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 col-span-full">
    <h2 className="text-2xl font-semibold mb-4">Daily Weather Summary</h2>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <TableHeader />
        </thead>
        <tbody>
          {data.map((day, index) => (
            <TableRow key={day.date} day={day} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default WeatherAggregates;