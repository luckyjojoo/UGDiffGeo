import React, { useState } from 'react';
import { CourseData, Chapter } from '../types';
import { ChevronDown, ChevronRight, Menu, X, GraduationCap } from 'lucide-react';

interface SidebarProps {
  courseData: CourseData;
  currentSectionId: string;
  onSelectSection: (chapterId: string, sectionId: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  courseData, 
  currentSectionId, 
  onSelectSection,
  mobileOpen,
  setMobileOpen
}) => {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(courseData.chapters.map(c => c.id)));

  const toggleChapter = (chapterId: string) => {
    const next = new Set(expandedChapters);
    if (next.has(chapterId)) {
      next.delete(chapterId);
    } else {
      next.add(chapterId);
    }
    setExpandedChapters(next);
  };

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
              {courseData.title}
            </div>
            <button className="md:hidden" onClick={() => setMobileOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="text-xs text-gray-500">
            By {courseData.author} <br/>
            {courseData.institution}
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          {courseData.chapters.map((chapter) => (
            <div key={chapter.id} className="mb-4">
              <button 
                onClick={() => toggleChapter(chapter.id)}
                className="w-full flex items-center justify-between text-left font-semibold text-gray-700 text-sm hover:text-blue-600 mb-2"
              >
                <span>{chapter.title}</span>
                {expandedChapters.has(chapter.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {expandedChapters.has(chapter.id) && (
                <div className="ml-3 pl-3 border-l border-gray-200 space-y-1">
                  {chapter.sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        onSelectSection(chapter.id, section.id);
                        setMobileOpen(false);
                      }}
                      className={`
                        w-full text-left text-sm py-1.5 px-2 rounded transition-colors
                        ${currentSectionId === section.id 
                          ? 'bg-blue-100 text-blue-800 font-medium' 
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                      `}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200 text-xs text-center text-gray-400 bg-gray-50">
             &copy; {new Date().getFullYear()} {courseData.author}
        </div>
      </div>
    </>
  );
};