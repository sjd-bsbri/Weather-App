import React from 'react';
import { Calendar } from 'lucide-react';
import ForecastCard from './ForecastCard';
import { UI_TEXTS } from '../constants/translations';

const ForecastList = ({ forecastData, unit }) => {
  if (!forecastData || forecastData.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 pt-6 border-t-2 border-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Calendar className="w-6 h-6 text-purple-600" />
        <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {UI_TEXTS.forecast}
        </h3>
        <Calendar className="w-6 h-6 text-purple-600" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {forecastData.map((forecast, index) => (
          <ForecastCard
            key={index}
            forecast={forecast}
            unit={unit}
            index={index}
          />
        ))}
      </div>
      
      <div className="mt-6 h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full opacity-20"></div>
    </div>
  );
};

export default ForecastList;