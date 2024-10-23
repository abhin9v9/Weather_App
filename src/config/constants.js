export const CITIES = [
    'Delhi',
    'Mumbai',
    'Chennai',
    'Bangalore',
    'Kolkata',
    'Hyderabad',
  ];
  
  export const WEATHER_CONFIG = {
    UPDATE_INTERVAL: 5 * 60 * 1000, // 5 minutes in milliseconds
    TEMPERATURE_THRESHOLD: 35, // Celsius
    CONSECUTIVE_ALERTS: 2,
  };

  export const setAlertThreshold = (newThreshold) => {
  WEATHER_CONFIG.TEMPERATURE_THRESHOLD = newThreshold.tempThreshold || WEATHER_CONFIG.TEMPERATURE_THRESHOLD;
  WEATHER_CONFIG.CONSECUTIVE_ALERTS = newThreshold.consecutiveAlerts || WEATHER_CONFIG.CONSECUTIVE_ALERTS;
};

  export const CHART_COLORS = {
    primary: 'rgb(255, 99, 132)',
    background: 'rgba(255, 99, 132, 0.5)',
  };