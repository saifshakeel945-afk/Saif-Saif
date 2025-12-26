
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';

interface VideoGeneratorProps {
  onBack: () => void;
}

const VideoGenerator: React.FC<VideoGeneratorProps> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('');

  const handleGenerate = async () => {
    if (!prompt) return;

    try {
      setLoading(true);
      setError(null);
      setResult(null);
      setStatus('Connecting to Veo nodes...');
      
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        setStatus('Please select an API key to proceed with Veo video generation.');
        await window.aistudio.openSelectKey();
      }

      setStatus('Processing creative prompt...');
      const url = await GeminiService.generateVideo(prompt);
      setResult(url);
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes('Entity was not found')) {
        setError('API Key configuration issue. Re-selecting key...');
        await window.aistudio.openSelectKey();
      } else {
        setError('Video generation timed out or failed. Please try a simpler prompt.');
      }
    } finally {
      setLoading(false);
      setStatus('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button 
        onClick={onBack}
        className="mb-8 text-indigo-600 flex items-center gap-2 hover:underline"
      >
        <i className="fas fa-arrow-left"></i> Back to Suite
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Veo 3 Video Generator</h1>
            <p className="text-gray-600">Enter a detailed scene description. Veo excels at cinematic movements and intricate lighting.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <textarea
              className="w-full h-40 p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none mb-4 text-gray-700"
              placeholder="A futuristic cyber-city at dusk, rainy streets with neon reflections, cinematic 4k, hyper-detailed..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
            />
            
            <div className="flex flex-col gap-4">
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt}
                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-500 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner animate-spin"></i> Generating Video...
                  </>
                ) : (
                  <>
                    <i className="fas fa-magic"></i> Generate High-Def Video
                  </>
                )}
              </button>
              
              {status && (
                <p className="text-sm text-center text-indigo-500 animate-pulse">{status}</p>
              )}
              
              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                  {error}
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-indigo-50 p-6 rounded-2xl">
            <h4 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
              <i className="fas fa-lightbulb"></i> Pro Tips
            </h4>
            <ul className="text-sm text-indigo-700 space-y-2 list-disc pl-5">
              <li>Mention camera angles (e.g., "slow drone sweep").</li>
              <li>Describe lighting (e.g., "volumetric god rays").</li>
              <li>Specify the mood (e.g., "melancholic", "high-octane").</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-100 rounded-3xl min-h-[400px] flex items-center justify-center overflow-hidden relative shadow-inner">
          {result ? (
            <video 
              src={result} 
              className="w-full h-full object-cover" 
              controls 
              autoPlay 
              loop
            />
          ) : loading ? (
            <div className="text-center p-8">
              <div className="mb-6 relative">
                <div className="w-24 h-24 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600">
                  <i className="fas fa-film text-2xl"></i>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Crafting your video</h3>
              <p className="text-gray-500 max-w-xs mx-auto">Veo generates complex frames in real-time. This usually takes 20-40 seconds.</p>
            </div>
          ) : (
            <div className="text-center text-gray-400 p-8">
              <i className="fas fa-play-circle text-6xl mb-4 opacity-20"></i>
              <p>Your cinematic masterpiece will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoGenerator;
