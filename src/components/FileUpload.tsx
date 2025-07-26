import React, { useCallback, useState } from 'react';
import { Upload, File, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onFileRemove: () => void;
  isDarkMode: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  selectedFile,
  onFileRemove,
  isDarkMode
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <label className={`block text-sm font-medium mb-2 ${
        isDarkMode ? 'text-gray-200' : 'text-gray-700'
      }`}>
        Upload File
      </label>
      
      {!selectedFile ? (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer
            ${isDragOver 
              ? isDarkMode 
                ? 'border-blue-400 bg-blue-900/20' 
                : 'border-blue-400 bg-blue-50'
              : isDarkMode
                ? 'border-gray-600 hover:border-gray-500'
                : 'border-gray-300 hover:border-gray-400'
            }
            ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}
          `}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <input
            id="file-input"
            type="file"
            className="hidden"
            onChange={handleFileInput}
            accept="*/*"
          />
          
          <Upload className={`w-12 h-12 mx-auto mb-4 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-400'
          }`} />
          
          <div className={`text-lg font-medium mb-2 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-900'
          }`}>
            {isDragOver ? 'Drop your file here' : 'Drag & drop your file here'}
          </div>
          
          <div className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            or <span className="text-blue-600 hover:text-blue-700 font-medium">browse files</span>
          </div>
          
          <div className={`text-xs mt-3 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Supports all file types • Max 100MB
          </div>
        </div>
      ) : (
        <div className={`
          border rounded-lg p-4 transition-all duration-200
          ${isDarkMode 
            ? 'border-gray-600 bg-gray-800/50' 
            : 'border-gray-200 bg-white'
          }
        `}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`
                p-2 rounded-lg
                ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'}
              `}>
                <File className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className={`font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  {selectedFile.name}
                </div>
                <div className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {formatFileSize(selectedFile.size)}
                </div>
              </div>
            </div>
            
            <button
              onClick={onFileRemove}
              className={`
                p-1 rounded-full transition-colors duration-200
                ${isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
                }
              `}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};