import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Undo2, X } from 'lucide-react';
import styles from './Onboarding2.module.css';

const reasons = [
  { id: 1, icon: '🔍', color: 'bg-[#1a2d3d]', label: 'Explore what is coding' },
  { id: 2, icon: '🧠', color: 'bg-[#2d1a3d]', label: 'Challenge my brain' },
  { id: 3, icon: '🏠', color: 'bg-[#2d1a00]', label: 'Boost my career' },
  { id: 4, icon: '🎮', color: 'bg-[#1a2d1a]', label: 'Just for fun' },
  { id: 5, icon: '🖥️', color: 'bg-[#1a1a3d]', label: 'Support my education' },
  { id: 6, icon: '💻', color: 'bg-[#0E4A66]', label: 'Build my own apps' }
];

const Onboarding2 = () => {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState(null);

  const handleContinue = () => {
    if (selectedReason) {
      navigate('/onboarding3');
    }
  };

  return (
    <div className="bg-[#1a1b1e] text-white font-sans antialiased min-h-screen flex flex-col">
      {/* TopBar */}
      <header className="fixed top-0 left-0 right-0 h-12 bg-[#1a1b1e] z-50 px-4 flex items-center gap-4">
        <button 
          onClick={() => navigate('/onboarding1')}
          className="p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          <Undo2 className="w-5 h-5 text-white/70" />
        </button>
        <div className="flex-1 h-2 bg-[#424548] rounded-full overflow-hidden">
          <div className="h-full bg-[#2087B3] rounded-full transition-all duration-500" style={{ width: '40%' }}></div>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-white/70" />
        </button>
      </header>

      {/* ContentArea */}
      <main className="flex-1 mt-12 mb-16 overflow-y-auto px-4 py-8 flex flex-col items-center">
        {/* MascotSection */}
        <section className="w-full max-w-2xl flex flex-col items-center mb-10">
          <div className="flex items-end gap-4 mb-4">
            <div className="w-16 h-16 bg-[#0E4A66] rounded-2xl flex items-center justify-center text-3xl animate-bounce shadow-xl">
              🤖
            </div>
            <div className="relative bg-[#2d2e2f] border border-[#424548] p-4 rounded-2xl rounded-bl-none max-w-xs shadow-lg">
              <p className="text-base font-medium">Why are you learning Python?</p>
            </div>
          </div>
          {/* Language Chip */}
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <div className="w-5 h-5 bg-yellow-500 rounded flex items-center justify-center text-[10px] font-bold text-[#1a1b1e]">Py</div>
            <span className="text-sm text-white/50 font-medium">Learning Python</span>
          </div>
        </section>

        {/* ReasonGrid */}
        <section className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-3">
          {reasons.map((reason) => (
            <button
              key={reason.id}
              onClick={() => setSelectedReason(reason.id)}
              className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 hover:border-[#2087B3]/40 ${
                selectedReason === reason.id
                  ? 'bg-[#0E4A66] border-[#2087B3] scale-[1.02]'
                  : 'bg-[#2d2e2f] border-[#424548]'
              }`}
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${reason.color} text-xl`}>
                {reason.icon}
              </div>
              <span className="font-medium text-white/90">{reason.label}</span>
            </button>
          ))}
        </section>
      </main>

      {/* BottomBar */}
      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-[#1a1b1e] border-t border-[#424548] px-6 flex items-center justify-end">
        <button
          onClick={handleContinue}
          disabled={!selectedReason}
          className={`px-8 py-2.5 rounded-lg font-bold text-sm tracking-wider uppercase transition-all duration-300 ${
            selectedReason
              ? 'bg-[#2087B3] text-white hover:shadow-lg hover:shadow-[#2087B3]/20'
              : 'bg-[#424548] text-white/30 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </footer>
    </div>
  );
};

export default Onboarding2;
