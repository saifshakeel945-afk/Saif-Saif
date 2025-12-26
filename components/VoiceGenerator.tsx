
import React, { useState, useRef } from 'react';
import { GeminiService } from '../services/geminiService';
import { decode, decodeAudioData } from '../services/audioHelper';

interface VoiceGeneratorProps {
  onBack: () => void;
}

const VOICES = [
  { name: 'Kore', gender: 'Female', mood: 'Calm' },
  { name: 'Puck', gender: 'Male', mood: 'Energetic' },
  { name: 'Zephyr', gender: 'Neutral', mood: 'Professional' },
  { name: 'Charon', gender: 'Male', mood: 'Deep' },
  { name: 'Fenrir', gender: 'Male', mood: 'Gritty' }
];

const VoiceGenerator: React.FC<VoiceGeneratorProps> = ({ onBack }) => {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('Kore');
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateAndPlay = async () => {
    if (!text) return;

    try {
      setLoading(true);
      setError(null);
      const base64Audio = await GeminiService.generateVoice(text, selectedVoice);
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      
      const ctx = audioContextRef.current;
      const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
      
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      
      source.onended = () => setIsPlaying(false);
      
      setIsPlaying(true);
      source.start();
    } catch (err) {
      setError('Voice generation failed. Please check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button 
        onClick={onBack}
        className="mb-8 text-emerald-600 flex items-center gap-2 hover:underline"
      >
        <i className="fas fa-arrow-left"></i> Back to Suite
      </button>

      <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Voice Lab</h1>
          <p className="text-gray-500 mb-8">High-fidelity text-to-speech with natural intonation.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Script</label>
              <textarea
                className="w-full h-48 p-6 bg-gray-50 border border-gray-100 rounded-3xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none text-lg text-gray-800"
                placeholder="Type the message you want to convert to voice..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Select Voice</label>
              <div className="space-y-2">
                {VOICES.map(voice => (
                  <button
                    key={voice.name}
                    onClick={() => setSelectedVoice(voice.name)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center justify-between ${
                      selectedVoice === voice.name 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                        : 'border-transparent bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{voice.name}</div>
                      <div className="text-[10px] uppercase opacity-60">{voice.mood} • {voice.gender}</div>
                    </div>
                    {selectedVoice === voice.name && <i className="fas fa-check-circle"></i>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={handleGenerateAndPlay}
              disabled={loading || !text || isPlaying}
              className="flex-1 py-5 bg-emerald-600 text-white font-bold rounded-2xl shadow-xl hover:bg-emerald-500 disabled:opacity-50 transition-all flex items-center justify-center gap-3 text-xl"
            >
              {loading ? (
                <i className="fas fa-circle-notch animate-spin"></i>
              ) : isPlaying ? (
                <i className="fas fa-volume-up animate-pulse"></i>
              ) : (
                <i className="fas fa-play"></i>
              )}
              {loading ? 'Synthesizing...' : isPlaying ? 'Speaking...' : 'Generate & Play'}
            </button>
          </div>
          
          {error && <p className="mt-4 text-red-500 text-center text-sm">{error}</p>}
        </div>
        
        <div className="bg-emerald-600 h-2 w-full">
           <div className={`h-full bg-white/40 transition-all duration-[2000ms] ${loading ? 'w-3/4' : 'w-0'}`}></div>
        </div>
      </div>
      
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <i className="fas fa-microphone-alt"></i>
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Natural Inflection</h4>
            <p className="text-sm text-gray-500 italic">Advanced neural synthesis for human-like pauses and emotion.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <i className="fas fa-bolt"></i>
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Ultra-Low Latency</h4>
            <p className="text-sm text-gray-500 italic">Optimized for rapid generation even with long-form scripts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceGenerator;
