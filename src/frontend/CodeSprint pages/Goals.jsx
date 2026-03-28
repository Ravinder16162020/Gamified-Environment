import React, { useState, useEffect } from 'react';
import JourneySidebar from '../../components/Sidebar/JourneySidebar';
import styles from './Goals.module.css';

// SVG Icons
const TrackChangesIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.48 12.35c-1.57-4.08-7.16-4.29-11.6-.25 0 0-1.02.99-1.69 2.09-.5.81-.84 1.63-.84 2.31 0 1.73 1.4 3.13 3.13 3.13.88 0 1.68-.37 2.26-.97.44-.46 1.26-1.39 1.26-1.39 3.16-3.35 5.52-1.97 6.11-1.09.14.21.28.43.41.65.42.72 1.16 1.18 2.02 1.18 1.37 0 2.48-1.19 2.32-2.59-.11-.88-.57-1.66-1.24-2.19-.44-.34-.91-.61-1.41-.82.41-.39.74-.85.97-1.37.32-.73.41-1.54.23-2.35-.26-1.19-1.15-2.13-2.33-2.39-.8-.17-1.6-.07-2.28.24-.35.15-.68.35-.97.6-.2.17-.39.36-.55.57-.39.5-.66 1.09-.77 1.73-.08.44-.08.88.01 1.31z"/>
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const CardGiftcardIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
  </svg>
);

const CodeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
  </svg>
);

const BarChartIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>
  </svg>
);

const BoltIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/>
  </svg>
);

const VerifiedIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 15l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z"/>
  </svg>
);

const FireIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
  </svg>
);

const SnowflakeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

// Generate heatmap data
const generateHeatmapData = () => {
  const weeks = [];
  for (let w = 0; w < 20; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const xp = Math.random() > 0.3 ? Math.floor(Math.random() * 120) : 0;
      let intensity = 0;
      if (xp > 0 && xp < 30) intensity = 1;
      else if (xp >= 30 && xp < 60) intensity = 2;
      else if (xp >= 60 && xp < 100) intensity = 3;
      else if (xp >= 100) intensity = 4;
      days.push({ xp, intensity });
    }
    weeks.push(days);
  }
  return weeks;
};

