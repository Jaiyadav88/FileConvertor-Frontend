import React from 'react';

interface CompressionToggleProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  isDarkMode: boolean;
}

export const CompressionToggle: React.FC<CompressionToggleProps> = ({
  isEnabled,
  onToggle,
  isDarkMode
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div>
          <label className={`block text-sm font-medium ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Enable Compression
          </label>
          <p className={`text-xs mt-1 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Reduce file size for faster processing
          </p>
        </div>
        
        <button
          onClick={() => onToggle(!isEnabled)}
          className={`
            relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${isEnabled 
              ? 'bg-blue-600' 
              : isDarkMode 
                ? 'bg-gray-600' 
                : 'bg-gray-200'
            }
            ${isDarkMode ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'}
          `}
        >
          <span
            className={`
              inline-block w-4 h-4 bg-white rounded-full shadow-lg transform transition-transform duration-200
              ${isEnabled ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
      </div>
    </div>
  );
};