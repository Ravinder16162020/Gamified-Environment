import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import styles from './Onboarding5.module.css';

const features = [
  { icon: '🧠', label: 'Improve your brain' },
  { icon: '📚', label: 'Learn new things' },
  { icon: '⏰', label: 'Make learning stick' }
];

const summaryData = [
  { label: 'Language', value: 'Python' },
  { label: 'Goal', value: 'Career Swap' },
  { label: 'Level', value: 'Beginner' },
  { label: 'Daily Goal', value: '15 min/day' }
];

const Onboarding5 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/journey');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-[#1a1b1e] text-white">
      {/* TopBar */}
      <header className="w-full px-6 pt-6 pb-4 flex items-center justify-between gap-4">
        <button 
          onClick={() => navigate('/onboarding4')}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 h-2 bg-gray-800 rounded-full relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-full bg-[#2087B3] glow-progress rounded-full"></div>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </header>

      {/* ContentArea */}
      <main className="flex-1 px-6 py-8 flex flex-col items-center max-w-md mx-auto w-full">
        {/* Mascot Section */}
        <section className="flex items-start gap-4 mb-10 w-full">
          <div className="w-20 h-20 bg-[#0E4A66] rounded-2xl flex items-center justify-center text-4xl shrink-0 shadow-lg">
            🤖
          </div>
          <div className="relative bg-white text-[#1a1b1e] p-4 rounded-2xl rounded-tl-none mt-2 font-semibold">
            <p>Ready for an exciting journey?</p>
            <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full space-y-4 mb-10">
          <div
            className="bg-[#25262b] p-4 rounded-xl flex items-center gap-4 border border-gray-800"
            style={{ 
              animation: `slideInRight 0.5s ease-out forwards`,
              animationDelay: `0.2s`
            }}
          >
            <span className="text-2xl">🧠</span>
            <span className="font-medium">Improve your brain</span>
          </div>
          <div
            className="bg-[#25262b] p-4 rounded-xl flex items-center gap-4 border border-gray-800"
            style={{ 
              animation: `slideInRight 0.5s ease-out forwards`,
              animationDelay: `0.4s`
            }}
          >
            <span className="text-2xl">📚</span>
            <span className="font-medium">Learn new things</span>
          </div>
          <div
            className="bg-[#25262b] p-4 rounded-xl flex items-center gap-4 border border-gray-800"
            style={{ 
              animation: `slideInRight 0.5s ease-out forwards`,
              animationDelay: `0.6s`
            }}
          >
            <span className="text-2xl">⏰</span>
            <span className="font-medium">Make learning stick</span>
          </div>
        </section>

        {/* Summary Card Section */}
        <section className="w-full bg-[#25262b] rounded-2xl p-6 border border-gray-800 shadow-xl">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Your Profile Summary</h3>
          <div className="grid grid-cols-2 gap-y-4">
            {summaryData.map((item, index) => (
              <div key={index}>
                <p className="text-gray-500 text-xs">{item.label}</p>
                <p className="font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* BottomBar */}
      <footer className="p-6 bg-[#1a1b1e] border-t border-gray-800">
        <button
          onClick={handleContinue}
          disabled={isLoading}
          className="w-full max-w-md mx-auto block bg-[#2087B3] hover:bg-[#1b7399] text-white font-bold py-4 px-8 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <div className="loading-spinner"></div>
              <span>CONTINUE</span>
            </>
          ) : (
            <span>CONTINUE</span>
          )}
        </button>
      </footer>
    </div>
  );
};

export default Onboarding5;
