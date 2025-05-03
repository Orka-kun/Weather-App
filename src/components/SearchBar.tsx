import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../store/weatherSlice';
import { AppDispatch } from '../store';

const SearchBar: React.FC = () => {
  const [city, setCity] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && city.trim()) {
      dispatch(fetchWeather(city.trim()));
      setCity('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleSearch}
        placeholder="Enter city name"
        className="w-full p-3 rounded-lg !bg-gray-800 dark:bg-gray-700 !text-white dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white"
      />
    </div>
  );
};

export default SearchBar;
