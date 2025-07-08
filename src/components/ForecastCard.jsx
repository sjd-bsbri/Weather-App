import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { getWeatherIcon, toPersianDigits } from '../utils/weatherUtils';
import { UI_TEXTS } from '../constants/translations';

const ForecastCard = ({ forecast, unit, index }) => {
  return (
    <div className={`relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm 
                    border border-white/20 rounded-2xl p-4 shadow-lg hover:shadow-xl 
                    transition-all duration-300 transform hover:scale-105 hover:-translate-y-1
                    ${index === 0 ? 'ring-2 ring-blue-400' : ''}`}>
      
      {index === 0 && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 
                       bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          امروز
        </div>
      )}
      
      <div className="text-center mb-3">
        <p className="font-bold text-gray-800 text-sm">{forecast.date}</p>
      </div>
      
      <div className="flex justify-center mb-3">
        <div className="p-2 bg-white/50 rounded-full">
          {getWeatherIcon(forecast.icon, 48)}
        </div>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-center gap-2">
          <Sun className="w-4 h-4 text-yellow-500" />
          <span className="text-sm text-gray-600">{UI_TEXTS.maxTemp}:</span>
          <span className="font-bold text-gray-900">
            {toPersianDigits(forecast.maxTemp)}°{unit === 'metric' ? 'C' : 'F'}
          </span>
        </div>
        
        <div className="flex items-center justify-center gap-2">
          <Moon className="w-4 h-4 text-indigo-500" />
          <span className="text-sm text-gray-600">{UI_TEXTS.minTemp}:</span>
          <span className="font-bold text-gray-900">
            {toPersianDigits(forecast.minTemp)}°{unit === 'metric' ? 'C' : 'F'}
          </span>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-xs text-gray-600 bg-gray-100 rounded-full px-3 py-1 inline-block">
          {forecast.description}
        </p>
      </div>
      
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
                     w-1/2 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full">
      </div>
    </div>
  );
};

export default ForecastCard;