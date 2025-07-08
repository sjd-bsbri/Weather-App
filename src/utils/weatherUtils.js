import { 
  Sun, 
  Moon, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudSun, 
  CloudMoon, 
  Cloudy,
  CloudDrizzle
} from 'lucide-react';
import { WEATHER_TRANSLATIONS, PERSIAN_DIGITS } from '../constants/translations';

/**
 * @param {string|number} input 
 * @returns {string} 
 */
export const toPersianDigits = (input) => {
  if (input === null || input === undefined) return '';
  
  return input.toString().replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[digit] || digit);
};

/**
 * @param {string} englishDescription 
 * @returns {string} 
 */
export const translateWeatherDescription = (englishDescription) => {
  if (!englishDescription) return '';
  
  return WEATHER_TRANSLATIONS[englishDescription.toLowerCase()] || englishDescription;
};

/**
 * @param {string} iconCode 
 * @param {number} size 
 * @returns {JSX.Element} 
 */
export const getWeatherIcon = (iconCode, size = 64) => {
  const iconProps = { size, className: getIconClassName(iconCode) };
  
  switch (iconCode) {
    case '01d': 
      return <Sun {...iconProps} />;
    case '01n': 
      return <Moon {...iconProps} />;
    case '02d': 
      return <CloudSun {...iconProps} />;
    case '02n': 
      return <CloudMoon {...iconProps} />;
    case '03d': 
    case '03n': 
      return <Cloud {...iconProps} />;
    case '04d': 
    case '04n': 
      return <Cloudy {...iconProps} />;
    case '09d': 
    case '09n': 
      return <CloudDrizzle {...iconProps} />;
    case '10d':
    case '10n': 
      return <CloudRain {...iconProps} />;
    case '11d': 
    case '11n': 
      return <CloudLightning {...iconProps} />;
    case '13d': 
    case '13n': 
      return <CloudSnow {...iconProps} />;
    case '50d': 
    case '50n': 
      return <Cloud {...iconProps} />;
    default:
      return <Cloud {...iconProps} />;
  }
};

/**
 * @param {string} iconCode 
 * @returns {string} 
 */
const getIconClassName = (iconCode) => {
  switch (iconCode) {
    case '01d': return 'text-yellow-500 drop-shadow-lg';
    case '01n': return 'text-indigo-400 drop-shadow-lg';
    case '02d': return 'text-yellow-400 drop-shadow-lg';
    case '02n': return 'text-indigo-300 drop-shadow-lg';
    case '03d':
    case '03n': return 'text-gray-400 drop-shadow-lg';
    case '04d':
    case '04n': return 'text-gray-500 drop-shadow-lg';
    case '09d':
    case '09n': return 'text-blue-400 drop-shadow-lg';
    case '10d':
    case '10n': return 'text-blue-500 drop-shadow-lg';
    case '11d':
    case '11n': return 'text-purple-600 drop-shadow-lg';
    case '13d':
    case '13n': return 'text-blue-100 drop-shadow-lg';
    case '50d':
    case '50n': return 'text-gray-300 drop-shadow-lg';
    default: return 'text-gray-400 drop-shadow-lg';
  }
};

/**
 * @param {Date} date 
 * @returns {string} 
 */
export const formatPersianDate = (date) => {
  try {
    const persianDate = new Intl.DateTimeFormat('fa-IR', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    }).format(date);
    
    return toPersianDigits(persianDate);
  } catch (error) {
    const weekdays = ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    const months = ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن', 'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'];
    
    const weekday = weekdays[date.getDay()];
    const month = months[date.getMonth()];
    const day = toPersianDigits(date.getDate());
    
    return `${weekday}، ${day} ${month}`;
  }
};

/**
 * @param {Array} forecastList 
 * @returns {Array} 
 */
export const processForecastData = (forecastList) => {
  const dailyForecastMap = {};
  
  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dateKey = formatPersianDate(date);
    
    if (!dailyForecastMap[dateKey]) {
      dailyForecastMap[dateKey] = {
        temps: [],
        icons: [],
        descriptions: []
      };
    }
    
    dailyForecastMap[dateKey].temps.push(item.main.temp);
    dailyForecastMap[dateKey].icons.push(item.weather[0].icon);
    dailyForecastMap[dateKey].descriptions.push(item.weather[0].description);
  });
  
  return Object.keys(dailyForecastMap).slice(0, 5).map(date => {
    const temps = dailyForecastMap[date].temps;
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    
    const mostFrequentIcon = getMostFrequent(dailyForecastMap[date].icons);
    const mostFrequentDescription = getMostFrequent(dailyForecastMap[date].descriptions);
    
    return {
      date,
      minTemp: Math.round(minTemp),
      maxTemp: Math.round(maxTemp),
      icon: mostFrequentIcon,
      description: translateWeatherDescription(mostFrequentDescription)
    };
  });
};

/**
 * @param {Array} array 
 * @returns {*} 
 */
const getMostFrequent = (array) => {
  return array.sort((a, b) =>
    array.filter(v => v === a).length - array.filter(v => v === b).length
  ).pop();
};

/**
 * @param {string} iconCode 
 * @returns {string} 
 */
export const getBackgroundGradient = (iconCode) => {
  switch (iconCode) {
    case '01d': return 'bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400';
    case '01n': return 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900';
    case '02d':
    case '03d': return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';
    case '02n':
    case '03n': return 'bg-gradient-to-br from-indigo-800 via-blue-900 to-purple-900';
    case '04d':
    case '04n': return 'bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800';
    case '09d':
    case '10d':
    case '11d': return 'bg-gradient-to-br from-gray-700 via-blue-800 to-blue-900';
    case '09n':
    case '10n':
    case '11n': return 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900';
    case '13d':
    case '13n': return 'bg-gradient-to-br from-blue-200 via-blue-300 to-white';
    case '50d':
    case '50n': return 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600';
    default: return 'bg-gradient-to-br from-blue-400 to-purple-600';
  }
};