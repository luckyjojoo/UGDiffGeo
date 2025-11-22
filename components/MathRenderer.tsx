import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import { KATEX_MACROS } from '../constants';

interface MathRendererProps {
  latex: string;
  block?: boolean;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ latex, block = false, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(latex, containerRef.current, {
          throwOnError: false,
          displayMode: block,
          macros: KATEX_MACROS,
          trust: true // Allow some basic styling commands
        });
      } catch (e) {
        console.error("KaTeX render error:", e);
        containerRef.current.innerText = latex;
      }
    }
  }, [latex, block]);

  return <span ref={containerRef} className={`${className} ${block ? 'block my-4 overflow-x-auto py-2' : 'inline'}`} />;
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