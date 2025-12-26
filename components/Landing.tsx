
import React from 'react';
import { AppView } from '../types';

interface LandingProps {
  onSelectView: (view: AppView) => void;
}

const Landing: React.FC<LandingProps> = ({ onSelectView }) => {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative bg-white pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-[1.1]">
              Unleash Your <span className="text-indigo-600">Creative</span> Potential with AI.
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Access industry-leading AI tools for high-fidelity video generation, stunning photorealistic images, and human-like voice synthesis.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => onSelectView('video')}
                className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:bg-indigo-500 transition-all transform hover:-translate-y-1 active:scale-95"
              >
                Try Video Generator
              </button>
              <button 
                onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-50 font-bold rounded-2xl hover:bg-indigo-50 transition-all"
              >
                Browse All Tools
              </button>
            </div>
          </div>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Creative Suite</h2>
          <p className="text-gray-600">Everything you need to build the next generation of content.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Video Tool */}
          <div 
            onClick={() => onSelectView('video')}
            className="group cursor-pointer bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <i className="fas fa-video text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Veo 3 Video Generator</h3>
            <p className="text-gray-600 mb-6">Transform complex text prompts into cinematic high-definition videos instantly.</p>
            <span className="text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
              Get Started <i className="fas fa-arrow-right text-sm"></i>
            </span>
          </div>

          {/* Image Tool */}
          <div 
            onClick={() => onSelectView('image')}
            className="group cursor-pointer bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-600 group-hover:text-white transition-colors">
              <i className="fas fa-image text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Image Studio</h3>
            <p className="text-gray-600 mb-6">Create photorealistic images and high-fidelity art with our Pro-tier Gemini models.</p>
            <span className="text-pink-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
              Open Studio <i className="fas fa-arrow-right text-sm"></i>
            </span>
          </div>

          {/* Voice Tool */}
          <div 
            onClick={() => onSelectView('voice')}
            className="group cursor-pointer bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <i className="fas fa-waveform text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Voice Lab</h3>
            <p className="text-gray-600 mb-6">Convert any text into expressive, realistic voices with multi-speaker support.</p>
            <span className="text-emerald-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
              Explore Lab <i className="fas fa-arrow-right text-sm"></i>
            </span>
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="py-20 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-10">Powered By the Latest Models</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-40">
             <span className="text-2xl font-black">GEMINI 3 PRO</span>
             <span className="text-2xl font-black">VEO 3.1</span>
             <span className="text-2xl font-black">NANO FLASH</span>
             <span className="text-2xl font-black">TTS NATIVE</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
