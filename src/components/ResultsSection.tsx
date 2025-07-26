import React from 'react';
import { Download, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ResultsSectionProps {
  status: 'idle' | 'uploading' | 'converting' | 'complete' | 'error';
  errorMessage?: string;
  downloadUrl?: string;
  fileName?: string;
  isDarkMode: boolean;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  status,
  errorMessage,
  downloadUrl,
  fileName,
  isDarkMode
}) => {
  if (status === 'idle' || status === 'uploading' || status === 'converting') {
    return null;
  }

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName || 'converted-file';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={`
      w-full p-4 rounded-lg border transition-all duration-300
      ${status === 'complete' 
        ? isDarkMode 
          ? 'bg-green-900/20 border-green-700' 
          : 'bg-green-50 border-green-200'
        : isDarkMode 
          ? 'bg-red-900/20 border-red-700' 
          : 'bg-red-50 border-red-200'
      }
    `}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {status === 'complete' ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600" />
          )}
        </div>
        
        <div className="flex-1">
          {status === 'complete' ? (
            <>
              <h3 className={`font-medium ${
                isDarkMode ? 'text-green-200' : 'text-green-800'
              }`}>
                File converted successfully!
              </h3>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-green-300' : 'text-green-600'
              }`}>
                Your file has been converted and is ready for download.
              </p>
              
              {downloadUrl && (
                <button
                  onClick={handleDownload}
                  className={`
                    mt-3 inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${isDarkMode 
                      ? 'bg-green-800 hover:bg-green-700 text-green-100' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                    }
                  `}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download File
                </button>
              )}
            </>
          ) : (
            <>
              <h3 className={`font-medium ${
                isDarkMode ? 'text-red-200' : 'text-red-800'
              }`}>
                Conversion failed
              </h3>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-red-300' : 'text-red-600'
              }`}>
                {errorMessage || 'An unexpected error occurred during conversion.'}
              </p>
              
              <div className={`
                mt-3 p-3 rounded-lg flex items-start space-x-2
                ${isDarkMode ? 'bg-red-900/30' : 'bg-red-100'}
              `}>
                <AlertCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  isDarkMode ? 'text-red-400' : 'text-red-500'
                }`} />
                <div className={`text-xs ${
                  isDarkMode ? 'text-red-300' : 'text-red-600'
                }`}>
                  Try checking your file format or reducing the file size. If the problem persists, please contact support.
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};