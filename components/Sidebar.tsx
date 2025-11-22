import React from 'react';
import { Menu, X, GraduationCap, FileText } from 'lucide-react';

interface SidebarProps {
  quartoConfig: string;
  currentFile: string;
  onSelectFile: (file: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  quartoConfig, 
  currentFile, 
  onSelectFile,
  mobileOpen,
  setMobileOpen
}) => {
  // Basic parsing of _quarto.yml to get the sidebar contents
  const parseSidebar = (yaml: string) => {
    const lines = yaml.split('\n');
    const contentsIndex = lines.findIndex(line => line.trim().startsWith('contents:'));
    if (contentsIndex === -1) return [];

    const files = [];
    for (let i = contentsIndex + 1; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(/^\s*-\s*(.*)/);
      if (match) {
        files.push(match[1].trim());
      } else if (line.trim() !== '' && !line.startsWith(' ')) {
        // End of contents block
        break;
      }
    }
    return files;
  };

  const sidebarFiles = parseSidebar(quartoConfig);
  const projectTitle = "Differential Geometry"; // Could also parse from YAML

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-full bg-gray-50 border-r border-gray-200 z-30 w-72 transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static flex flex-col
      `}>
        {/* Header */}
        <div className="p-5 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-blue-700 font-bold text-lg">
              <GraduationCap className="mr-2" />
              {projectTitle}
            </div>
            <button className="md:hidden" onClick={() => setMobileOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="text-xs text-gray-500">
            Course Notes
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <div className="space-y-1">
            {sidebarFiles.map((file) => (
              <button
                key={file}
                onClick={() => {
                  onSelectFile(file);
                  setMobileOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
                  ${currentFile === file 
                    ? 'bg-blue-100 text-blue-800 font-medium shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                `}
              >
                <FileText size={16} className={currentFile === file ? 'text-blue-600' : 'text-gray-400'} />
                {/* Cleanup filename for display */}
                <span className="capitalize">
                  {file.replace('.qmd', '').replace(/^\d+-/, '').replace(/-/g, ' ')}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 text-xs text-center text-gray-400 bg-gray-50">
             Powered by React & GenAI
        </div>
      </div>
    </>
  );
};
