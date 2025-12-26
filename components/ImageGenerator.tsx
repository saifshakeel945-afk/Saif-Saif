
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';

interface ImageGeneratorProps {
  onBack: () => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hqMode, setHqMode] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;

    try {
      setLoading(true);
      setError(null);
      
      if (hqMode) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) await window.aistudio.openSelectKey();
      }

      const imageUrl = await GeminiService.generateImage(prompt, hqMode);
      setResult(imageUrl);
    } catch (err) {
      setError('Failed to generate image. Please try a different prompt.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <button 
        onClick={onBack}
        className="mb-8 text-indigo-600 flex items-center gap-2 hover:underline"
      >
        <i className="fas fa-arrow-left"></i> Back to Suite
      </button>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Image Studio</h1>
            <p className="text-gray-600">Experience world-class image generation with Gemini's multi-modal intelligence.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Enter Prompt</label>
              <textarea
                className="w-full h-32 p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 outline-none resize-none mb-4 text-gray-800"
                placeholder="A breathtaking portrait of a cybernetic goddess, intricate golden circuits, hyper-realistic, 8k..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center">
                  <i className="fas fa-crown"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Pro Quality</h4>
                  <p className="text-xs text-gray-500 italic">Uses Gemini 3 Pro (Requires Paid Key)</p>
                </div>
              </div>
              <button 
                onClick={() => setHqMode(!hqMode)}
                className={`w-14 h-8 rounded-full transition-all relative ${hqMode ? 'bg-pink-600' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${hqMode ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt}
              className="w-full py-4 bg-pink-600 text-white font-bold rounded-2xl shadow-lg hover:bg-pink-500 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
            >
              {loading ? <i className="fas fa-spinner animate-spin"></i> : <i className="fas fa-wand-sparkles"></i>}
              {loading ? 'Processing Visuals...' : 'Generate Artwork'}
            </button>
            
            {error && (
              <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
            )}
          </div>
        </div>

        <div className="lg:w-[500px]">
          <div className="aspect-square bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative group">
            {result ? (
              <>
                <img src={result} alt="Generated" className="w-full h-full object-cover" />
                <a 
                  href={result} 
                  download="tweakai-art.png"
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-xs font-bold shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <i className="fas fa-download mr-1"></i> Save Image
                </a>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 p-12 text-center">
                {loading ? (
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="w-48 h-48 bg-gray-100 rounded-2xl mb-6"></div>
                    <div className="h-4 w-32 bg-gray-100 rounded mb-2"></div>
                    <div className="h-3 w-24 bg-gray-100 rounded"></div>
                  </div>
                ) : (
                  <>
                    <i className="fas fa-images text-8xl mb-6 opacity-10"></i>
                    <p className="text-gray-400">The canvas is empty. Start prompting to see the magic.</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
