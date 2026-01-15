
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const GeminiGuru: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getRecommendation = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setResponse(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const res = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I like these books/genres: ${prompt}. Suggest 3 unique book recommendations and tell me why I'd like them. Be concise and literary.`,
        config: {
          systemInstruction: "You are a professional librarian with deep knowledge of literature. Your tone is elegant and helpful.",
        }
      });
      setResponse(res.text || 'Sorry, I couldn\'t generate a recommendation right now.');
    } catch (error) {
      console.error("AI Error:", error);
      setResponse("Our library guru is currently busy. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-amber-900 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-6">
          Meet Your <span className="text-amber-400">Personal AI Guru</span>
        </h2>
        <p className="text-amber-100 mb-10 text-lg">
          Not sure what to read next? Tell our AI-powered librarian about your favorite genres, books, or moods, and get curated recommendations instantly.
        </p>

        <div className="relative max-w-2xl mx-auto mb-10">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && getRecommendation()}
            placeholder="e.g., I love atmospheric sci-fi and historical mysteries..."
            className="w-full bg-white/10 border border-white/20 rounded-full py-4 px-8 text-white placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all text-lg"
          />
          <button
            onClick={getRecommendation}
            disabled={isLoading || !prompt.trim()}
            className={`absolute right-2 top-2 bottom-2 px-6 rounded-full font-bold transition-all flex items-center gap-2 ${
              isLoading || !prompt.trim() 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-amber-400 text-amber-950 hover:bg-amber-300 active:scale-95'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-amber-950/20 border-t-amber-950 rounded-full animate-spin"></div>
                Thinking...
              </>
            ) : (
              <>Get Recommendations</>
            )}
          </button>
        </div>

        {response && (
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-4 text-amber-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                <path d="M7.667 10.844l1.85.793a3.001 3.001 0 002.966 0l1.85-.793.001 5.48a1 1 0 01-.553.894l-4 2a1 1 0 01-.894 0l-4-2a1 1 0 01-.553-.894l.001-5.48z" />
              </svg>
              <h4 className="font-bold text-lg uppercase tracking-wider">The Guru Suggests:</h4>
            </div>
            <div className="text-amber-50 leading-relaxed whitespace-pre-wrap font-serif text-lg italic">
              {response}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GeminiGuru;
