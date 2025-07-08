import React from 'react';
import { Droplets, Wind, Thermometer } from 'lucide-react';
import { toPersianDigits } from '../utils/weatherUtils';
import { UI_TEXTS } from '../constants/translations';

const WeatherDetails = ({ weatherData, unit }) => {
  const details = [
    {
      id: 'humidity',
      icon: <Droplets className="w-6 h-6 text-blue-500" />,
      label: UI_TEXTS.humidity,
      value: `${toPersianDigits(weatherData.main.humidity)}%`,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'windSpeed',
      icon: <Wind className="w-6 h-6 text-green-500" />,
      label: UI_TEXTS.windSpeed,
      value: `${toPersianDigits(weatherData.wind.speed)} ${unit === 'metric' ? UI_TEXTS.metricUnit : UI_TEXTS.imperialUnit}`,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'feelsLike',
      icon: <Thermometer className="w-6 h-6 text-red-500" />,
      label: UI_TEXTS.feelsLike,
      value: `${toPersianDigits(Math.round(weatherData.main.feels_like))}°${unit === 'metric' ? 'C' : 'F'}`,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {details.map((detail) => (
        <div
          key={detail.id}
          className={`${detail.bgColor} ${detail.borderColor} border-2 p-4 rounded-2xl 
                     shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105
                     backdrop-blur-sm`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-md">
                {detail.icon}
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">{detail.label}</p>
                <p className="text-lg font-bold text-gray-800">{detail.value}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherDetails;