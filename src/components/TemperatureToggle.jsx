import React from 'react';
import { Thermometer } from 'lucide-react';

const TemperatureToggle = ({ unit, onUnitChange }) => {
  return (
    <div className="flex justify-center items-center mb-6">
      <div className="flex bg-gradient-to-r from-blue-100 to-purple-100 rounded-full p-1 shadow-lg">
        <div className="flex items-center gap-1 mr-2">
          <Thermometer className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600 font-medium">واحد دما:</span>
        </div>
        
        <button
          onClick={() => onUnitChange('metric')}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 transform ${
            unit === 'metric' 
              ? 'bg-blue-500 text-white shadow-lg scale-105' 
              : 'text-gray-700 hover:bg-blue-200 hover:scale-102'
          }`}
        >
          سلسیوس (°C)
        </button>
        
        <button
          onClick={() => onUnitChange('imperial')}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 transform ${
            unit === 'imperial' 
              ? 'bg-purple-500 text-white shadow-lg scale-105' 
              : 'text-gray-700 hover:bg-purple-200 hover:scale-102'
          }`}
        >
          فارنهایت (°F)
        </button>
      </div>
    </div>
  );
};

export default TemperatureToggle;