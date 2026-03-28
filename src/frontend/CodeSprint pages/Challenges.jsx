import React, { useState, useEffect } from 'react';
import JourneySidebar from '../../components/Sidebar/JourneySidebar';
import styles from './Challenges.module.css';

// SVG Icons
const MapIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="1 6 1 22 8 18 16 22 21 18 21 2 14 6 6 2 1 6"/>
  </svg>
);

const SwordsIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.5 17.5 3 6V3h3l11.5 11.5"/>
    <path d="m13 19 6-6"/>
    <path d="m16 16 4 4"/>
    <path d="m19 21 2-2"/>
    <path d="M14.5 6.5 18 3h3v3l-3.5 3.5"/>
    <path d="M5 14l4 4"/>
    <path d="M3 21l6-6"/>
  </svg>
);

const FlagIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
    <line x1="4" y1="22" x2="4" y2="15"/>
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);

const CalendarDaysIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
    <line x1="16" x2="16" y1="2" y2="6"/>
    <line x1="8" x2="8" y1="2" y2="6"/>
    <line x1="3" x2="21" y1="10" y2="10"/>
  </svg>
);

const BotIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 8V4H8"/>
    <rect width="16" height="12" x="4" y="8" rx="2"/>
    <path d="M2 14h2"/>
    <path d="M20 14h2"/>
    <path d="M15 13v2"/>
    <path d="M9 13v2"/>
  </svg>
);

const LogOutIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" x2="9" y1="12" y2="12"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const PlayCircleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="10 8 16 12 10 16 10 8"/>
  </svg>
);

const LockIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
);

const PlayIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const MaximizeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 3H5a2 2 0 0 0-2 2v3"/>
    <path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
    <path d="M3 16v3a2 2 0 0 0 2 2h3"/>
    <path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
  </svg>
);

const Loader2Icon = () => (
  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);

const PartyPopperIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5.8 11.3 2 22l10.7-3.79"/>
    <path d="M4 3h.01"/>
    <path d="M22 8h.01"/>
    <path d="M15 2h.01"/>
    <path d="M22 20h.01"/>
    <path d="m22 2-2.24.75a2.4 2.4 0 0 1-1.52 0L14 2l-2.24.75a2.4 2.4 0 0 1-1.52 0L8 2l-2.24.75a2.4 2.4 0 0 1-1.52 0L2 2"/>
    <path d="M17 12h.01"/>
    <path d="M9 12h.01"/>
    <path d="M5 8h.01"/>
  </svg>
);

