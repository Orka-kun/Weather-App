import React from 'react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{data.name}</h2>
      <img
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
        alt={data.weather[0].description}
        className="mx-auto my-4"
      />
      <p className="text-xl text-gray-700 dark:text-white">
        {Math.round(data.main.temp)}°C
      </p>
      <p className="text-lg capitalize text-gray-600 dark:text-gray-300">
        {data.weather[0].description}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Humidity: {data.main.humidity}% | Wind: {data.wind.speed} m/s
      </p>
    </div>
  );
};

export default WeatherCard;