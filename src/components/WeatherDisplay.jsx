import React from 'react';
import { MapPin, Calendar as CalendarIcon } from 'lucide-react';
import { getWeatherIcon, translateWeatherDescription, toPersianDigits } from '../utils/weatherUtils';

const WeatherDisplay = ({ weatherData, unit }) => {
  if (!weatherData) return null;

  const getCurrentPersianDate = () => {
    try {
      const now = new Date();
      const persianDate = new Intl.DateTimeFormat('fa-IR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(now);
      return toPersianDigits(persianDate);
    } catch (error) {
      return toPersianDigits(new Date().toLocaleDateString('fa-IR'));
    }
  };

  const getCurrentPersianTime = () => {
    try {
      const now = new Date();
      const persianTime = new Intl.DateTimeFormat('fa-IR', {
        hour: '2-digit',
        minute: '2-digit'
      }).format(now);
      return toPersianDigits(persianTime);
    } catch (error) {
      return toPersianDigits(new Date().toLocaleTimeString('fa-IR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    }
  };

  return (
    <div className="text-center mt-6">
      <div className="mb-4 space-y-1">
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <CalendarIcon className="w-4 h-4" />
          <span className="text-sm font-medium">{getCurrentPersianDate()}</span>
        </div>
        <div className="text-xs text-gray-500">
          آخرین بروزرسانی: {getCurrentPersianTime()}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-red-500" />
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {weatherData.name}
          </h2>
        </div>
        <p className="text-lg text-gray-600 font-medium">
          {weatherData.sys.country}
        </p>
      </div>

      <div className="flex items-center justify-center my-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-lg opacity-20 scale-110"></div>
          <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-full shadow-xl">
            {getWeatherIcon(weatherData.weather[0].icon, 80)}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {toPersianDigits(Math.round(weatherData.main.temp))}°
        </p>
        <p className="text-lg text-gray-600 mt-1">
          {unit === 'metric' ? 'سلسیوس' : 'فارنهایت'}
        </p>
      </div>

      <div className="mb-6">
        <p className="text-xl md:text-2xl text-gray-700 font-medium bg-gray-100 rounded-full px-6 py-2 inline-block">
          {translateWeatherDescription(weatherData.weather[0].description)}
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 text-gray-600 bg-white/50 backdrop-blur-sm rounded-2xl px-6 py-3 inline-block">
        <div className="flex items-center gap-1">
          <span className="text-sm">حداکثر:</span>
          <span className="font-bold">
            {toPersianDigits(Math.round(weatherData.main.temp_max))}°
          </span>
        </div>
        <div className="w-px h-4 bg-gray-300"></div>
        <div className="flex items-center gap-1">
          <span className="text-sm">حداقل:</span>
          <span className="font-bold">
            {toPersianDigits(Math.round(weatherData.main.temp_min))}°
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;