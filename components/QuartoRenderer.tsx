import React from 'react';
import { MathRenderer, TextWithMath } from './MathRenderer';
import { Info, AlertCircle, BookOpen, Lightbulb, CheckCircle } from 'lucide-react';

interface QuartoRendererProps {
  content: string;
}

const parseQuartoContent = (text: string) => {
  // Remove frontmatter
  const cleanText = text.replace(/^---[\s\S]*?---/, '').trim();
  
  // Split into blocks (naive splitting by double newline)
  const rawBlocks = cleanText.split(/\n\n+/);
  
  return rawBlocks.map((block, index) => {
    // Check for Headers
    const headerMatch = block.match(/^(#+)\s+(.*)/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const title = headerMatch[2].replace(/\{\.unnumbered\}/, '').trim();
      return { type: 'header', level, content: title, key: index };
    }

    // Check for Callouts
    // Syntax: ::: {.callout-note}\n## Title\nContent\n:::
    if (block.startsWith(':::')) {
      const lines = block.split('\n');
      const typeMatch = lines[0].match(/callout-(\w+)/);
      const type = typeMatch ? typeMatch[1] : 'note';
      
      // Extract title if present (line starting with ## inside callout)
      let title = '';
      let contentLines: string[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === ':::') continue;
        if (lines[i].startsWith('## ')) {
          title = lines[i].replace('## ', '').trim();
        } else {
          contentLines.push(lines[i]);
        }
      }

      return { 
        type: 'callout', 
        calloutType: type, 
        title, 
        content: contentLines.join('\n'), 
        key: index 
      };
    }

    // Check for Block Math
    if (block.trim().startsWith('$$') && block.trim().endsWith('$$')) {
      const latex = block.replace(/^\$\$\s*/, '').replace(/\s*\$\$/, '');
      return { type: 'math', content: latex, key: index };
    }

    // Default Paragraph
    return { type: 'paragraph', content: block, key: index };
  });
};

const CalloutBlock = ({ type, title, content }: { type: string, title: string, content: string }) => {
  let colorClass = 'bg-gray-50 border-gray-500 text-gray-900';
  let Icon = Info;

  switch(type) {
    case 'note':
      colorClass = 'bg-blue-50 border-blue-500 text-blue-900';
      Icon = Info;
      break;
    case 'tip':
      colorClass = 'bg-green-50 border-green-500 text-green-900';
      Icon = Lightbulb;
      break;
    case 'warning':
    case 'caution':
      colorClass = 'bg-yellow-50 border-yellow-500 text-yellow-900';
      Icon = AlertCircle;
      break;
    case 'definition': // Custom mapping for definition style notes
      colorClass = 'bg-indigo-50 border-indigo-500 text-indigo-900';
      Icon = BookOpen;
      break;
    default:
      if (title.toLowerCase().includes('definition')) {
         colorClass = 'bg-indigo-50 border-indigo-500 text-indigo-900';
         Icon = BookOpen;
      } else if (title.toLowerCase().includes('theorem')) {
         colorClass = 'bg-orange-50 border-orange-500 text-orange-900';
         Icon = AlertCircle;
      }
  }

  return (
    <div className={`my-6 border-l-4 p-4 rounded-r-md shadow-sm ${colorClass}`}>
      <div className="flex items-center mb-2 font-bold uppercase text-xs tracking-wider opacity-80">
        <Icon size={16} className="mr-2" />
        {title || type}
      </div>
      <div className="font-serif leading-relaxed text-sm opacity-90">
        <TextWithMath text={content} />
      </div>
    </div>
  );
};

export const QuartoRenderer: React.FC<QuartoRendererProps> = ({ content }) => {
  const blocks = parseQuartoContent(content);

  return (
    <div className="max-w-3xl mx-auto pb-20">
      {blocks.map((b) => {
        if (b.type === 'header') {
          // Fixed: Use React.ElementType instead of global JSX namespace to avoid TypeScript error
          const HeaderTag = `h${Math.min(b.level + 1, 6)}` as React.ElementType;
          const sizes = {
            1: 'text-4xl font-bold text-gray-900 mb-6 mt-10 border-b pb-2',
            2: 'text-2xl font-bold text-gray-800 mb-4 mt-8',
            3: 'text-xl font-semibold text-gray-800 mb-3 mt-6',
            4: 'text-lg font-medium text-gray-700 mb-2 mt-4',
            5: 'text-base font-medium text-gray-700 mb-2 mt-2',
            6: 'text-sm font-bold text-gray-700 mb-1 mt-1',
          };
          // @ts-ignore
          return <HeaderTag key={b.key} className={sizes[b.level] || sizes[2]}>{b.content}</HeaderTag>;
        }

        if (b.type === 'callout') {
          return <CalloutBlock key={b.key} type={b.calloutType!} title={b.title!} content={b.content} />;
        }

        if (b.type === 'math') {
          return <MathRenderer key={b.key} latex={b.content} block={true} />;
        }

        return (
          <p key={b.key} className="mb-4 font-serif text-gray-800 leading-7 text-lg">
            <TextWithMath text={b.content} />
          </p>
        );
      })}
    </div>
  );
};