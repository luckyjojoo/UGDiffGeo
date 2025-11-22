import React, { useState } from 'react';
import { files } from './lib/quartoFiles';
import { FileText, Copy, Check, FolderOpen, FileCode } from 'lucide-react';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>('index.qmd');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (files[selectedFile as keyof typeof files]) {
      navigator.clipboard.writeText(files[selectedFile as keyof typeof files]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <h1 className="font-bold text-lg text-gray-800 flex items-center gap-2">
            <FolderOpen className="text-blue-600" size={20} />
            Quarto Project
          </h1>
          <p className="text-xs text-gray-500 mt-1">Generated from LaTeX notes</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {Object.keys(files).map((fileName) => (
            <button
              key={fileName}
              onClick={() => setSelectedFile(fileName)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors mb-1
                ${selectedFile === fileName 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
              `}
            >
              {fileName.endsWith('.yml') ? (
                <FileCode size={16} className={selectedFile === fileName ? 'text-blue-500' : 'text-gray-400'} />
              ) : (
                <FileText size={16} className={selectedFile === fileName ? 'text-blue-500' : 'text-gray-400'} />
              )}
              {fileName}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* File Header */}
        <div className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6">
          <div className="flex items-center gap-2 font-mono text-sm text-gray-600">
            <span className="text-gray-400">project/</span>
            <span className="text-gray-900 font-medium">{selectedFile}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Content'}
          </button>
        </div>

        {/* File Content */}
        <div className="flex-1 overflow-hidden relative group">
          <textarea
            className="w-full h-full p-6 font-mono text-sm leading-relaxed text-gray-800 bg-gray-50 resize-none focus:outline-none"
            value={files[selectedFile as keyof typeof files]}
            readOnly
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};

export default App;