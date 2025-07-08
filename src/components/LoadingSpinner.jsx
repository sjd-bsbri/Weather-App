import React from 'react';
import { Loader2 } from 'lucide-react';
import { UI_TEXTS } from '../constants/translations';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        
        <div className="absolute inset-0 w-12 h-12 border-4 border-blue-200 rounded-full animate-pulse"></div>
      </div>
      
      <p className="mt-4 text-lg text-gray-600 animate-pulse font-medium">
        {UI_TEXTS.loading}
      </p>
      
      <div className="flex space-x-1 space-x-reverse mt-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;