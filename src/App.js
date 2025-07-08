import React, { useState, useCallback } from 'react';
import { Umbrella,Sun } from 'lucide-react';

// Import components
import WeatherSearch from './components/WeatherSearch';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherDetails from './components/WeatherDetails';
import ForecastList from './components/ForecastList';
import TemperatureToggle from './components/TemperatureToggle';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

// Import utilities and constants
import { fetchCompleteWeatherData } from './utils/api';
import { getBackgroundGradient } from './utils/weatherUtils';
import { UI_TEXTS } from './constants/translations';

/**
 * کامپوننت اصلی برنامه آب و هوا
 * این کامپوننت ریفکتور شده و تمیز شده تا از کامپوننت‌های جداگانه استفاده کند
 */
const App = () => {
  // وضعیت‌های اصلی برنامه
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [lastSearchedCity, setLastSearchedCity] = useState('');

  /**
   * تابع دریافت اطلاعات آب و هوا
   * @param {string} cityName - نام شهر برای جستجو
   */
  const handleSearch = useCallback(async (cityName) => {
    if (!cityName?.trim()) {
      setError(UI_TEXTS.enterCityName);
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastData(null);

    try {
      const { weatherData: currentWeather, forecastData: forecast } = 
        await fetchCompleteWeatherData(cityName.trim(), unit);
      
      setWeatherData(currentWeather);
      setForecastData(forecast);
      setLastSearchedCity(cityName.trim());
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, [unit]);

  /**
   * @param {string} newUnit
   */
  const handleUnitChange = useCallback(async (newUnit) => {
    setUnit(newUnit);
    
    if (lastSearchedCity) {
      await handleSearch(lastSearchedCity);
    }
  }, [lastSearchedCity, handleSearch]);

  
  const handleRetry = useCallback(() => {
    if (lastSearchedCity) {
      handleSearch(lastSearchedCity);
    }
  }, [lastSearchedCity, handleSearch]);

  const backgroundClass = weatherData 
    ? getBackgroundGradient(weatherData.weather[0].icon)
    : 'bg-gradient-to-br from-blue-400 to-purple-600';

  return (
    <div className={`min-h-screen transition-all duration-1000 ease-in-out ${backgroundClass}`}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-4xl 
                       border border-white/20 relative overflow-hidden">
          
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 pointer-events-none"></div>
          
          <div className="relative z-10">
            <header className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Umbrella className="w-8 h-8 text-purple-600 " />
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {UI_TEXTS.appTitle}
                </h1>
                <Sun className="w-8 h-8 text-purple-600 " />
              </div>
              <p className="text-gray-600 text-sm">
                آب و هوای شهرهای جهان را با دقت بالا مشاهده کنید
              </p>
            </header>

            <WeatherSearch onSearch={handleSearch} loading={loading} />

            <TemperatureToggle unit={unit} onUnitChange={handleUnitChange} />

            {loading && <LoadingSpinner />}
            
            {error && (
              <ErrorMessage 
                message={error} 
                onRetry={lastSearchedCity ? handleRetry : null} 
              />
            )}

            {weatherData && !loading && (
              <>
                <WeatherDisplay weatherData={weatherData} unit={unit} />
                <WeatherDetails weatherData={weatherData} unit={unit} />
                <ForecastList forecastData={forecastData} unit={unit} />
              </>
            )}

            {!weatherData && !loading && !error && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full 
                               flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Umbrella className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  خوش آمدید! 🌟
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  برای شروع، نام شهر مورد نظر خود را در کادر بالا وارد کرده و دکمه جستجو را فشار دهید.
                </p>
              </div>
            )}
          </div>

          <footer className="relative z-10 text-center mt-8 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              ساخته شده با ❤️ | داده‌ها از OpenWeatherMap
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;

