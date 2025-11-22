import React, { useState } from 'react';
import { files } from './lib/quartoFiles';
import { Sidebar } from './components/Sidebar';
import { QuartoRenderer } from './components/QuartoRenderer';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  // Start with index.qmd or the first available file
  const [currentFile, setCurrentFile] = useState<string>('index.qmd');
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = files[currentFile as keyof typeof files] || "# File not found";
  const quartoConfig = files['_quarto.yml'];

  // Extract Title from Frontmatter for header
  const titleMatch = content.match(/^title:\s*"(.*)"/m);
  const pageTitle = titleMatch ? titleMatch[1] : 'Course Notes';

  return (
    <div className="flex h-screen bg-white text-gray-900 font-sans">
      {/* Sidebar */}
      <Sidebar 
        quartoConfig={quartoConfig} 
        currentFile={currentFile} 
        onSelectFile={setCurrentFile}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
           <span className="font-bold text-gray-800">{pageTitle}</span>
           <button onClick={() => setMobileOpen(true)} className="p-2 text-gray-600">
             <Menu size={24} />
           </button>
        </div>

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 max-w-5xl mx-auto w-full">
          <div className="mb-8 pb-4 border-b border-gray-100">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{pageTitle}</h1>
          </div>
          
          <QuartoRenderer content={content} />

          <footer className="mt-20 pt-6 border-t border-gray-100 text-center text-gray-400 text-sm">
            Generated from LaTeX source
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
