import { UI_TEXTS } from '../constants/translations';
import { processForecastData } from './weatherUtils';

const API_KEY = "ec0e6006c8bcbfb034c2ef01f4a8b614";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * @param {string} cityName 
 * @param {string} unit 
 * @returns {Promise<Object>} 
 */
export const fetchCurrentWeather = async (cityName, unit = 'metric') => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=${unit}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(UI_TEXTS.errorCityNotFound);
      }
      throw new Error(UI_TEXTS.errorGeneral);
    }

    return await response.json();
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('خطا در اتصال به اینترنت. لطفاً اتصال خود را بررسی کنید.');
    }
    throw error;
  }
};

/**
 
 * @param {string} cityName 
 * @param {string} unit 
 * @returns {Promise<Array>} 
 */
export const fetchWeatherForecast = async (cityName, unit = 'metric') => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=${unit}`
    );

    if (!response.ok) {
      throw new Error(UI_TEXTS.errorForecast);
    }

    const forecastData = await response.json();
    return processForecastData(forecastData.list);
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('خطا در اتصال به اینترنت. لطفاً اتصال خود را بررسی کنید.');
    }
    throw error;
  }
};

/**
 * @param {string} cityName 
 * @param {string} unit 
 * @returns {Promise<Object>} 
 */
export const fetchCompleteWeatherData = async (cityName, unit = 'metric') => {
  try {
    const [weatherData, forecastData] = await Promise.all([
      fetchCurrentWeather(cityName, unit),
      fetchWeatherForecast(cityName, unit)
    ]);

    return {
      weatherData,
      forecastData
    };
  } catch (error) {
    throw error;
  }
};