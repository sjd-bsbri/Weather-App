import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { UI_TEXTS } from '../constants/translations';

const WeatherSearch = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative group">
       
        
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder={UI_TEXTS.searchPlaceholder}
          disabled={loading}
          className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 
                     focus:border-blue-500 focus:outline-none 
                     text-gray-700 text-lg placeholder-gray-400
                     bg-white/90 backdrop-blur-sm
                     transition-all duration-300
                     shadow-lg hover:shadow-xl
                     disabled:opacity-50 disabled:cursor-not-allowed"
          dir="rtl"
        />
        
        <button
          type="submit"
          disabled={loading || !city.trim()}
          className="absolute left-2 top-[20%] transform 
                     bg-gradient-to-r from-blue-500 to-purple-600 
                     hover:from-blue-600 hover:to-purple-700
                     text-white font-bold py-2 px-4 rounded-xl
                     shadow-lg hover:shadow-xl
                     transition-all duration-300 transform hover:scale-105
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                     flex items-center gap-2"
        >
          <Search className="w-5 h-5" />
          <span className="hidden sm:inline">{UI_TEXTS.searchButton}</span>
        </button>
      </div>
      
      <div className="mt-4 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full opacity-30"></div>
    </form>
  );
};

export default WeatherSearch;