import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JourneySidebar from '../../components/Sidebar/JourneySidebar';
import AiPanelpopup from '../../CodeSprintpopups/AiPanelpopup';
import CodeEditorHint from '../../CodeSprintpopups/CodeEditorHint';
import styles from './CodeEditor.module.css';

// Material Symbols icons as SVG components
const CloseIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

const WaterDropIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.15 0-6-2.38-6-6.2 0-2.34 1.67-4.38 4-6.36 2.33 1.98 4 4.02 4 6.36 0 3.82-2.85 6.2-6 6.2z"/>
  </svg>
);

const DiamondIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4 10l8 12 8-12-8-8z"/>
  </svg>
);

const BoltIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/>
  </svg>
);

const DescriptionIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
  </svg>
);

const BookmarkIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
  </svg>
);

const HistoryIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const HelpIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
  </svg>
);

const ChatBubbleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
);

const LightbulbIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/>
  </svg>
);

const TerminalIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 18V6h16v12H4zM6 9h2v2H6zm0 4h2v2H6z"/>
  </svg>
);

const BoltIconSmall = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/>
  </svg>
);

const PlayArrowIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const SyncIcon = () => (
  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const ArrowForwardIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
  </svg>
);

const CodeEditor = () => {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState('theory');
  const [activeTerminalTab, setActiveTerminalTab] = useState('console');
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'info', text: 'Compiling Sprint...' },
    { type: 'success', text: '> Initialized environment.' }
  ]);
  const [code, setCode] = useState(`# Start your sprint here
gems_collected = 15
bonus_multiplier = 2.0
print(gems_collected * bonus_multiplier)`);

  const codeEditorRef = useRef(null);

  useEffect(() => {
    if (codeEditorRef.current) {
      codeEditorRef.current.focus();
    }
  }, []);

  const handleBackToJourney = () => {
    navigate('/journey');
  };

  const switchLeftPanel = (panelId) => {
    setActivePanel(panelId);
  };

  const switchTerminalTab = (tab) => {
    setActiveTerminalTab(tab);
  };

  const toggleAIPanel = () => {
    setIsAIPanelOpen(!isAIPanelOpen);
  };

  const simulateRun = () => {
    setIsRunning(true);
    setActiveTerminalTab('console');
    setTerminalOutput([{ type: 'info', text: 'Executing solution.py...' }]);

    setTimeout(() => {
      setTerminalOutput([
        { type: 'info', text: 'Executing solution.py...' },
        { type: 'success', text: '> 30.0' },
        { type: 'footer', text: '[Process finished with exit code 0]' }
      ]);
      setIsRunning(false);

      setTimeout(() => {
        setIsSuccessModalOpen(true);
      }, 800);
    }, 1200);
  };

  const leftPanelButtons = [
    { id: 'theory', icon: DescriptionIcon, title: 'Theory' },
    { id: 'bookmarks', icon: BookmarkIcon, title: 'Bookmarks' },
    { id: 'history', icon: HistoryIcon, title: 'Reset/History' },
    { id: 'search', icon: SearchIcon, title: 'Search' },
  ];

  const bottomButtons = [
    { id: 'hint', icon: HelpIcon, title: 'Get a Hint', action: () => setIsHintModalOpen(true) },
    { id: 'feedback', icon: ChatBubbleIcon, title: 'Send Feedback', action: () => setActivePanel('feedback') },
    { id: 'info', icon: InfoIcon, title: 'Info', action: () => setActivePanel('info') },
  ];

  return (
    <div className="bg-[#121316] text-[#e3e2e6] font-body h-screen flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="h-12 bg-[#292a2d] flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBackToJourney}
            className="text-[#bec8cf] hover:text-[#7bd0ff] transition-colors" 
            title="Exit to Journey"
          >
            <CloseIcon />
          </button>
          <div className="h-4 w-px bg-[#3f484e]/30"></div>
          <h1 className="font-headline font-bold text-sm tracking-tight flex items-center gap-2">
            <span className="text-[#bec8cf] font-medium uppercase">Chapter 1:</span>
            <span className="text-[#7bd0ff] uppercase">Numbers & Variables</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <WaterDropIcon />
              <span className="text-xs font-bold">12</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DiamondIcon />
              <span className="text-xs font-bold">840</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BoltIcon />
              <span className="text-xs font-bold">3,420</span>
            </div>
          </div>
          <div className="h-8 w-8 rounded-full border border-[#7bd0ff]/20 bg-[#343538] overflow-hidden cursor-pointer">
            <img 
              alt="User Profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsp6gGQT955vOi6y9J28_PmM1EpOM2UD6K4yCBLginbUotrISF0GYaQ-vU75wrP4b4sAI-fmKIFtxFZHF7tiD3d5A6jj9CCz7lpaOS2gni7cuATCO2vpdshWD2PLqLbIWIzE_9FO-RlcgV_jf0VpLYxtYskFGjNr-g3oZ0qNJckVEIgLbEp032DOXWQPatboRZvc5JkEtJAY0wTJpGdRftRFmUp0yqDKUAoN6M-cJMDzbY01beigu3LYJWFfgVhKC9NF8PSymzcw"
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <JourneySidebar />

        {/* Left Icon Strip */}
        <aside className="w-12 bg-[#1a1b1e] border-r border-[#3f484e]/15 flex flex-col items-center py-4 gap-4 z-40">
          {leftPanelButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => switchLeftPanel(btn.id)}
              className={`p-2 rounded transition-colors ${
                activePanel === btn.id 
                  ? 'bg-[#7bd0ff]/10 text-[#7bd0ff]' 
                  : 'text-[#bec8cf] hover:text-[#e3e2e6]'
              }`}
              title={btn.title}
            >
              <btn.icon />
            </button>
          ))}
          <div className="mt-auto flex flex-col gap-4">
            {bottomButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={btn.action}
                className="p-2 text-[#bec8cf] hover:text-[#e3e2e6] transition-colors"
                title={btn.title}
              >
                <btn.icon />
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex overflow-hidden">
          {/* Left Panel: Content Switcher */}
          <section className="w-[38%] bg-[#1a1b1e] overflow-y-auto custom-scrollbar flex flex-col border-r border-[#3f484e]/15">
            {/* Theory Panel */}
            {activePanel === 'theory' && (
              <div className="p-6 space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-[#57dea0] tracking-[0.2em] uppercase mb-2 block">Foundations</span>
                  <h2 className="font-headline text-2xl font-bold text-[#e3e2e6]">Mastering Numbers</h2>
                </div>
                <div className="text-[#bec8cf] text-sm leading-relaxed space-y-4">
                  <p>In Python, numbers are first-class citizens. Whether you're calculating the trajectory of a spacecraft or just counting gems, you'll use <span className="text-[#7bd0ff]">Integers</span> and <span className="text-[#7bd0ff]">Floats</span>.</p>
                  <div className="bg-[#0d0e11] p-4 rounded-lg border-l-4 border-[#7bd0ff]/40 font-mono text-xs">
                    <span className="text-[#c3c0ff]"># Variable Assignment</span><br/>
                    <span className="text-[#7bd0ff]">level</span> = <span className="text-[#57dea0]">42</span><br/>
                    <span className="text-[#7bd0ff]">xp_multiplier</span> = <span className="text-[#57dea0]">1.5</span>
                  </div>
                  <p>Variables are containers for storing data values. In Python, you don't need to declare types; the interpreter is smart enough to know that <code className="text-[#c3c0ff]">42</code> is an integer.</p>
                  <div className="bg-[#1f1f23] p-4 rounded-lg border border-[#3f484e]/10">
                    <h4 className="text-[#e3e2e6] font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                      <LightbulbIcon />
                      Pro Tip
                    </h4>
                    <p className="italic">Always use snake_case for variable names to keep your code readable and professional.</p>
                  </div>
                </div>
                <div className="mt-12 p-6 bg-[#292a2d] rounded-xl border border-[#7bd0ff]/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <span className="text-6xl">🎯</span>
                  </div>
                  <h3 className="font-headline text-lg font-bold text-[#e3e2e6] mb-4 flex items-center gap-2">
                    <span className="bg-[#7bd0ff] text-[#003549] text-xs h-5 w-5 flex items-center justify-center rounded-full">!</span>
                    The Challenge
                  </h3>
                  <ol className="space-y-4 text-sm text-[#bec8cf]">
                    <li className="flex gap-3">
                      <span className="text-[#7bd0ff] font-mono font-bold">01.</span>
                      <span>Create a variable named <code className="bg-[#0d0e11] px-1.5 py-0.5 rounded text-[#c3c0ff]">gems_collected</code> and set it to <code className="text-[#57dea0]">15</code>.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#7bd0ff] font-mono font-bold">02.</span>
                      <span>Create another variable <code className="bg-[#0d0e11] px-1.5 py-0.5 rounded text-[#c3c0ff]">bonus_multiplier</code> and set it to <code className="text-[#57dea0]">2.0</code>.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#7bd0ff] font-mono font-bold">03.</span>
                      <span>Print the result of multiplying these two values.</span>
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {/* Bookmarks Panel */}
            {activePanel === 'bookmarks' && (
              <div className="p-6">
                <h2 className="font-headline text-xl font-bold mb-4">Bookmarks</h2>
                <p className="text-[#bec8cf] text-sm italic">You haven't bookmarked any snippets yet.</p>
              </div>
            )}

            {/* History Panel */}
            {activePanel === 'history' && (
              <div className="p-6">
                <h2 className="font-headline text-xl font-bold mb-4">Run History</h2>
                <div className="space-y-3">
                  <div className="p-3 bg-[#1f1f23] rounded border border-[#3f484e]/10 text-xs font-mono">
                    <span className="text-[#bec8cf]/50">2 mins ago</span><br/>
                    <span className="text-[#7bd0ff]">print("Hello Python!")</span>
                  </div>
                </div>
              </div>
            )}

            {/* Search Panel */}
            {activePanel === 'search' && (
              <div className="p-6">
                <h2 className="font-headline text-xl font-bold mb-4">Search Theory</h2>
                <div className="relative">
                  <input 
                    className="w-full bg-[#0d0e11] border border-[#3f484e]/30 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#7bd0ff]/50 transition-colors" 
                    placeholder="Search topics..." 
                    type="text"
                  />
                  <span className="absolute right-3 top-2.5 text-[#bec8cf] text-sm">
                    <SearchIcon />
                  </span>
                </div>
              </div>
            )}

            {/* Feedback Panel */}
            {activePanel === 'feedback' && (
              <div className="p-6">
                <h2 className="font-headline text-xl font-bold mb-4">Feedback</h2>
                <textarea 
                  className="w-full h-32 bg-[#0d0e11] border border-[#3f484e]/30 rounded-lg p-4 text-sm focus:outline-none focus:border-[#7bd0ff]/50 mb-4" 
                  placeholder="How can we improve this sprint?"
                ></textarea>
                <button className="bg-[#7bd0ff] text-[#003549] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded">
                  Submit
                </button>
              </div>
            )}

            {/* Info Panel */}
            {activePanel === 'info' && (
              <div className="p-6">
                <h2 className="font-headline text-xl font-bold mb-4">Sprint Details</h2>
                <div className="space-y-2 text-sm text-[#bec8cf]">
                  <p><strong>Difficulty:</strong> Beginner</p>
                  <p><strong>Language:</strong> Python 3.11</p>
                  <p><strong>Estimated Time:</strong> 5 mins</p>
                </div>
              </div>
            )}
          </section>

          {/* Right Panel: Editor & Terminal */}
          <section className="flex-1 flex flex-col bg-[#0d0e11] relative">
            {/* Monaco Area */}
            <div className="flex-1 flex flex-col relative">
              <div className="h-10 bg-[#1f1f23] flex items-center px-4 border-b border-[#3f484e]/10">
                <div className="flex items-center gap-2 bg-[#0d0e11] px-3 py-1.5 rounded-t-lg border-t border-x border-[#3f484e]/20">
                  <TerminalIcon />
                  <span className="text-[10px] font-bold tracking-widest uppercase">solution.py</span>
                </div>
              </div>
              <div className="flex-1 p-6 font-mono text-sm leading-relaxed overflow-hidden">
                <div className="flex gap-4 h-full">
                  <div className="text-[#bec8cf]/30 text-right select-none w-6 leading-6">
                    1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8
                  </div>
                  <textarea
                    ref={codeEditorRef}
                    className="flex-1 bg-transparent text-[#e3e2e6] whitespace-pre-wrap outline-none resize-none font-mono"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck={false}
                  />
                </div>
              </div>
            </div>

            {/* Terminal / Output */}
            <div className="h-56 bg-[#1f1f23] border-t border-[#3f484e]/30 flex flex-col">
              <div className="flex items-center px-4 h-10 gap-6">
                <button 
                  onClick={() => switchTerminalTab('console')}
                  className={`text-[10px] font-bold uppercase tracking-[0.2em] h-full ${
                    activeTerminalTab === 'console' 
                      ? 'text-[#7bd0ff] border-b-2 border-[#7bd0ff]' 
                      : 'text-[#bec8cf] hover:text-[#e3e2e6]'
                  }`}
                >
                  Console
                </button>
                <button 
                  onClick={() => switchTerminalTab('test')}
                  className={`text-[10px] font-bold uppercase tracking-[0.2em] h-full transition-colors ${
                    activeTerminalTab === 'test' 
                      ? 'text-[#7bd0ff] border-b-2 border-[#7bd0ff]' 
                      : 'text-[#bec8cf] hover:text-[#e3e2e6]'
                  }`}
                >
                  Test Cases
                </button>
              </div>
              <div className="flex-1 p-4 bg-[#0d0e11] font-mono text-xs text-[#bec8cf] overflow-y-auto custom-scrollbar">
                {activeTerminalTab === 'console' && (
                  <div>
                    {terminalOutput.map((line, index) => (
                      <p 
                        key={index} 
                        className={
                          line.type === 'info' ? 'mb-1 opacity-50 text-[10px] uppercase tracking-wider' :
                          line.type === 'success' ? 'text-[#57dea0]' :
                          'text-[#bec8cf]/40 mt-2 italic'
                        }
                      >
                        {line.text}
                      </p>
                    ))}
                  </div>
                )}
                {activeTerminalTab === 'test' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-[#1a1b1e] rounded border border-[#3f484e]/10">
                      <span className="text-xs uppercase tracking-tight">Test 01: gems_collected exists</span>
                      <CheckCircleIcon />
                    </div>
                    <div className="flex items-center justify-between p-2 bg-[#1a1b1e] rounded border border-[#3f484e]/10">
                      <span className="text-xs uppercase tracking-tight">Test 02: multiplier is float</span>
                      <CheckCircleIcon />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="h-16 bg-[#292a2d] border-t border-[#3f484e]/30 px-6 flex items-center justify-between">
              <button 
                onClick={toggleAIPanel}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#7bd0ff]/20 hover:bg-[#7bd0ff]/5 transition-all group"
              >
                <BoltIconSmall />
                <span className="text-xs font-bold uppercase tracking-widest text-[#7bd0ff]">Ask AI Assistant</span>
              </button>
              <button 
                onClick={simulateRun}
                disabled={isRunning}
                className="flex items-center gap-3 px-8 py-2.5 bg-[#7bd0ff] text-[#003549] rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#7bd0ff]/10 disabled:opacity-80 disabled:pointer-events-none"
              >
                {isRunning ? <SyncIcon /> : <PlayArrowIcon />}
                <span className="text-xs uppercase tracking-[0.15em]">
                  {isRunning ? 'Running...' : 'Run Code'}
                </span>
              </button>
            </div>

            {/* AI Panel Popup */}
            {isAIPanelOpen && (
              <AiPanelpopup onClose={toggleAIPanel} />
            )}
          </section>
        </main>
      </div>

      {/* Hint Modal */}
      {isHintModalOpen && (
        <CodeEditorHint 
          onClose={() => setIsHintModalOpen(false)}
          hint="In Python, you can multiply two values using the asterisk (*) symbol. For example: a * b"
        />
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-[#121316]/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#1f1f23] rounded-2xl border border-[#3f484e]/30 p-8 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#7bd0ff]/5 rounded-full blur-3xl"></div>
            <div className="w-20 h-20 bg-[#00a56e]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#57dea0]/20">
              <CheckCircleIcon />
            </div>
            <h2 className="font-headline text-3xl font-bold text-[#e3e2e6] mb-2 uppercase">Sprint Complete!</h2>
            <p className="text-[#bec8cf] mb-8">You've mastered the basics of numbers and variable assignment.</p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="px-6 py-4 bg-[#1a1b1e] rounded-xl border border-[#3f484e]/10 text-center flex-1">
                <span className="block text-[10px] font-bold text-[#c3c0ff] uppercase tracking-widest mb-1">XP EARNED</span>
                <span className="text-2xl font-headline font-bold text-[#7bd0ff]">+150</span>
              </div>
              <div className="px-6 py-4 bg-[#1a1b1e] rounded-xl border border-[#3f484e]/10 text-center flex-1">
                <span className="block text-[10px] font-bold text-[#c3c0ff] uppercase tracking-widest mb-1">ACCURACY</span>
                <span className="text-2xl font-headline font-bold text-[#57dea0]">100%</span>
              </div>
            </div>
            <button 
              onClick={handleBackToJourney}
              className="w-full py-4 bg-[#7bd0ff] text-[#003549] font-bold rounded-xl flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-xl shadow-[#7bd0ff]/20 group"
            >
              <span className="uppercase tracking-[0.2em] text-sm">Next Challenge</span>
              <ArrowForwardIcon />
            </button>
            <button 
              onClick={handleBackToJourney}
              className="mt-4 text-[10px] font-bold text-[#bec8cf] uppercase tracking-widest hover:text-[#e3e2e6] transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
