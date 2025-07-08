import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      
      <p className="text-center text-red-600 text-lg font-medium mb-4 max-w-sm">
        {message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105"
        >
          <RefreshCw className="w-4 h-4" />
          تلاش دوباره
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;