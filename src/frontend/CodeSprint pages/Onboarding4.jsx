import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import styles from './Onboarding4.module.css';

const commitments = [
  { id: 1, time: '5 min per day', label: 'Easygoing' },
  { id: 2, time: '15 min per day', label: 'Standard' },
  { id: 3, time: '30 min per day', label: 'Committed' },
  { id: 4, time: '60 min per day', label: 'Immersive' }
];

const Onboarding4 = () => {
  const navigate = useNavigate();
  const [selectedCommitment, setSelectedCommitment] = useState(2);

  const handleContinue = () => {
    navigate('/onboarding5');
  };

  return (
    <div className="bg-[#1a1b1e] min-h-screen flex flex-col font-sans">
      {/* TopBar */}
      <header className="fixed top-0 left-0 right-0 h-12 bg-[#1a1b1e] flex items-center px-4 z-50">
        <button 
          onClick={() => navigate('/onboarding3')}
          className="flex-none cursor-pointer hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div className="flex-grow mx-8 bg-[#424548] h-2 rounded-full overflow-hidden">
          <div className="bg-[#2087B3] h-full w-[80%] rounded-full"></div>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="flex-none cursor-pointer hover:opacity-80 transition-opacity"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </header>

      {/* MainContent */}
      <main className="flex-grow pt-12 pb-16 flex flex-col items-center justify-center px-6">
        {/* MascotSection */}
        <div className="flex flex-col items-center mb-8 w-full max-w-md">
          <div className="relative flex flex-col items-center">
            <div className="w-16 h-16 bg-[#0E4A66] rounded-2xl flex items-center justify-center mb-4 text-3xl">
              🤖
            </div>
            <div className="bg-[#2d2e2f] border border-[#424548] px-4 py-2 rounded-xl relative">
              <p className="text-sm font-medium">How much are you ready to commit?</p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#2d2e2f] border-r border-b border-[#424548] rotate-45"></div>
            </div>
          </div>
          {/* Language Chip */}
          <div className="mt-6 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#424548] bg-white/5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C11.1716 2 10.5 2.67157 10.5 3.5V6H13.5V3.5C13.5 2.67157 12.8284 2 12 2Z" fill="#3776AB"/>
              <path d="M12 22C12.8284 22 13.5 21.3284 13.5 20.5V18H10.5V20.5C10.5 21.3284 11.1716 22 12 22Z" fill="#FFD43B"/>
              <path clipRule="evenodd" d="M12 6H5C3.34315 6 2 7.34315 2 9V12C2 13.6569 3.34315 15 5 15H7V13.5C7 10.7386 9.23858 8.5 12 8.5H17V9C17 10.6569 15.6569 12 14 12H12V14H15C17.7614 14 20 11.7614 20 9V7C20 5.34315 18.6569 4 17 4H12V6Z" fill="#3776AB" fillRule="evenodd"/>
              <path clipRule="evenodd" d="M12 18H19C20.6569 18 22 16.6569 22 15V12C22 10.3431 20.6569 9 19 9H17V10.5C17 13.2614 14.7614 15.5 12 15.5H7V15C7 13.3431 8.34315 12 10 12H12V10H9C6.23858 10 4 12.2386 4 15V17C4 18.6569 5.34315 20 7 20H12V18Z" fill="#FFD43B" fillRule="evenodd"/>
            </svg>
            <span className="text-xs text-white/50 font-medium">Learning Python</span>
          </div>
        </div>

        {/* CommitmentSelection */}
        <div className="w-full max-w-md space-y-3">
          {commitments.map((commitment) => (
            <button
              key={commitment.id}
              onClick={() => setSelectedCommitment(commitment.id)}
              className={`w-full flex justify-between items-center p-4 rounded-xl border transition-all text-left ${
                selectedCommitment === commitment.id
                  ? 'border-2 border-[#2087B3] bg-[#0E4A66]'
                  : 'border border-[#424548] bg-[#2d2e2f]/30 hover:bg-[#2d2e2f]/50'
              }`}
            >
              <span className="font-medium">{commitment.time}</span>
              <span className={`${
                selectedCommitment === commitment.id 
                  ? 'text-[#2087B3] font-bold' 
                  : 'text-white/50 group-hover:text-white/70'
              }`}>
                {commitment.label}
              </span>
            </button>
          ))}
          <p className="text-center text-xs text-white/50 pt-2">
            You can change this anytime in your settings.
          </p>
        </div>
      </main>

      {/* BottomBar */}
      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-[#1a1b1e] border-t border-[#424548] flex items-center justify-end px-6">
        <button 
          onClick={handleContinue}
          className="bg-[#2087B3] hover:bg-opacity-90 active:scale-95 transition-all text-white font-bold py-2.5 px-8 rounded-lg text-sm uppercase tracking-wide"
        >
          Continue
        </button>
      </footer>
    </div>
  );
};

export default Onboarding4;
