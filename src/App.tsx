import React, { useState } from 'react';
import axios from 'axios';
import { FileUpload } from './components/FileUpload';
import { FormatSelector } from './components/FormatSelector';
import { CompressionToggle } from './components/CompressionToggle';
import { ProgressBar } from './components/ProgressBar';
import { ResultsSection } from './components/ResultsSection';
import { ThemeToggle } from './components/ThemeToggle';
import { FileText, Zap } from 'lucide-react';

type ConversionStatus = 'idle' | 'uploading' | 'converting' | 'complete' | 'error';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [compressionEnabled, setCompressionEnabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<ConversionStatus>('idle');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string>();
  const [fileName, setFileName] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setStatus('idle');
    setProgress(0);
    setDownloadUrl(undefined);
    setErrorMessage(undefined);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setStatus('idle');
    setProgress(0);
    setDownloadUrl(undefined);
    setErrorMessage(undefined);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('targetFormat', selectedFormat);
    formData.append('compress', String(compressionEnabled));
    try {
      setStatus('uploading');
      setProgress(0);

      const response = await axios.post('https://fileconvertor-backend-production.up.railway.app/api/files/convert', formData, {
        responseType: 'blob',
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          const percent = e.total ? Math.round((e.loaded / e.total) * 50) : 0;
          setProgress(percent);
        },
        onDownloadProgress: (e) => {
          const percent = e.total ? 50 + Math.round((e.loaded / e.total) * 50) : progress;
          setProgress(percent);
        }
      });
      setStatus('converting'); 
      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      const ext = compressionEnabled ? 'zip' : selectedFormat;
      setFileName(`${selectedFile.name.split('.').slice(0, -1).join('.') || 'converted-file'}.${ext}`);
      setProgress(100);
      setStatus('complete');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.response?.data?.message || err.message || 'Conversion failed');
      setProgress(0);
    }
  };
  const isSubmitDisabled = !selectedFile || status === 'uploading' || status === 'converting';
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <header className={`border-b transition-colors duration-300 ${
        isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>FileForge</h1>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Convert & Compress Files</p>
            </div>
          </div>
          <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className={`
          bg-white rounded-2xl shadow-xl border transition-colors duration-300 overflow-hidden
          ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <div className="p-8">
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>File Converter & Compressor</h2>
              <p className={`${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Upload your file, choose format, and convert instantly</p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <FileUpload
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                onFileRemove={handleFileRemove}
                isDarkMode={isDarkMode}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormatSelector
                  selectedFormat={selectedFormat}
                  onFormatChange={setSelectedFormat}
                  isDarkMode={isDarkMode}
                />
                <CompressionToggle
                  isEnabled={compressionEnabled}
                  onToggle={setCompressionEnabled}
                  isDarkMode={isDarkMode}
                />
              </div>

              {/* Progress Bar */}
              <ProgressBar
                progress={progress}
                status={status}
                isDarkMode={isDarkMode}
              />

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                className={`
                  w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 flex items-center justify-center space-x-2
                  ${isSubmitDisabled
                    ? isDarkMode
                      ? 'bg-gray-700 cursor-not-allowed'
                      : 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 active:transform active:scale-[0.98] shadow-lg hover:shadow-xl'
                  }
                `}
              >
                <Zap className="w-5 h-5" />
                <span>
                  {status === 'uploading' || status === 'converting'
                    ? 'Processing...'
                    : 'Convert File'}
                </span>
              </button>

              {/* Results Section */}
              <ResultsSection
                status={status}
                errorMessage={errorMessage}
                downloadUrl={downloadUrl}
                fileName={fileName}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>Secure file processing • No files stored on server • Privacy guaranteed</p>
        </div>
      </main>
    </div>
  );
}

export default App;
