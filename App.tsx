
import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import VideoGenerator from './components/VideoGenerator';
import ImageGenerator from './components/ImageGenerator';
import VoiceGenerator from './components/VoiceGenerator';
import { AppView } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');

  // Handle back button / hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as AppView;
      if (hash && ['landing', 'video', 'image', 'voice'].includes(hash)) {
        setView(hash);
      } else {
        setView('landing');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (newView: AppView) => {
    window.location.hash = newView;
  };

  const renderView = () => {
    switch (view) {
      case 'video': return <VideoGenerator onBack={() => navigate('landing')} />;
      case 'image': return <ImageGenerator onBack={() => navigate('landing')} />;
      case 'voice': return <VoiceGenerator onBack={() => navigate('landing')} />;
      default: return <Landing onSelectView={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => navigate('landing')}
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
              <span className="text-xl font-bold tracking-tight text-gray-900">TweakAI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigate('video')} className={`text-sm font-medium ${view === 'video' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}>Video</button>
              <button onClick={() => navigate('image')} className={`text-sm font-medium ${view === 'image' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}>Image</button>
              <button onClick={() => navigate('voice')} className={`text-sm font-medium ${view === 'voice' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}>Voice</button>
            </div>
            
            <div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:bg-indigo-500 transition-all">
                Pro Access
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {renderView()}
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
              <span className="text-xl font-bold text-white">TweakAI</span>
            </div>
            <p className="max-w-xs mb-6">Empowering creators with the world's most advanced AI models for video, image, and voice production.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigate('video')} className="hover:text-white">Video Generator</button></li>
              <li><button onClick={() => navigate('image')} className="hover:text-white">Image Suite</button></li>
              <li><button onClick={() => navigate('voice')} className="hover:text-white">Voice Lab</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="hover:text-white">Billing Docs</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-gray-800 text-center text-xs">
          © 2025 TweakAI. Built with Gemini 3 Pro.
        </div>
      </footer>
    </div>
  );
};

export default App;
