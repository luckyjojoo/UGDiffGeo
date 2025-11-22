import React from 'react';
import katex from 'katex';
import { KATEX_MACROS } from '../constants';

interface MathRendererProps {
  latex: string;
  block?: boolean;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ latex, block = false, className = '' }) => {
  try {
    const html = katex.renderToString(latex, {
      throwOnError: false,
      displayMode: block,
      macros: KATEX_MACROS,
      trust: true // Allow some basic styling commands
    });

    return (
      <span 
        className={`${className} ${block ? 'block my-4 overflow-x-auto py-2' : 'inline'}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (e) {
    console.error("KaTeX render error:", e);
    return (
      <span className={`${className} ${block ? 'block my-4 overflow-x-auto py-2' : 'inline'}`}>
        {latex}
      </span>
    );
  }
};

// Helper to render mixed text and inline math
export const TextWithMath: React.FC<{ text: string }> = ({ text }) => {
  // Simple parser: splits by $...$ for inline math
  // Note: This is a basic implementation. Complex nested $ might need a real parser.
  const parts = text.split(/(\$[^$]+\$)/g);

  return (
    <span>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          return <MathRenderer key={index} latex={part.slice(1, -1)} block={false} />;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};