import React from 'react';
import { useNavigate } from 'react-router-dom';
import JourneySidebar from '../../components/Sidebar/JourneySidebar';
import styles from './Journey.module.css';

// Material Symbols icons as SVG components
const CheckIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const PlayArrowIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const LockIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
);

const EmojiEventsIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
  </svg>
);

const EventRepeatIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.45.83.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const LightbulbIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/>
  </svg>
);

const Journey = () => {
  const navigate = useNavigate();

  const handleNumbersIconClick = () => {
    navigate('/codeeditor');
  };

  const handleNumbersTextClick = () => {
    navigate('/quiztheory');
  };

  return (
    <div className="bg-[#121316] text-[#e3e2e6] overflow-hidden h-screen flex">
      <JourneySidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* TopNavBar */}
        <header className="absolute top-0 right-0 left-0 z-30 flex items-center justify-between px-6 ml-16 h-16 bg-[#121316]/70 backdrop-blur-xl border-b-2 border-[#7bd0ff]">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-label uppercase tracking-widest text-[#bec8cf]">Journey / Section 1</span>
              <h1 className="text-[#7bd0ff] font-headline font-bold text-sm tracking-tight">Introduction: Basic Syntax</h1>
            </div>
          </div>

          {/* Stats Rail */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <span className="text-orange-400 text-xl">🔥</span>
              <span className="text-[#7BD0FF] font-bold font-headline">12</span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <span className="text-[#7bd0ff] text-xl">💎</span>
              <span className="text-[#e3e2e6] font-medium opacity-70">1,240</span>
            </div>
            <div className="flex items-center bg-[#292a2d] rounded-full pl-3 pr-1 py-1 gap-3 relative overflow-hidden group">
              <div className={`absolute inset-0 ${styles.shimmer} opacity-20 pointer-events-none`}></div>
              <span className="text-[#7bd0ff] text-xl z-10">🏆</span>
              <div className="w-24 h-2 bg-[#1f1f23] rounded-full overflow-hidden z-10">
                <div className="bg-[#7bd0ff] h-full w-2/3"></div>
              </div>
              <span className="text-xs font-bold text-[#7bd0ff] z-10">640 XP</span>
            </div>
            <img
              alt="User Profile"
              className="w-8 h-8 rounded-full border border-[#7bd0ff]/40 ml-4"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoR3n9_vHFGbfymC9dm6Xo-9MJjVywMlfrLoFSDjCC1v_-SdVczZ9s5IKR1LL62l6cCOVMsiZgUzjDriYVlRhYmgw9zqBKnEDgPOElhEhTU8WwCDvBNigmi7fH3LlDPDGXlLMKANiCByHilV2nYqb-Jjq5EzgR-_fGQmQNYUCfVvsCEMmRHHcTQFdvGSl3u3fC-9GCAUoIgWGE-BxzYKZHZ50S8jWkKo6GIeVvht26aj5wFd_lASzKiTF6ykkrGUgCtdI2TIsM0A"
            />
          </div>
        </header>

        {/* Main Workspace */}
        <main className="flex-1 flex pt-16 h-full overflow-hidden">
          {/* Continuous Hexagon Node Map */}
          <div className={`flex-1 overflow-y-auto ${styles.customScrollbar} bg-[#121316] relative`}>
            {/* Background Decorative Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-5 overflow-hidden">
              <div className="absolute top-10 left-10 w-64 h-64 border border-[#3f484e] rounded-full mix-blend-screen blur-3xl"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#7bd0ff]/20 rounded-full mix-blend-screen blur-3xl"></div>
            </div>

            <div className="max-w-2xl mx-auto py-12 px-8 flex flex-col items-center gap-16 relative">
              <div className="absolute top-24 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#7bd0ff]/40 via-[#7bd0ff]/20 to-[#3f484e]/10"></div>

              {/* SECTION: Introduction */}
              <div className="w-full flex flex-col items-center gap-12 z-10">
                <div className="flex flex-col items-center text-center">
                  <span className="px-4 py-1 bg-[#00a56e]/20 text-[#57dea0] text-[10px] font-bold rounded-full mb-2 border border-[#57dea0]/30">SECTION 1</span>
                  <h2 className="text-3xl font-black text-[#e3e2e6] uppercase tracking-tighter">Introduction</h2>
                </div>

                <div className="flex flex-col gap-10 items-center w-full">
                  {/* Hello World Node */}
                  <div className="relative flex flex-col items-center -translate-x-16 group">
                    <div className={`w-20 h-20 bg-[#7bd0ff]/10 ${styles.hexOutline} border border-[#7bd0ff]/40 flex items-center justify-center ${styles.hexagon}`}>
                      <div className={`w-16 h-16 bg-[#7bd0ff] ${styles.hexagon} flex items-center justify-center text-[#003549] shadow-[0_0_15px_rgba(123,208,255,0.4)]`}>
                        <CheckIcon />
                      </div>
                    </div>
                    <div className="absolute -right-32 top-1/2 -translate-y-1/2 text-left opacity-80 group-hover:opacity-100 transition-opacity">
                      <h4 className="font-bold text-sm">Hello World</h4>
                      <div className="flex gap-1 mt-1">
                        <div className="w-1 h-1 rounded-full bg-[#2087B3]"></div>
                        <div className="w-1 h-1 rounded-full bg-[#2087B3]"></div>
                        <div className="w-1 h-1 rounded-full bg-[#2087B3]"></div>
                      </div>
                    </div>
                  </div>

                  {/* First Program Node */}
                  <div className="relative flex flex-col items-center translate-x-16 group">
                    <div className={`w-20 h-20 bg-[#7bd0ff]/10 ${styles.hexOutline} border border-[#7bd0ff]/40 flex items-center justify-center ${styles.hexagon}`}>
                      <div className={`w-16 h-16 bg-[#7bd0ff] ${styles.hexagon} flex items-center justify-center text-[#003549]`}>
                        <CheckIcon />
                      </div>
                    </div>
                    <div className="absolute -left-36 top-1/2 -translate-y-1/2 text-right opacity-80 group-hover:opacity-100 transition-opacity">
                      <h4 className="font-bold text-sm">First Program</h4>
                      <div className="flex gap-1 justify-end mt-1">
                        <div className="w-1 h-1 rounded-full bg-[#2087B3]"></div>
                        <div className="w-1 h-1 rounded-full bg-[#2087B3]"></div>
                        <div className="w-1 h-1 rounded-full bg-[#2087B3]"></div>
                      </div>
                    </div>
                  </div>

                  {/* How Code Works Node */}
                  <div className="relative flex flex-col items-center group">
                    <div className={`w-20 h-20 bg-[#7bd0ff]/10 ${styles.hexOutline} border border-[#7bd0ff]/40 flex items-center justify-center ${styles.hexagon}`}>
                      <div className={`w-16 h-16 bg-[#7bd0ff] ${styles.hexagon} flex items-center justify-center text-[#003549]`}>
                        <CheckIcon />
                      </div>
                    </div>
                    <div className="absolute -right-36 top-1/2 -translate-y-1/2 text-left opacity-80 group-hover:opacity-100 transition-opacity">
                      <h4 className="font-bold text-sm">How Code Works</h4>
                      <div className="flex gap-1 mt-1">
                        <div className="w-1 h-1 rounded-full bg-[#2087B3]"></div>
                        <div className="w-1 h-1 rounded-full bg-[#2087B3]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Running Code Node */}
                  <div className="relative flex flex-col items-center translate-x-12 group">
                    <div className={`w-20 h-20 bg-[#7bd0ff]/10 ${styles.hexOutline} border border-[#7bd0ff]/40 flex items-center justify-center ${styles.hexagon}`}>
                      <div className={`w-16 h-16 bg-[#7bd0ff] ${styles.hexagon} flex items-center justify-center text-[#003549]`}>
                        <CheckIcon />
                      </div>
                    </div>
                    <div className="absolute -left-32 top-1/2 -translate-y-1/2 text-right opacity-80 group-hover:opacity-100 transition-opacity">
                      <h4 className="font-bold text-sm">Running Code</h4>
                      <div className="flex gap-1 justify-end mt-1">
                        <div className="w-1 h-1 rounded-full bg-[#2087B3]"></div>
                        <div className="w-1 h-1 rounded-full bg-[#2087B3]"></div>
                        <div className="w-1 h-1 rounded-full bg-[#2087B3]"></div>
                      </div>
                    </div>
                  </div>

                  {/* Trophy Node */}
                  <div className="relative flex flex-col items-center mt-4">
                    <div className={`w-24 h-24 bg-yellow-500/10 ${styles.hexOutline} border border-yellow-500/50 flex items-center justify-center ${styles.hexagon}`}>
                      <div className={`w-20 h-20 bg-yellow-500 ${styles.hexagon} flex items-center justify-center text-[#003549] shadow-[0_0_20px_rgba(234,179,8,0.3)]`}>
                        <EmojiEventsIcon />
                      </div>
                    </div>
                    <span className="mt-2 text-yellow-500 font-black text-xs uppercase">Introduction Mastery</span>
                  </div>
                </div>
              </div>

              <div className="h-12"></div>

              {/* SECTION: Variables */}
              <div className="w-full flex flex-col items-center gap-12 z-10">
                <div className="flex flex-col items-center text-center">
                  <span className="px-4 py-1 bg-[#7bd0ff]/10 text-[#7bd0ff] text-[10px] font-bold rounded-full mb-2 border border-[#7bd0ff]/30">SECTION 2</span>
                  <h2 className="text-3xl font-black text-[#e3e2e6] uppercase tracking-tighter">Variables</h2>
                </div>

                <div className="flex flex-col gap-10 items-center w-full">
                  {/* Bonus Star Node */}
                  <div className="relative flex flex-col items-center translate-x-20 opacity-50">
                    <div className={`w-16 h-16 bg-[#343538] ${styles.hexOutline} border border-[#899299] flex items-center justify-center ${styles.hexagon}`}>
                      <div className={`w-12 h-12 bg-[#1f1f23] ${styles.hexagon} flex items-center justify-center text-[#899299]`}>
                        <StarIcon />
                      </div>
                    </div>
                    <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-right">
                      <h4 className="font-bold text-xs text-[#3f484e]">Bonus</h4>
                    </div>
                  </div>

                  {/* Numbers - Active Node */}
                  <div className="relative flex flex-col items-center -translate-x-12 group scale-110">
                    <div 
                      onClick={handleNumbersIconClick}
                      className={`w-20 h-20 bg-[#7bd0ff]/20 ${styles.hexOutline} flex items-center justify-center ${styles.hexagon} relative cursor-pointer`}
                    >
                      <div className="absolute inset-0 rounded-full border-2 border-[#7bd0ff] border-dashed animate-[spin_10s_linear_infinite]"></div>
                      <div className={`w-16 h-16 bg-[#7bd0ff] ${styles.hexagon} flex items-center justify-center text-[#003549] shadow-[0_0_30px_rgba(123,208,255,0.6)] group-hover:scale-105 transition-transform`}>
                        <PlayArrowIcon />
                      </div>
                    </div>
                    <div 
                      onClick={handleNumbersTextClick}
                      className="absolute -right-32 top-1/2 -translate-y-1/2 text-left cursor-pointer"
                    >
                      <h4 className="font-black text-[#7bd0ff] text-base">Numbers</h4>
                      <span className="text-[10px] font-bold text-[#7bd0ff]/70 uppercase">Continue Here</span>
                    </div>
                  </div>

                  {/* Strings - Locked */}
                  <div className="relative flex flex-col items-center translate-x-12 opacity-40">
                    <div className={`w-20 h-20 bg-[#1f1f23] ${styles.hexOutline} border border-[#3f484e] flex items-center justify-center ${styles.hexagon}`}>
                      <div className={`w-16 h-16 bg-[#1a1b1e] ${styles.hexagon} flex items-center justify-center text-[#899299]`}>
                        <LockIcon />
                      </div>
                    </div>
                    <div className="absolute -left-28 top-1/2 -translate-y-1/2 text-right">
                      <h4 className="font-bold text-sm">Strings</h4>
                    </div>
                  </div>

                  {/* Booleans - Locked */}
                  <div className="relative flex flex-col items-center -translate-x-4 opacity-40">
                    <div className={`w-20 h-20 bg-[#1f1f23] ${styles.hexOutline} border border-[#3f484e] flex items-center justify-center ${styles.hexagon}`}>
                      <div className={`w-16 h-16 bg-[#1a1b1e] ${styles.hexagon} flex items-center justify-center text-[#899299]`}>
                        <LockIcon />
                      </div>
                    </div>
                    <div className="absolute -right-28 top-1/2 -translate-y-1/2 text-left">
                      <h4 className="font-bold text-sm">Booleans</h4>
                    </div>
                  </div>

                  {/* Type Casting - Locked */}
                  <div className="relative flex flex-col items-center translate-x-16 opacity-40">
                    <div className={`w-20 h-20 bg-[#1f1f23] ${styles.hexOutline} border border-[#3f484e] flex items-center justify-center ${styles.hexagon}`}>
                      <div className={`w-16 h-16 bg-[#1a1b1e] ${styles.hexagon} flex items-center justify-center text-[#899299]`}>
                        <LockIcon />
                      </div>
                    </div>
                    <div className="absolute -left-32 top-1/2 -translate-y-1/2 text-right">
                      <h4 className="font-bold text-sm">Type Casting</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-12"></div>

              {/* SECTION: Operators Part 1 */}
              <div className="w-full flex flex-col items-center gap-6 z-10 opacity-60">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-headline font-black text-[#e3e2e6] uppercase tracking-tighter">Operators Part 1</h2>
                  <button className="px-3 py-1 bg-[#1f1f23] text-[#7bd0ff] text-xs font-bold rounded border border-[#7bd0ff]/40 hover:bg-[#7bd0ff]/10 transition-colors">
                    JUMP HERE
                  </button>
                </div>
                <p className="text-xs text-[#bec8cf] uppercase tracking-widest">Content locked until Section 2 completion</p>
              </div>

              <div className="h-32"></div>
            </div>
          </div>

          {/* Right Panel */}
          <aside className={`w-72 bg-[#1a1b1e] h-full border-l border-[#3f484e]/10 overflow-y-auto ${styles.customScrollbar} p-6 flex flex-col gap-8 shrink-0 hidden lg:flex`}>
            {/* Rookie League Card */}
            <div className="bg-[#1f1f23] rounded-xl p-5 border border-[#3f484e]/20 relative overflow-hidden group">
              <div className={`absolute -right-4 -top-4 w-24 h-24 bg-[#403d88]/20 ${styles.hexagon} blur-xl transition-all group-hover:scale-125`}></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-[#403d88] text-[#c3c0ff] flex items-center justify-center rounded-lg">
                    <ShieldIcon />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#c3c0ff]">League #240</span>
                </div>
                <h3 className="font-bold text-[#e3e2e6] text-lg leading-tight mb-1">Rookie League</h3>
                <p className="text-xs text-[#bec8cf] mb-6">Promoted in 2 days, 14 hours</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#bec8cf]">Your Rank</span>
                    <span className="font-bold text-[#7bd0ff]">#4</span>
                  </div>
                  <div className="w-full h-1 bg-[#343538] rounded-full overflow-hidden">
                    <div className="w-4/5 h-full bg-[#7bd0ff] hover:bg-[#2087B3] rounded-full transition-colors"></div>
                  </div>
                </div>
                <button className="w-full py-2 bg-[#343538] hover:bg-[#292a2d] transition-colors text-[#e3e2e6] text-xs font-bold rounded-lg border border-[#3f484e]/20">
                  View Standings
                </button>
              </div>
            </div>

            {/* Daily Goals */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-widest text-[#bec8cf]">Daily Goals</h3>
                <EventRepeatIcon />
              </div>
              <div className="space-y-5">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#e3e2e6] font-medium">Earn 50 XP</span>
                    <span className="text-[#bec8cf]">30/50</span>
                  </div>
                  <div className="w-full h-2 bg-[#1f1f23] rounded-full overflow-hidden">
                    <div className="w-[60%] h-full bg-[#7bd0ff] hover:bg-[#2087B3] rounded-full transition-colors"></div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#e3e2e6] font-medium">2 Lessons Today</span>
                    <span className="text-[#bec8cf]">1/2</span>
                  </div>
                  <div className="w-full h-2 bg-[#1f1f23] rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-[#7bd0ff] hover:bg-[#2087B3] rounded-full transition-colors"></div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#e3e2e6] font-medium">Solve 1 Bug Quest</span>
                    <span className="text-[#7bd0ff] font-bold flex items-center gap-1">
                      <CheckCircleIcon />
                      Done
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#1f1f23] rounded-full overflow-hidden">
                    <div className="w-full h-full bg-[#7bd0ff] hover:bg-[#2087B3] rounded-full transition-colors"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Tip */}
            <div className="mt-auto bg-gradient-to-br from-[#403d88]/30 to-[#3c9ac7]/30 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <LightbulbIcon />
                <span className="font-bold text-sm text-[#c3c0ff]">Pro Tip</span>
              </div>
              <p className="text-xs text-[#bec8cf] leading-relaxed">
                Use <code className="bg-[#1f1f23] px-1 rounded text-[#7bd0ff]">Shift + Space</code> to quickly run your current node script in the integrated IDE.
              </p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default Journey;