const Challenges = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('expert');
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [allTestsPassed, setAllTestsPassed] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 22, seconds: 9 });

  const codeTasks = {
    novice: {
      title: 'Base Logic',
      desc: 'Validate input strings for IPv6 formats and common protocol headers.',
      file: 'ipv6_validator.ts',
      accent: '#4EA24E',
      xp: '+30',
      code: `
<div class="flex gap-2">
    <span class="text-[#c678dd]">export function</span>
    <span class="text-[#61afef]">isValidIPv6</span>(
        <span class="text-[#d19a66]">ip</span>: <span class="text-[#e5c07b]">string</span>
    ): <span class="text-[#e5c07b]">boolean</span> {
</div>
<div class="pl-4 mt-1 text-[#899299] italic">// Task: Use regex to validate IPv6 address structure</div>
<div class="pl-4 flex gap-2">
    <span class="text-[#c678dd]">const</span>
    <span class="text-[#abb2bf]">pattern = </span>
    <span class="text-[#98c379]">/([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}/</span>;
</div>
<div class="pl-4 py-0.5 bg-[#4EA24E]/5 border-l-2 border-[#4EA24E] flex gap-2">
    <span class="text-[#c678dd]">return</span>
    <span class="text-[#abb2bf]">pattern.</span><span class="text-[#61afef]">test</span>(<span class="text-[#abb2bf]">ip</span>);
</div>
<div class="text-[#abb2bf]">}</div>`
    },
    expert: {
      title: 'Eco-Optimizer Expert',
      desc: 'Optimize a carbon-footprint calculation algorithm for distributed data centers. Minimize memory overhead while maintaining precision.',
      file: 'eco_optimizer.ts',
      accent: '#E85A18',
      xp: '+60',
      code: `
<div class="flex gap-2">
    <span class="text-[#c678dd]">import</span>
    <span class="text-[#abb2bf]">{ calculateEmissions }</span>
    <span class="text-[#c678dd]">from</span>
    <span class="text-[#98c379]">"@sprint/core"</span>;
</div>
<div class="mt-2 text-[#899299] italic">// Task: Implement the weight-aware reducer</div>
<div class="flex gap-2">
    <span class="text-[#c678dd]">export function</span>
    <span class="text-[#61afef]">optimizePayload</span>(
        <span class="text-[#d19a66]">data</span>: <span class="text-[#e5c07b]">Node[]</span>
    ): <span class="text-[#e5c07b]">Result</span> {
</div>
<div class="pl-4 flex gap-2">
    <span class="text-[#c678dd]">const</span>
    <span class="text-[#abb2bf]">threshold = </span>
    <span class="text-[#d19a66]">0.75</span>;
</div>
<div class="pl-4 py-0.5 bg-[#E85A18]/5 border-l-2 border-[#E85A18] flex gap-2">
    <span class="text-[#c678dd]">return</span>
    <span class="text-[#abb2bf]">data.</span><span class="text-[#61afef]">filter</span>(<span class="text-[#abb2bf]">node => node.val > threshold</span>)
</div>
<div class="pl-8 flex gap-2">
    <span class="text-[#abb2bf]">.</span><span class="text-[#61afef]">reduce</span>(<span class="text-[#abb2bf]">(acc, curr) => acc + curr, </span><span class="text-[#d19a66]">0</span>);
</div>
<div class="text-[#abb2bf]">}</div>`
    },
    master: {
      title: 'Ghost Packets',
      desc: 'Solve the traveling salesman for 10k nodes with O(n log n) heuristic.',
      file: 'tsp_ghost.ts',
      accent: '#ffb3b0',
      xp: '+100',
      code: `
<div class="flex gap-2">
    <span class="text-[#c678dd]">export function</span>
    <span class="text-[#61afef]">solveGhostTSP</span>(
        <span class="text-[#d19a66]">nodes</span>: <span class="text-[#e5c07b]">Point[]</span>
    ): <span class="text-[#e5c07b]">Route</span> {
</div>
<div class="pl-4 mt-1 text-[#899299] italic">// Task: Use Nearest Neighbor with 2-opt swap</div>
<div class="pl-4 flex gap-2">
    <span class="text-[#c678dd]">let</span>
    <span class="text-[#abb2bf]">route = </span>
    <span class="text-[#c678dd]">new</span>
    <span class="text-[#e5c07b]">HeuristicSolver</span>().<span class="text-[#61afef]">init</span>();
</div>
<div class="pl-4 py-0.5 bg-[#ffb3b0]/5 border-l-2 border-[#ffb3b0] flex gap-2">
    <span class="text-[#c678dd]">while</span>
    <span class="text-[#abb2bf]">(nodes.length > </span><span class="text-[#d19a66]">0</span><span class="text-[#abb2bf]">) {</span>
</div>
<div class="pl-8 flex gap-2">
    <span class="text-[#abb2bf]">route.</span><span class="text-[#61afef]">add</span>(<span class="text-[#abb2bf]">nodes.</span><span class="text-[#61afef]">popNearest</span>());
</div>
<div class="pl-4 text-[#abb2bf]">}</div>
<div class="text-[#abb2bf]">}</div>`
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const runTests = () => {
    setIsRunning(true);
    setConsoleOpen(true);
    setAllTestsPassed(false);
    
    const tests = [
      { id: 1, name: 'Null Input Handling' },
      { id: 2, name: 'Payload Integrity' },
      { id: 3, name: 'Efficiency Target > 90%' },
      { id: 4, name: 'Memory Bounds Check' }
    ];

    setTestResults([]);
    let completed = 0;

    tests.forEach((test, i) => {
      setTimeout(() => {
        setTestResults(prev => [...prev, test]);
        completed++;
        if (completed === tests.length) {
          setIsRunning(false);
          setAllTestsPassed(true);
        }
      }, (i + 1) * 600);
    });
  };

  const currentTask = codeTasks[selectedDifficulty];

  const difficultyConfig = {
    novice: { label: 'Novice', color: '#4EA24E', bgClass: 'bg-[#4EA24E]', textClass: 'text-[#4EA24E]', borderClass: 'border-[#4EA24E]' },
    expert: { label: 'Expert', color: '#E85A18', bgClass: 'bg-[#E85A18]', textClass: 'text-[#E85A18]', borderClass: 'border-[#E85A18]' },
    master: { label: 'Master', color: '#ffb3b0', bgClass: 'bg-[#ffb3b0]', textClass: 'text-[#ffb3b0]', borderClass: 'border-[#ffb3b0]' }
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-[#0D0E11] text-[#e3e2e6]">
      <JourneySidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-10 ml-16">
        <div className="max-w-[1400px] mx-auto space-y-8">
          {/* TopAppBar */}
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-[10px] font-black tracking-[0.3em] text-[#bec8cf] uppercase mb-1 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-[#3f484e]/30"></span> Current Mission
              </h2>
              <h1 className="text-4xl font-black tracking-tighter text-[#e3e2e6]">Daily Sprint</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 bg-[#1a1b1e] px-5 py-2.5 rounded-full border border-[#3f484e]/10">
                <div className="w-2 h-2 rounded-full bg-[#E85A18] animate-pulse"></div>
                <span className="text-xs font-black tracking-tighter uppercase">1,250 XP EARNED</span>
              </div>
            </div>
          </header>

          {/* CHALLENGE HERO BANNER */}
          <section className="relative overflow-hidden rounded-2xl border border-[#E85A18]/20 bg-gradient-to-br from-[#1a1b1e] via-[#2d1a0e] to-[#121316] p-8 lg:p-12">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-[#E85A18]/10 rounded-full blur-[120px]"></div>
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85A18]/20 border border-[#E85A18]/30">
                  <span className="text-sm text-[#E85A18]">⚡</span>
                  <span className="text-[10px] font-black uppercase text-[#E85A18] tracking-widest">Active Challenge</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl font-black tracking-tighter text-[#e3e2e6]">{currentTask.title}</h2>
                  <p className="text-[#bec8cf] text-lg max-w-2xl leading-relaxed">{currentTask.desc}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-[#bec8cf] bg-[#343538]/50 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-[#3f484e]/10">
                    <span>⏱</span>
                    <span>Resets in {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
                  </div>
                  <div className="text-xs text-[#E85A18] font-black uppercase tracking-widest animate-bounce">+150 Bonus Streak XP</div>
                </div>
              </div>

              {/* Streak Card */}
              <div className="flex flex-col items-center justify-center p-8 bg-[#292a2d]/40 backdrop-blur-xl rounded-3xl border border-[#3f484e]/10 text-center min-w-[220px]">
                <div className="relative">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle className="text-[#1f1f23]" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                    <circle className="text-[#E85A18]" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="50" strokeWidth="8"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-[#e3e2e6] tracking-tighter">08</span>
                  </div>
                </div>
                <span className="mt-4 text-[10px] font-black text-[#bec8cf] uppercase tracking-[0.2em]">Day Streak</span>
                <div className="mt-4 flex gap-1.5">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < 7 ? 'bg-[#E85A18]' : 'bg-[#E85A18]/20'}`}></div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* DIFFICULTY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['novice', 'expert', 'master'].map((diff) => {
              const config = difficultyConfig[diff];
              const isActive = selectedDifficulty === diff;
              const task = codeTasks[diff];
              
              return (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`group flex flex-col p-6 bg-[#1a1b1e] rounded-2xl border transition-all text-left relative overflow-hidden ${
                    isActive 
                      ? `border-2 ${config.borderClass} shadow-[0_0_15px_${config.color}26]` 
                      : 'border-[#3f484e]/10 hover:border-[#4EA24E]/40 hover:bg-[#292a2d]'
                  }`}
                >
                  {diff === 'expert' && (
                    <div className="absolute top-0 right-0 bg-[#E85A18] text-white px-4 py-1.5 rounded-bl-xl text-[10px] font-black uppercase tracking-tighter">Recommended</div>
                  )}
                  <div className="flex justify-between items-start mb-12">
                    <span className={`text-[10px] font-black tracking-[0.2em] uppercase ${config.textClass}`}>{config.label}</span>
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-[#E85A18]/10' : 'bg-[#343538]'}`}>
                      {diff === 'novice' && <CheckCircleIcon />}
                      {diff === 'expert' && <PlayCircleIcon />}
                      {diff === 'master' && <LockIcon />}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-[#e3e2e6]">{task.title}</h3>
                  <p className="text-xs text-[#bec8cf] mb-6 line-clamp-2">{task.desc}</p>
                  <div className={`mt-auto flex items-center gap-2 font-black ${config.textClass}`}>
                    <span className="text-2xl tracking-tighter">{task.xp}</span>
                    <span className="text-[10px] uppercase tracking-widest">XP{diff === 'master' && ' 🔥'}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* CHALLENGE EDITOR AREA */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#bec8cf]">Active Workspace</h3>
                <div className="h-px w-12 bg-[#3f484e]/20"></div>
              </div>
              <div className="flex gap-2">
                <div className="px-4 py-1.5 bg-[#1a1b1e] rounded-lg text-[10px] font-black border border-[#3f484e]/10 text-[#bec8cf]">TypeScript</div>
                <div className="px-4 py-1.5 bg-[#1a1b1e] rounded-lg text-[10px] font-black border border-[#3f484e]/10 text-[#bec8cf]">VIM Mode: Off</div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-[#3f484e]/10 shadow-2xl">
              {/* Editor Header */}
              <div className="bg-[#1a1b1e] px-6 py-4 flex items-center justify-between border-b border-[#3f484e]/10">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ffb4ab]/40"></div>
                    <div className="w-3 h-3 rounded-full bg-[#E85A18]/40"></div>
                    <div className="w-3 h-3 rounded-full bg-[#4EA24E]/40"></div>
                  </div>
                  <span className="text-xs font-mono text-[#bec8cf] ml-4 font-medium tracking-tight">{currentTask.file}</span>
                </div>
                <div className="flex gap-5">
                  <button className="text-[#bec8cf] hover:text-[#e3e2e6] transition-colors">
                    <SettingsIcon />
                  </button>
                  <button className="text-[#bec8cf] hover:text-[#e3e2e6] transition-colors">
                    <MaximizeIcon />
                  </button>
                </div>
              </div>

              {/* Main Editor Area */}
              <div className="flex bg-[#0d0e11] min-h-[450px]">
                {/* Line Numbers */}
                <div className="w-14 bg-[#1a1b1e]/30 border-r border-[#3f484e]/5 flex flex-col items-center pt-6 text-[10px] font-mono text-[#899299]/50 leading-7 select-none">
                  {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(num => (
                    <span key={num} className={num === 4 ? 'text-[#E85A18] bg-[#E85A18]/5 w-full text-center border-l-2 border-[#E85A18]' : ''}>{num}</span>
                  ))}
                </div>
                {/* Code Canvas */}
                <div 
                  className="flex-1 p-6 font-mono text-sm leading-7 overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: currentTask.code }}
                />
                {/* Console Side Panel */}
                <div 
                  className={`overflow-hidden bg-[#0a0a0b] border-l border-[#3f484e]/10 transition-all duration-300 ${consoleOpen ? 'w-[350px]' : 'w-0'}`}
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#bec8cf]">Test Output</span>
                      <button 
                        onClick={() => setConsoleOpen(false)}
                        className="text-[#bec8cf] hover:text-[#e3e2e6]"
                      >
                        <XIcon />
                      </button>
                    </div>
                    <div className="space-y-4 font-mono text-xs">
                      {isRunning ? (
                        <div className="text-[#bec8cf] flex items-center gap-2">
                          <Loader2Icon />
                          Initializing test runner...
                        </div>
                      ) : (
                        testResults.map((test, idx) => (
                          <div key={idx} className="flex items-center justify-between py-2 border-b border-[#3f484e]/5 text-[#e3e2e6]">
                            <div className="flex items-center gap-2">
                              <span className="text-[#4EA24E]">✓</span>
                              <span>Test #{test.id}: {test.name}</span>
                            </div>
                            <span className="text-[#4EA24E] font-bold">PASS</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Editor Footer */}
              <div className="bg-[#1a1b1e] px-6 py-4 flex items-center justify-between border-t border-[#3f484e]/10">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-[#E85A18] animate-pulse' : allTestsPassed ? 'bg-[#4EA24E]' : 'bg-[#4EA24E]'}`}></div>
                    <span className="text-[10px] font-black text-[#bec8cf] uppercase tracking-widest">
                      {isRunning ? 'RUNNING TESTS...' : allTestsPassed ? 'ALL TESTS PASSED' : 'Environment Ready'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-[#bec8cf] uppercase tracking-widest">34ms Latency</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={runTests}
                    disabled={isRunning}
                    className="px-6 py-2.5 rounded-xl border border-[#3f484e]/20 text-[10px] font-black uppercase tracking-widest hover:bg-[#343538] transition-all flex items-center gap-2 text-[#e3e2e6]"
                  >
                    {isRunning ? <Loader2Icon /> : <PlayIcon />}
                    {isRunning ? 'Testing...' : 'Run Tests'}
                  </button>
                  <button 
                    onClick={() => setShowSuccessModal(true)}
                    disabled={!allTestsPassed}
                    className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg transition-all ${
                      allTestsPassed 
                        ? 'bg-[#E85A18] text-white shadow-[#E85A18]/10 hover:scale-[1.02] active:scale-[0.98]' 
                        : 'bg-[#E85A18]/30 text-white/50 cursor-not-allowed'
                    }`}
                  >
                    Submit Solution
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* PAST CHALLENGES TABLE */}
          <section className="space-y-6 pt-6 pb-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#bec8cf]">Last 7 Sprints</h3>
                <div className="h-px w-12 bg-[#3f484e]/20"></div>
              </div>
              <a className="text-[10px] font-black uppercase tracking-[0.2em] text-[#E85A18] hover:underline" href="#">View History</a>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#3f484e]/10 bg-[#1a1b1e]/40">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#3f484e]/10 bg-[#1a1b1e]/60">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#899299]/70">Date</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#899299]/70">Challenge Name</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#899299]/70">Difficulty</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#899299]/70">Score</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-[#899299]/70 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3f484e]/5">
                  <tr className="hover:bg-[#1a1b1e]/80 transition-colors group">
                    <td className="px-8 py-5 text-sm font-medium text-[#bec8cf]">Oct 24</td>
                    <td className="px-8 py-5 text-sm font-bold text-[#e3e2e6]">Bitmask Multiplexer</td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 rounded-lg text-[10px] font-black bg-[#ffb3b0]/10 text-[#ffb3b0] uppercase tracking-widest">Hard</span>
                    </td>
                    <td className="px-8 py-5 text-sm font-mono text-[#bec8cf]">100/100</td>
                    <td className="px-8 py-5 text-right text-[#4EA24E]">✓</td>
                  </tr>
                  <tr className="hover:bg-[#1a1b1e]/80 transition-colors group">
                    <td className="px-8 py-5 text-sm font-medium text-[#bec8cf]">Oct 23</td>
                    <td className="px-8 py-5 text-sm font-bold text-[#e3e2e6]">Refactor Legacy Loop</td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 rounded-lg text-[10px] font-black bg-[#4EA24E]/10 text-[#4EA24E] uppercase tracking-widest">Easy</span>
                    </td>
                    <td className="px-8 py-5 text-sm font-mono text-[#bec8cf]">30/30</td>
                    <td className="px-8 py-5 text-right text-[#4EA24E]">✓</td>
                  </tr>
                  <tr className="hover:bg-[#1a1b1e]/80 transition-colors group opacity-60">
                    <td className="px-8 py-5 text-sm font-medium text-[#bec8cf]">Oct 22</td>
                    <td className="px-8 py-5 text-sm font-bold text-[#e3e2e6]">Neural Net Pruning</td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 rounded-lg text-[10px] font-black bg-[#ffb3b0]/10 text-[#ffb3b0] uppercase tracking-widest">Hard</span>
                    </td>
                    <td className="px-8 py-5 text-sm font-mono text-[#bec8cf]">--/100</td>
                    <td className="px-8 py-5 text-right text-[#899299]">✗</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#0D0E11]/90 backdrop-blur-md"></div>
          <div className="relative w-full max-w-lg bg-[#1a1b1e] border border-[#3f484e]/20 rounded-[2.5rem] p-10 text-center shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#E85A18] via-[#4EA24E] to-[#ffb3b0]"></div>
            <div className="absolute inset-0 opacity-50" style={{background: 'radial-gradient(circle at center, rgba(78, 162, 78, 0.15) 0%, transparent 70%)'}}></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-[#4EA24E]/20 rounded-full flex items-center justify-center mb-8 animate-bounce">
                <PartyPopperIcon className="text-[#4EA24E]" />
              </div>
              <h2 className="text-4xl font-black tracking-tighter text-[#e3e2e6] mb-3 uppercase">Challenge Complete</h2>
              <p className="text-[#bec8cf] text-lg mb-8 max-w-sm mx-auto">
                Incredible performance, Alex! Your solution passed all test cases with 98% efficiency.
              </p>
              <div className="grid grid-cols-2 gap-4 w-full mb-10">
                <div className="p-4 rounded-2xl bg-[#343538]/50 border border-[#3f484e]/10">
                  <div className="text-[10px] font-black text-[#bec8cf] uppercase tracking-widest mb-1">XP Earned</div>
                  <div className="text-2xl font-black text-[#E85A18]">+210 XP</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#343538]/50 border border-[#3f484e]/10">
                  <div className="text-[10px] font-black text-[#bec8cf] uppercase tracking-widest mb-1">Rank Boost</div>
                  <div className="text-2xl font-black text-[#4EA24E]">↑ #12</div>
                </div>
              </div>
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-4 rounded-2xl bg-[#4EA24E] text-white font-black uppercase tracking-[0.2em] shadow-lg shadow-[#4EA24E]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Continue Journey
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Challenges;
