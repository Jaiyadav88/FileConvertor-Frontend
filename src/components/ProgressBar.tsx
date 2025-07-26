import React from 'react';

interface ProgressBarProps {
  progress: number;
  status: 'idle' | 'uploading' | 'converting' | 'complete' | 'error';
  isDarkMode: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  status,
  isDarkMode
}) => {
  const getStatusText = () => {
    switch (status) {
      case 'uploading':
        return 'Uploading file...';
      case 'converting':
        return 'Converting file...';
      case 'complete':
        return 'Conversion complete!';
      case 'error':
        return 'Conversion failed';
      default:
        return 'Ready to convert';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'uploading':
      case 'converting':
        return 'text-blue-600';
      case 'complete':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return isDarkMode ? 'text-gray-400' : 'text-gray-500';
    }
  };

  if (status === 'idle') {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className={`text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
        <span className={`text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {Math.round(progress)}%
        </span>
      </div>
      
      <div className={`
        w-full h-2 rounded-full overflow-hidden
        ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}
      `}>
        <div
          className={`
            h-full rounded-full transition-all duration-300 ease-out
            ${status === 'error' 
              ? 'bg-red-500' 
              : status === 'complete'
                ? 'bg-green-500'
                : 'bg-blue-500'
            }
          `}
          style={{
            width: `${progress}%`,
            transform: status === 'converting' ? 'translateX(-100%)' : 'translateX(0)',
            animation: status === 'converting' ? 'progress-wave 2s infinite' : 'none'
          }}
        />
      </div>
    </div>
  );
};