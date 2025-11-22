import React from 'react';
import { BlockType, ContentBlock } from '../types';
import { MathRenderer, TextWithMath } from './MathRenderer';
import { BookOpen, AlertCircle, CheckCircle, Edit3, PenTool } from 'lucide-react';

interface BlockRendererProps {
  block: ContentBlock;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  const renderContent = (text: string) => <TextWithMath text={text} />;

  switch (block.type) {
    case BlockType.LATEX:
      return <MathRenderer latex={block.content} block={true} />;
    
    case BlockType.IMAGE:
      return (
        <div className="my-6 flex flex-col items-center">
            <div className="w-full max-w-lg h-64 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 mb-2">
                 {/* Placeholder since we can't generate the actual TikZ/PDFs from the latex source dynamically */}
                 <span className="text-sm italic">Figure: {block.title || 'Diagram Placeholder'}</span>
            </div>
            {block.title && <span className="text-sm text-gray-500 font-medium">Figure: {block.title}</span>}
        </div>
      );

    case BlockType.DEFINITION:
      return (
        <div className="my-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md shadow-sm">
          <div className="flex items-center mb-2 text-blue-800 font-bold uppercase text-xs tracking-wider">
            <BookOpen size={16} className="mr-2" />
            Definition {block.title ? `: ${block.title}` : ''}
          </div>
          <div className="text-gray-800 font-serif leading-relaxed">
            {renderContent(block.content)}
          </div>
        </div>
      );

    case BlockType.THEOREM:
      return (
        <div className="my-6 bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-md shadow-sm">
          <div className="flex items-center mb-2 text-orange-800 font-bold uppercase text-xs tracking-wider">
            <AlertCircle size={16} className="mr-2" />
            Theorem {block.title ? `: ${block.title}` : ''}
          </div>
          <div className="text-gray-900 font-serif italic leading-relaxed">
            {renderContent(block.content)}
          </div>
        </div>
      );

    case BlockType.PROOF:
      return (
        <div className="my-4 ml-4 pl-4 border-l-2 border-gray-200">
          <div className="text-gray-500 italic font-semibold text-sm mb-1 flex items-center">
            <PenTool size={14} className="mr-2"/> Proof
          </div>
          <div className="text-gray-700 font-serif leading-relaxed text-sm">
            {renderContent(block.content)}
            <span className="float-right font-bold text-gray-400">□</span>
          </div>
          <div className="clear-both"></div>
        </div>
      );

    case BlockType.EXAMPLE:
      return (
        <div className="my-6 bg-gray-50 border border-gray-200 p-4 rounded-md">
          <div className="flex items-center mb-2 text-gray-600 font-bold text-sm">
            <Edit3 size={16} className="mr-2" />
            Example
          </div>
          <div className="text-gray-800 font-serif leading-relaxed text-sm">
            {renderContent(block.content)}
          </div>
        </div>
      );

    case BlockType.EXERCISE:
        return (
          <div className="my-4 p-4 border border-dashed border-gray-300 rounded-lg bg-white">
             <div className="flex items-center mb-2 text-gray-500 font-bold text-xs uppercase">
               <CheckCircle size={14} className="mr-2" /> Exercise
             </div>
             <div className="text-gray-800 font-serif text-sm">
               {renderContent(block.content)}
             </div>
          </div>
        );

    case BlockType.PARAGRAPH:
    default:
      return (
        <p className="my-4 text-gray-800 font-serif leading-7 text-lg">
          {renderContent(block.content)}
        </p>
      );
  }
};