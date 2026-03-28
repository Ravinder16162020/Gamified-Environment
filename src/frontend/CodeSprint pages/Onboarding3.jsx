import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Undo2, X } from 'lucide-react';
import styles from './Onboarding3.module.css';

const levels = [
  { 
    id: 1, 
    title: 'Complete beginner', 
    description: "I've never coded before",
    barHeights: ['h-2', 'h-4', 'h-6'],
    barColors: ['bg-[#2087B3]/40', 'bg-gray-600', 'bg-gray-600']
  },
  { 
    id: 2, 
    title: 'Some experience', 
    description: 'I know basics but forgot some things',
    barHeights: ['h-2', 'h-4', 'h-6'],
    barColors: ['bg-[#2087B3]', 'bg-[#2087B3]/40', 'bg-gray-600']
  },
  { 
    id: 3, 
    title: 'Confident coder', 
    description: 'I code regularly and feel comfortable',
    barHeights: ['h-2', 'h-4', 'h-6'],
    barColors: ['bg-[#2087B3]', 'bg-[#2087B3]', 'bg-[#2087B3]/40']
  },
  { 
    id: 4, 
    title: 'Expert at coding', 
    description: "I'm highly experienced",
    barHeights: ['h-2', 'h-4', 'h-6'],
    barColors: ['bg-[#2087B3]', 'bg-[#2087B3]', 'bg-[#2087B3]']
  }
];

const Onboarding3 = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const language = 'Python'; // Could come from state/localStorage

  const handleContinue = () => {
    if (selectedLevel) {
      navigate('/onboarding4');
    }
  };

  return (
    <div className="bg-[#1a1b1e] text-white font-sans antialiased min-h-screen flex flex-col">
      {/* TopBar */}
      <header className="fixed top-0 left-0 right-0 h-12 bg-[#1a1b1e] flex items-center px-4 z-50 gap-4">
        <button 
          onClick={() => navigate('/onboarding2')}
          className="p-2 hover:bg-white/10 rounded-full text-gray-400 transition-colors"
        >
          <Undo2 className="w-5 h-5" />
        </button>
        <div className="flex-1 h-2.5 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-[#2087B3] w-[60%] rounded-full transition-all duration-500"></div>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="p-2 hover:bg-white/10 rounded-full text-gray-400 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </header>

      {/* ContentArea */}
      <main className="flex-1 mt-12 mb-20 flex flex-col items-center px-6 pt-8 max-w-2xl mx-auto w-full">
        {/* MascotSection */}
        <div className="flex items-center gap-6 w-full mb-10">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-[#0E4A66] rounded-2xl flex items-center justify-center animate-bounce flex-shrink-0 shadow-lg shadow-black/20">
            <span className="text-3xl md:text-4xl">🤖</span>
          </div>
          <div className="relative bg-[#2d2e2f] border border-[#424548] p-4 rounded-2xl rounded-tl-none flex-1">
            <h1 className="text-base md:text-lg font-medium leading-tight">
              What is your level of <span>{language}</span> experience?
            </h1>
            <div className="mt-2 inline-flex items-center gap-2 bg-[#1e1f21] px-3 py-1 rounded-full border border-[#424548] text-xs text-gray-300">
              <span className="text-[#2087B3] font-bold text-[10px] uppercase tracking-wider">Py</span>
              <span>Learning <span>{language}</span></span>
            </div>
          </div>
        </div>

        {/* LevelSelector */}
        <div className="w-full max-w-md flex flex-col gap-4">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`group border rounded-xl px-6 py-5 flex items-center gap-5 cursor-pointer transition-all duration-200 ${
                selectedLevel === level.id
                  ? 'border-[#2087B3] bg-[#0E4A66] border-2 scale-[1.01]'
                  : 'bg-[#2d2e2f] border-[#424548] hover:border-[#2087B3]/40'
              }`}
            >
              <div className="flex items-end gap-1 w-8 h-8">
                {level.barHeights.map((height, index) => (
                  <div
                    key={index}
                    className={`w-2 ${height} rounded-sm transition-colors ${
                      selectedLevel === level.id
                        ? index < 2 ? 'bg-white' : 'bg-white/40'
                        : level.barColors[index]
                    }`}
                  ></div>
                ))}
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">{level.title}</h3>
                <p className={`text-sm transition-colors ${
                  selectedLevel === level.id ? 'text-blue-100' : 'text-gray-400'
                }`}>
                  {level.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* BottomBar */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-[#1a1b1e]/80 backdrop-blur-md border-t border-[#424548] flex justify-center z-50">
        <button
          onClick={handleContinue}
          disabled={!selectedLevel}
          className={`w-full max-w-md py-4 rounded-xl font-bold tracking-wide uppercase transition-all duration-300 ${
            selectedLevel
              ? 'bg-[#2087B3] text-white shadow-lg shadow-[#2087B3]/20 active:scale-95'
              : 'bg-[#2d2e2f] text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </footer>
    </div>
  );
};

export default Onboarding3;
