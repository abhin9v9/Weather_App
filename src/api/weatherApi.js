import axios from 'axios';
import { CITIES,WEATHER_CONFIG  } from '../config/constants';

const API_KEY = 'b4fcfff9c7a7a55ea3217a9659f41206'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

let alertCount = {};

const initializeAlertCount = () => {
  CITIES.forEach(city => {
    alertCount[city] = 0;
  });
};

initializeAlertCount();


export const fetchWeatherData = async () => {
  try {
    const promises = CITIES.map((city) =>
      axios.get(`${BASE_URL}?q=${city},IN&appid=${API_KEY}`)
    );
    const responses = await Promise.all(promises);

    return responses.map((response) => ({
      city: response.data.name,
      main: response.data.weather[0].main,
      temp: kelvinToCelsius(response.data.main.temp),
      feels_like: kelvinToCelsius(response.data.main.feels_like),
      dt: response.data.dt,

      
    }));
    
    

  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    return [];
  }
};

const kelvinToCelsius = (kelvin) => {
  return Math.round((kelvin - 273.15) * 10) / 10;
};

const checkForAlerts = (weatherData) => {
  weatherData.forEach((data) => {
    if (data.temp > WEATHER_CONFIG.TEMPERATURE_THRESHOLD) {
      alertCount[data.city] += 1;
      if (alertCount[data.city] >= WEATHER_CONFIG.CONSECUTIVE_ALERTS) {
        console.log(`Alert: ${data.city} has exceeded the temperature threshold of ${WEATHER_CONFIG.TEMPERATURE_THRESHOLD}°C for ${WEATHER_CONFIG.CONSECUTIVE_ALERTS} consecutive updates.`);
        alertCount[data.city] = 0; // Reset after the alert
      }
    } else {
      alertCount[data.city] = 0; // Reset if no breach
    }
  });
};

export const getWeatherIcon = (main) => {
  const icons = {
    clear: '☀️',
    clouds: '☁️',
    rain: '🌧️',
    snow: '❄️',
    default: '🌤️',
  };
  return icons[main.toLowerCase()] || icons.default;
};

export const simulateWeatherData = (days = 5, city = 'Simulated City') => {
  const conditions = ['Clear', 'Clouds', 'Rain', 'Snow'];
  const generateRandomTemp = () => Math.random() * (40 - 5) + 5; // Random temp between 5°C and 40°C
  const generateRandomCondition = () => conditions[Math.floor(Math.random() * conditions.length)];

  const weatherData = [];

  for (let i = 0; i < days * 8; i++) { // Simulating 8 updates per day (3-hour intervals)
    weatherData.push({
      city,
      main: generateRandomCondition(),
      temp: generateRandomTemp(),
      feels_like: generateRandomTemp(),
      dt: Date.now() / 1000 + i * 10800, // 3-hour intervals
    });
  }

  return weatherData;
};