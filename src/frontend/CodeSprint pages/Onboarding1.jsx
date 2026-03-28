import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Undo2, X } from 'lucide-react';
import styles from './Onboarding1.module.css';

const Onboarding1 = () => {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState(null);

  const handleSelect = (lang) => {
    setSelectedLang(lang);
  };

  const handleContinue = () => {
    if (selectedLang) {
      navigate('/onboarding2');
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-[#1a1b1e] text-white font-sans">
      {/* TopBar */}
      <header className="fixed top-0 left-0 right-0 h-12 flex items-center px-4 z-50 bg-[#1a1b1e]">
        <button 
          onClick={handleBack}
          aria-label="Go back" 
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <Undo2 className="w-5 h-5 text-gray-400" />
        </button>
        <div className="flex-1 mx-4 h-2 bg-[#424548] rounded-full overflow-hidden">
          <div className="h-full bg-[#2087B3] w-[20%] transition-all duration-500 ease-out"></div>
        </div>
        <button 
          onClick={() => navigate('/login')}
          aria-label="Close" 
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </header>

      {/* MainContent */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 mt-12 mb-16 max-w-2xl mx-auto w-full">
        {/* Mascot and Message */}
        <section className="flex items-start space-x-4 mb-12 w-full max-w-md">
          <div className="w-16 h-16 bg-[#0E4A66] rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 animate-bounce">
            🤖
          </div>
          <div className={`${styles.speechBubble} relative bg-[#2d2e2f] border border-[#424548] rounded-2xl p-4 flex-1 text-lg font-medium`}>
            What do you wish to learn?
          </div>
        </section>

        {/* Language Selection Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* Java Card */}
          <button 
            onClick={() => handleSelect('java')}
            className={`group relative flex items-center p-4 bg-[#2d2e2f] border rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-left ${
              selectedLang === 'java' 
                ? 'border-[#E85A18] bg-[#3d1a00]' 
                : 'border-[#424548]'
            }`}
          >
            <div className="w-12 h-12 bg-[#E85A18] rounded-xl flex items-center justify-center font-bold text-white text-xl mr-4">
              Ja
            </div>
            <div>
              <h3 className="font-bold text-lg">Java</h3>
              <p className="text-sm text-gray-400">185K Learners</p>
            </div>
          </button>

          {/* Python Card */}
          <button 
            onClick={() => handleSelect('python')}
            className={`group relative flex items-center p-4 bg-[#2d2e2f] border rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-left ${
              selectedLang === 'python' 
                ? 'border-[#FFD43B] bg-[#2d2800]' 
                : 'border-[#424548]'
            }`}
          >
            <div className="w-12 h-12 bg-[#3a3200] text-[#FFD43B] rounded-xl flex items-center justify-center font-bold text-xl mr-4">
              Py
            </div>
            <div>
              <h3 className="font-bold text-lg">Python</h3>
              <p className="text-sm text-gray-400">1.45M Learners</p>
            </div>
          </button>
        </section>
      </main>

      {/* BottomBar */}
      <footer className="fixed bottom-0 left-0 right-0 h-16 border-t border-[#424548] bg-[#1a1b1e] px-6 flex items-center justify-center z-50">
        <button 
          onClick={handleContinue}
          disabled={!selectedLang}
          className={`w-full max-w-md h-12 font-bold rounded-xl transition-all duration-300 ${
            selectedLang 
              ? 'bg-[#2087B3] text-white hover:opacity-90 active:scale-95' 
              : 'bg-[#424548] text-white/50 cursor-not-allowed'
          }`}
        >
          CONTINUE
        </button>
      </footer>
    </div>
  );
};

export default Onboarding1;
