import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL_NAME } from '../constants';
import { MessageCircle, Send, Loader2, X, Sparkles } from 'lucide-react';

interface GeminiTutorProps {
  contextTitle: string;
  contextContent: string;
}

export const GeminiTutor: React.FC<GeminiTutorProps> = ({ contextTitle, contextContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    setAnswer('');
    setError('');

    try {
      // NOTE: In a production app, API_KEY should be in env vars or retrieved securely.
      // Assuming process.env.API_KEY is available as per instructions.
      if (!process.env.API_KEY) {
        throw new Error("API Key not found.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `
        You are a helpful teaching assistant for a Differential Geometry course.
        
        Current Section Context: "${contextTitle}"
        Content Snippet: "${contextContent.substring(0, 1000)}..."

        Student Question: "${question}"

        Please provide a concise, clear explanation. If the question involves math, you can use LaTeX wrapped in single $ for inline.
      `;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL_NAME,
        contents: prompt,
      });

      if (response.text) {
        setAnswer(response.text);
      } else {
        setAnswer("I couldn't generate a response.");
      }

    } catch (err: any) {
      console.error(err);
      setError("Failed to connect to the AI tutor. Please check the API Key configuration.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all z-50 flex items-center gap-2"
      >
        <Sparkles size={20} />
        <span className="font-semibold">AI Tutor</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col max-h-[80vh]">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-4 rounded-t-xl flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles size={18} />
          <span className="font-bold">AI Assistant</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-500 p-1 rounded">
          <X size={18} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 overflow-y-auto custom-scrollbar bg-gray-50 min-h-[300px]">
        {answer ? (
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 mb-4">
             <p className="text-gray-800 text-sm whitespace-pre-wrap">{answer}</p>
          </div>
        ) : (
          !loading && <p className="text-gray-500 text-sm text-center mt-10">Ask a question about "{contextTitle}"...</p>
        )}
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded text-sm mb-2">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-8">
            <Loader2 className="animate-spin text-indigo-600" size={24} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200 bg-white rounded-b-xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Explain this theorem..."
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAsk}
            disabled={loading || !question.trim()}
            className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};