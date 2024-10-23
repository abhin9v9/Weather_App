export const calculateDailyAggregates = (data) => {
  const dailyData = groupByDate(data);
  return Object.entries(dailyData).map(([date, items]) => ({
    date,
    ...calculateAggregates(items),
    dominantWeather: calculateDominantWeather(items),
  }));
};

const groupByDate = (data) => {
  return data.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    acc[date] = acc[date] || [];
    acc[date].push(item);
    return acc;
  }, {});
};

const calculateAggregates = (items) => {
  const temps = items.map(item => item.temp);
  return {
    avgTemp: (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1),
    maxTemp: Math.max(...temps).toFixed(1),
    minTemp: Math.min(...temps).toFixed(1),
  };
};

const calculateDominantWeather = (items) => {
  const weatherCounts = items.reduce((acc, item) => {
    acc[item.main] = (acc[item.main] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(weatherCounts)
    .reduce((a, b) => a[1] > b[1] ? a : b)[0];
};

export const checkAlertThresholds = (data, threshold) => {
  return data.filter(item => item.temp > threshold);
};

export const formatChartData = (data) => ({
  labels: data.map(item => new Date(item.dt * 1000).toLocaleTimeString()),
  datasets: [{
    label: 'Temperature (°C)',
    data: data.map(item => item.temp),
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
  }],
});