import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FormatSelectorProps {
  selectedFormat: string;
  onFormatChange: (format: string) => void;
  isDarkMode: boolean;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  selectedFormat,
  onFormatChange,
  isDarkMode
}) => {
  const formats = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'txt', label: 'Text File' },
    { value: 'zip', label: 'ZIP Archive' },
    { value: 'jpg', label: 'JPEG Image' },
    { value: 'png', label: 'PNG Image' },
    { value: 'webp', label: 'WebP Image' },
    { value: 'docx', label: 'Word Document' },
    { value: 'xlsx', label: 'Excel Spreadsheet' },
    { value: 'mp4', label: 'MP4 Video' },
    { value: 'mp3', label: 'MP3 Audio' }
  ];

  return (
    <div className="w-full">
      <label className={`block text-sm font-medium mb-2 ${
        isDarkMode ? 'text-gray-200' : 'text-gray-700'
      }`}>
        Output Format
      </label>
      
      <div className="relative">
        <select
          value={selectedFormat}
          onChange={(e) => onFormatChange(e.target.value)}
          className={`
            w-full px-4 py-3 pr-10 rounded-lg border transition-all duration-200 appearance-none cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${isDarkMode 
              ? 'bg-gray-800 border-gray-600 text-gray-200 hover:border-gray-500' 
              : 'bg-white border-gray-300 text-gray-900 hover:border-gray-400'
            }
          `}
        >
          {formats.map((format) => (
            <option 
              key={format.value} 
              value={format.value}
              className={isDarkMode ? 'bg-gray-800' : 'bg-white'}
            >
              {format.label} (.{format.value})
            </option>
          ))}
        </select>
        
        <ChevronDown className={`
          absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none
          ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
        `} />
      </div>
    </div>
  );
};