const Goals = () => {
  const [showChestModal, setShowChestModal] = useState(false);
  const [showFreezeModal, setShowFreezeModal] = useState(false);
  const [heatmapData] = useState(generateHeatmapData());
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Update timer
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);
      
      const diff = tomorrow - now;
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      
      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);

    // Set current date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString('en-US', options));

    return () => clearInterval(timerInterval);
  }, []);

  const getIntensityClass = (intensity) => {
    switch (intensity) {
      case 0: return 'bg-[#1a1b1e]';
      case 1: return 'bg-[#7bd0ff]/20';
      case 2: return 'bg-[#7bd0ff]/40';
      case 3: return 'bg-[#7bd0ff]/70';
      case 4: return 'bg-[#7bd0ff]';
      default: return 'bg-[#1a1b1e]';
    }
  };

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const weekData = [
    { day: 'M', completed: true },
    { day: 'T', completed: true },
    { day: 'W', completed: false, active: true },
    { day: 'T', completed: false },
    { day: 'F', completed: false },
    { day: 'S', completed: false },
    { day: 'S', completed: false },
  ];

  return (
    <div className="bg-[#121316] text-[#e3e2e6] font-sans h-screen flex overflow-hidden">
      <JourneySidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#1a1b1e] flex flex-col ml-16">
        {/* Header */}
        <header className="bg-[#252627] border-b border-[#424548] px-8 py-5 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="text-[#7bd0ff] text-3xl">🏆</span>
            <div>
              <h1 className="text-white font-bold text-2xl tracking-tight">Goals</h1>
              <p className="text-[#bec8cf]/50 text-xs mt-0.5 font-medium tracking-wide uppercase">Track your daily architectural milestones</p>
            </div>
          </div>
          <div className="bg-[#1a1b1e] border border-[#424548] rounded-xl px-4 py-2 flex items-center gap-3">
            <CalendarIcon />
            <span className="text-[#e3e2e6] text-sm font-medium">{currentDate}</span>
          </div>
        </header>

        <div className="w-full px-8 py-8 space-y-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Streak Hero Card */}
            <section className="bg-gradient-to-r from-[#3d1a00] to-[#2d1000] border border-[#E85A18]/30 rounded-2xl p-6 relative overflow-hidden group">
              <div className="bg-[#E85A18]/10 w-48 h-48 rounded-full absolute -right-12 -top-12 blur-3xl group-hover:bg-[#E85A18]/20 transition-all"></div>
              <div className="flex justify-between items-start relative z-10">
                <div className="flex gap-6 items-center">
                  <div className="animate-pulse text-6xl select-none">🔥</div>
                  <div>
                    <span className="text-[#bec8cf]/60 text-[10px] font-bold tracking-[0.2em] uppercase">Current Streak</span>
                    <h2 className="text-5xl font-black text-white leading-tight">14 days</h2>
                    <div className="flex items-center gap-1.5 text-[#E85A18] font-bold text-xs mt-1">
                      <span>🏆</span>
                      <span>21 day personal best</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center gap-2 bg-[#E85A18]/20 border border-[#E85A18]/40 rounded-xl px-4 py-2 text-[#E85A18] font-black text-xs">
                    <FireIcon />
                    ACTIVE
                  </div>
                  <button 
                    onClick={() => setShowFreezeModal(true)}
                    className="bg-[#1a1b1e] border border-[#424548] hover:border-[#7bd0ff]/50 rounded-xl px-4 py-2 flex items-center gap-2 text-[#7bd0ff] transition-all"
                  >
                    <span className="animate-spin">❄️</span>
                    <span className="text-xs font-bold">Freeze Streak</span>
                  </button>
                  <span className="text-[#bec8cf]/40 text-[10px] uppercase font-black tracking-widest">
                    Resets in {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* 7-Day Dots */}
              <div className="mt-8 pt-6 border-t border-[#E85A18]/20 flex items-center justify-between relative z-10">
                <span className="text-[#E85A18]/80 text-[10px] font-black uppercase tracking-widest">Weekly Consistency</span>
                <div className="flex gap-4">
                  {weekData.map((day, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1.5">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                        day.completed 
                          ? 'bg-[#3d1a00] border border-[#E85A18]/50 text-[#E85A18]' 
                          : day.active 
                            ? 'bg-[#E85A18] shadow-[0_0_15px_rgba(232,90,24,0.4)] text-white relative'
                            : 'bg-[#1a1b1e] border border-[#424548]'
                      }`}>
                        {day.completed && <span className="text-xl font-bold">✓</span>}
                        {day.active && (
                          <>
                            <span className="text-xl font-black">⚡</span>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping opacity-20"></div>
                          </>
                        )}
                      </div>
                      <span className={`text-[9px] font-bold ${
                        day.completed ? 'text-[#E85A18]/60' : day.active ? 'text-[#E85A18] font-black' : 'text-[#bec8cf]/30'
                      }`}>
                        {day.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Daily Goals */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <TrackChangesIcon />
                <h3 className="text-white font-bold text-xl">Today's Protocol</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Goal 1: Active */}
                <div className="bg-[#252627] border border-[#424548] rounded-2xl p-5 flex flex-col justify-between group hover:border-[#7bd0ff]/40 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#00a56e]/20 flex items-center justify-center text-[#00a56e]">
                      <StarIcon />
                    </div>
                    <div className="w-10 h-10 bg-[#2d2e2f] rounded-xl flex items-center justify-center text-[#bec8cf]/30">
                      <CardGiftcardIcon />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 leading-snug">2 Perfect Completions</h4>
                    <div className="flex justify-between items-end text-[10px] mb-2 uppercase font-black tracking-widest">
                      <span className="text-[#7bd0ff]">0 Solved</span>
                      <span className="text-[#bec8cf]/30">Target: 2</span>
                    </div>
                    <div className="w-full h-2 bg-[#1a1b1e] rounded-full overflow-hidden">
                      <div className="h-full bg-[#7bd0ff]" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Goal 2: Completed */}
                <div className="bg-gradient-to-br from-[#003d1a]/20 to-[#252627] border border-[#00a56e]/40 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#00a56e] flex items-center justify-center text-white">
                      <BoltIcon />
                    </div>
                    <button 
                      onClick={() => setShowChestModal(true)}
                      className="w-10 h-10 bg-[#2d2800] rounded-xl flex items-center justify-center text-[#FFB800] shadow-[0_0_15px_rgba(255,184,0,0.3)] animate-bounce"
                    >
                      <CardGiftcardIcon />
                    </button>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 leading-snug">Earn 500 XP</h4>
                    <div className="flex justify-between items-end text-[10px] mb-2 uppercase font-black tracking-widest">
                      <span className="text-[#00a56e]">500 Earned</span>
                      <span className="text-[#bec8cf]/30">Target: 500</span>
                    </div>
                    <div className="w-full h-2 bg-[#1a1b1e] rounded-full overflow-hidden">
                      <div className="h-full bg-[#00a56e]" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Goal 3: Partial */}
                <div className="bg-[#252627] border border-[#424548] rounded-2xl p-5 flex flex-col justify-between group hover:border-[#7bd0ff]/40 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#E85A18]/20 flex items-center justify-center text-[#E85A18]">
                      <CodeIcon />
                    </div>
                    <div className="w-10 h-10 bg-[#2d2e2f] rounded-xl flex items-center justify-center text-[#bec8cf]/30">
                      <CardGiftcardIcon />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 leading-snug">Complete 4 Exercises</h4>
                    <div className="flex justify-between items-end text-[10px] mb-2 uppercase font-black tracking-widest">
                      <span className="text-[#7bd0ff]">2 Done</span>
                      <span className="text-[#bec8cf]/30">Target: 4</span>
                    </div>
                    <div className="w-full h-2 bg-[#1a1b1e] rounded-full overflow-hidden">
                      <div className="h-full bg-[#7bd0ff]" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Activity Heatmap */}
            <section className="bg-[#252627] border border-[#424548] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <CalendarIcon />
                  <h3 className="text-white font-bold text-lg">Activity Calendar</h3>
                </div>
                <div className="bg-[#3d1a00] text-[#E85A18] text-[10px] font-black uppercase tracking-widest rounded-full px-4 py-2 flex items-center gap-2 border border-[#E85A18]/20">
                  <FireIcon />
                  14 day streak
                </div>
              </div>
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-1 min-w-full">
                  {heatmapData.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1">
                      {week.map((day, dIdx) => (
                        <div 
                          key={dIdx}
                          className={`w-3 h-3 rounded-sm ${getIntensityClass(day.intensity)} cursor-help transition-all hover:scale-125 hover:z-10 ${styles.heatmapCell} relative group`}
                          title={`${day.xp} XP earned`}
                        >
                          <div className={`hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#252627] border border-[#424548] text-white text-[9px] rounded whitespace-nowrap z-20 pointer-events-none`}>
                            {day.xp} XP earned
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-[#424548] flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-[#bec8cf]/40 text-[9px] font-black uppercase mb-1">Current</p>
                    <p className="text-[#E85A18] font-black text-sm">14 days 🔥</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#bec8cf]/40 text-[9px] font-black uppercase mb-1">Longest</p>
                    <p className="text-white font-black text-sm">21 days</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#bec8cf]/40 text-[9px] font-black uppercase mb-1">Active</p>
                    <p className="text-white font-black text-sm">18 days (Oct)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-[#bec8cf]/40 uppercase">Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-[#1a1b1e]"></div>
                    <div className="w-3 h-3 rounded-sm bg-[#7bd0ff]/20"></div>
                    <div className="w-3 h-3 rounded-sm bg-[#7bd0ff]/40"></div>
                    <div className="w-3 h-3 rounded-sm bg-[#7bd0ff]/70"></div>
                    <div className="w-3 h-3 rounded-sm bg-[#7bd0ff]"></div>
                  </div>
                  <span className="text-[9px] font-bold text-[#bec8cf]/40 uppercase">More</span>
                </div>
              </div>
            </section>

            {/* Weekly Summary */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <BarChartIcon />
                <h3 className="text-white font-bold text-xl">Weekly Summary</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Stats Grid (2x2) */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-[#252627] border border-[#424548] rounded-2xl p-6 flex flex-col justify-center">
                    <p className="text-[#bec8cf]/40 text-[10px] font-black uppercase tracking-[0.2em] mb-3">XP Earned</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-[#7bd0ff]">1,240</span>
                      <BoltIcon />
                    </div>
                  </div>
                  <div className="bg-[#252627] border border-[#424548] rounded-2xl p-6 flex flex-col justify-center">
                    <p className="text-[#bec8cf]/40 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Exercises</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-white">12</span>
                      <CodeIcon />
                    </div>
                  </div>
                  <div className="bg-[#252627] border border-[#424548] rounded-2xl p-6 flex flex-col justify-center">
                    <p className="text-[#bec8cf]/40 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Perfect Runs</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-white">4</span>
                      <VerifiedIcon />
                    </div>
                  </div>
                  <div className="bg-[#252627] border border-[#424548] rounded-2xl p-6 flex flex-col justify-center">
                    <p className="text-[#bec8cf]/40 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Avg. Streak</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-[#E85A18]">7</span>
                      <FireIcon />
                    </div>
                  </div>
                </div>

                {/* Right: XP Performance Chart */}
                <div className="bg-[#252627] border border-[#424548] rounded-2xl p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-10">
                    <h4 className="text-[#bec8cf]/60 text-[10px] font-black uppercase tracking-[0.2em]">XP Performance</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#7bd0ff]"></div>
                      <span className="text-[#bec8cf]/40 text-[9px] font-black uppercase tracking-widest">Target Met</span>
                    </div>
                  </div>
                  <div className="flex-1 flex items-end justify-between gap-3 px-2 min-h-[160px]">
                    {[
                      { day: 'M', height: '40%', active: false },
                      { day: 'T', height: '65%', active: false },
                      { day: 'W', height: '80%', active: false },
                      { day: 'T', height: '55%', active: false },
                      { day: 'F', height: '100%', active: true },
                      { day: 'S', height: '5%', active: false },
                      { day: 'S', height: '5%', active: false },
                    ].map((bar, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-3 group h-full">
                        <div className="w-full flex items-end justify-center h-full">
                          <div 
                            className={`w-full rounded-t-sm transition-all ${
                              bar.active 
                                ? 'bg-[#7bd0ff] shadow-[0_0_15px_rgba(123,208,255,0.4)]' 
                                : 'bg-[#343538] group-hover:bg-[#7bd0ff]/50'
                            }`}
                            style={{ height: bar.height }}
                          ></div>
                        </div>
                        <span className={`text-[10px] font-bold ${bar.active ? 'text-[#7bd0ff] font-black' : 'text-[#bec8cf]/40'}`}>
                          {bar.day}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Chest Reward Modal */}
      {showChestModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-[#252627] border border-[#424548] rounded-[2rem] p-10 max-w-sm w-full text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#7bd0ff]/10 to-transparent pointer-events-none"></div>
            <div className="animate-bounce text-8xl mb-6 relative">
              🎁
              <div className="absolute inset-0 flex items-center justify-center opacity-40 blur-xl bg-[#7bd0ff]/30 rounded-full scale-150 -z-10"></div>
            </div>
            <h3 className="font-black text-white text-3xl mb-2">Protocol Mastered! 🎉</h3>
            <p className="text-[#bec8cf]/60 text-sm mb-8">Earned 500 XP goal completion</p>
            <div className="text-5xl font-black text-[#7bd0ff] mb-8 tracking-tighter">+500 XP</div>
            <button 
              onClick={() => setShowChestModal(false)}
              className="bg-[#7bd0ff] hover:bg-[#3c9ac7] text-[#121316] font-black py-5 rounded-2xl w-full transition-all shadow-lg shadow-[#7bd0ff]/20 uppercase tracking-widest text-sm"
            >
              Acknowledge Reward
            </button>
          </div>
        </div>
      )}

      {/* Streak Freeze Modal */}
      {showFreezeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-[#252627] border border-[#424548] rounded-[2rem] p-10 max-w-sm w-full text-center">
            <div className="animate-spin text-7xl mb-6 inline-block">❄️</div>
            <h3 className="font-black text-white text-2xl mb-4 leading-tight">Engage Cryo-Shield?</h3>
            <p className="text-[#bec8cf]/60 text-sm mb-6 leading-relaxed">
              A streak freeze protects your 14-day record if you fail to complete goals tomorrow.
            </p>
            <div className="bg-[#1a1b1e] border border-[#424548] rounded-2xl px-5 py-4 flex justify-between items-center mb-8">
              <span className="text-xs font-bold text-[#bec8cf] uppercase tracking-widest">Available:</span>
              <span className="text-[#7bd0ff] font-black">1 FREE CHARGE</span>
            </div>
            <div className="space-y-3">
              <button className="bg-[#0E4A66] border border-[#7bd0ff]/40 text-[#7bd0ff] hover:bg-[#7bd0ff] hover:text-[#121316] font-black py-4 w-full rounded-2xl transition-all uppercase tracking-widest text-xs">
                Activate Freeze ❄️
              </button>
              <button 
                onClick={() => setShowFreezeModal(false)}
                className="bg-[#2d2e2f] border border-[#424548] text-[#bec8cf]/60 hover:text-white py-3.5 w-full rounded-2xl font-bold text-xs uppercase transition-all tracking-widest"
              >
                Abort Protocol
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;
