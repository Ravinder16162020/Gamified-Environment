import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JourneySidebar from '../../components/Sidebar/JourneySidebar';
import styles from './JyQuizTheory.module.css';

// Lucide icons as SVG components
const XIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const DropletIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
  </svg>
);

const DiamondIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 3h12l4 6-10 13L2 9l4-6z"/>
  </svg>
);

const ZapIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const FileTextIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

const BookmarkIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
  </svg>
);

const RotateCcwIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const HelpCircleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const MessageSquareIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

const LightbulbIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="9" y1="18" x2="15" y2="18"/>
    <line x1="10" y1="22" x2="14" y2="22"/>
    <path d="M15.09 14c.18-.2.28-.46.28-.76V10c0-2.21-1.79-4-4-4-2.21 0-4 1.79-4 4v3.24c0 .3.1.56.28.76l1.25 1.41A3 3 0 0 0 9 17h6a3 3 0 0 0 2.84-2.19L15.09 14z"/>
  </svg>
);

const UndoIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7v6h6"/>
    <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const quizData = [
  {
    question: "What does a variable represent in Python?",
    options: [
      { id: 1, text: "A type of function", isCorrect: false },
      { id: 2, text: "A mathematical equation", isCorrect: false },
      { id: 3, text: "A container that holds data values", isCorrect: true },
      { id: 4, text: "A fixed constant", isCorrect: false }
    ],
    explanation: "Variables are named containers used for storing data values that can be manipulated throughout your program."
  },
  {
    question: "Which of the following is a valid integer in Python?",
    options: [
      { id: 1, text: "3.14", isCorrect: false },
      { id: 2, text: "42", isCorrect: true },
      { id: 3, text: '"hello"', isCorrect: false },
      { id: 4, text: "True", isCorrect: false }
    ],
    explanation: "Integers are whole numbers without decimal points. 42 is a valid integer, while 3.14 is a float."
  },
  {
    question: "What is the result of 15 * 2.0?",
    options: [
      { id: 1, text: "30", isCorrect: false },
      { id: 2, text: "30.0", isCorrect: true },
      { id: 3, text: '"302"', isCorrect: false },
      { id: 4, text: "Error", isCorrect: false }
    ],
    explanation: "When multiplying an integer by a float, Python returns a float. 15 * 2.0 = 30.0"
  },
  {
    question: "What naming convention should you use for Python variables?",
    options: [
      { id: 1, text: "PascalCase", isCorrect: false },
      { id: 2, text: "camelCase", isCorrect: false },
      { id: 3, text: "snake_case", isCorrect: true },
      { id: 4, text: "kebab-case", isCorrect: false }
    ],
    explanation: "Python convention recommends using snake_case (lowercase with underscores) for variable names."
  },
  {
    question: "Which operator is used for multiplication in Python?",
    options: [
      { id: 1, text: "x", isCorrect: false },
      { id: 2, text: "*", isCorrect: true },
      { id: 3, text: "#", isCorrect: false },
      { id: 4, text: "&", isCorrect: false }
    ],
    explanation: "The asterisk (*) symbol is used for multiplication in Python."
  }
];

const JyQuizTheory = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const question = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  const handleOptionClick = (optionId) => {
    if (!hasSubmitted) {
      setSelectedOption(optionId);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const isCorrect = question.options.find(opt => opt.id === selectedOption)?.isCorrect;
    if (isCorrect) {
      setScore(score + 1);
    }
    setHasSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
    } else {
      setShowCompleteModal(true);
    }
  };

  const handleBackToJourney = () => {
    navigate('/journey');
  };

  const getOptionClass = (option) => {
    if (!hasSubmitted) {
      return selectedOption === option.id ? styles.selected : '';
    }
    
    if (option.isCorrect) {
      return styles.correct;
    }
    
    if (selectedOption === option.id && !option.isCorrect) {
      return styles.wrong;
    }
    
    return '';
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-[#121316] text-white">
      {/* TOP BAR */}
      <header className="h-12 bg-[#252627] border-b border-[#424548] flex items-center justify-between px-4 z-30 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBackToJourney}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <XIcon />
          </button>
          <div className="h-4 w-px bg-[#424548]"></div>
          <h1 className="text-white font-bold text-sm tracking-tight">Numbers & Variables</h1>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-[rgba(255,255,255,0.4)] font-black text-xs">
            <DropletIcon />
            <span>1,240</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#FFB800] font-black text-xs">
            <DiamondIcon />
            <span>42</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#7c79c8] font-black text-xs">
            <ZapIcon />
            <span>3,450</span>
          </div>
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqWEfAx_tLU3phq8s_8srBHnFhBlyh2hvWeWuaObBjj94OzLUMI6RDbUrKK-HuTci8cfsK045Q4KpQgqDEchYoq5HVdr3msq2eZ2HDVDe8KrTjHYKLdn2pD3Y7may46JEWUO7duN3TGThY22EXfzkRBd3mONuAW_z4lTqWujyHkzMQ8UEBdboxR8jO0xUZGRyb8wsqY1Vyb3KXbmIqZzONeNS-CQxzQyoI5wT2tIRHNprCusVNQZZDRJNyTI8ubFz0s-6dKSPKcA" 
            alt="Avatar" 
            className="w-7 h-7 rounded-full border border-[#424548]"
          />
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <JourneySidebar />

        {/* ICON STRIP */}
        <aside className="w-12 bg-[#1a1b1e] border-r border-[#3f484e]/15 flex flex-col items-center py-4 gap-4 z-40">
          <button className="p-2 rounded text-[#bec8cf] hover:text-[#e3e2e6] hover:bg-[#7bd0ff]/10 transition-colors">
            <FileTextIcon />
          </button>
          <button className="p-2 rounded bg-[#7bd0ff]/10 text-[#7bd0ff] transition-colors">
            <BookmarkIcon />
          </button>
          <button className="p-2 rounded text-[#bec8cf] hover:text-[#e3e2e6] hover:bg-[#7bd0ff]/10 transition-colors">
            <RotateCcwIcon />
          </button>
          <button className="p-2 rounded text-[#bec8cf] hover:text-[#e3e2e6] hover:bg-[#7bd0ff]/10 transition-colors">
            <SearchIcon />
          </button>
          <div className="mt-auto flex flex-col gap-4">
            <button className="p-2 rounded text-[#bec8cf] hover:text-[#e3e2e6] hover:bg-[#7bd0ff]/10 transition-colors">
              <HelpCircleIcon />
            </button>
            <button className="p-2 rounded text-[#bec8cf] hover:text-[#e3e2e6] hover:bg-[#7bd0ff]/10 transition-colors">
              <MessageSquareIcon />
            </button>
            <button className="p-2 rounded text-[#bec8cf] hover:text-[#e3e2e6] hover:bg-[#7bd0ff]/10 transition-colors">
              <InfoIcon />
            </button>
          </div>
        </aside>

        {/* LEFT PANEL (Theory/Reference) */}
        <main className="w-[40%] bg-[#1a1b1e] border-r border-[#424548] flex flex-col overflow-hidden">
          {/* PANEL HEADER */}
          <div className="px-6 py-4 border-b border-[#424548] flex items-center justify-between bg-[#252627] shrink-0">
            <h2 className="text-white font-bold text-lg">Numbers</h2>
            <div className="flex gap-2">
              <button className="bg-[#2d2e2f] text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg hover:bg-[#424548] transition-colors">TL;DR</button>
              <button className="bg-[#2d2e2f] text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg hover:bg-[#424548] transition-colors">Hide</button>
            </div>
          </div>

          {/* CONTENT AREA */}
          <div className={`flex-1 overflow-y-auto ${styles.customScrollbar} p-6 space-y-6`}>
            {/* Theory Content */}
            <div>
              <p className="text-[rgba(255,255,255,0.87)] text-sm leading-relaxed">
                In Python, numbers are not just values; they are first-class objects. You will primarily work with <span className="font-bold text-[#2087B3]">integers</span> (whole numbers) and <span className="font-bold text-[#00AB72]">floats</span> (decimals).
              </p>

              <div className="bg-[#0f0f1a] border border-[#424548] rounded-xl p-4 my-4 font-mono text-sm text-[#e5c07b]">
                <span className="text-slate-500"># Assignment syntax</span><br/>
                player_score = <span className="text-[#2087B3]">100</span><br/>
                gravity = <span className="text-[#00AB72]">9.81</span>
              </div>

              <p className="text-[rgba(255,255,255,0.87)] text-sm leading-relaxed mt-4">
                Unlike other languages, Python integers have arbitrary precision, meaning they can be as large as your computer's memory allows. This makes them incredibly powerful for scientific computing and cryptographic logic.
              </p>

              {/* Key Concept Box */}
              <div className="bg-[#0E4A66]/20 border-l-4 border-[#2087B3] rounded-r-xl p-4 my-6">
                <div className="flex items-center gap-2 mb-2">
                  <LightbulbIcon />
                  <span className="text-[#2087B3] text-[10px] font-black uppercase tracking-wider">Dynamic Typing</span>
                </div>
                <p className="text-slate-300 text-xs">Python automatically detects whether a number is an integer or a float. You don't need to declare types manually.</p>
              </div>

              <h3 className="text-white font-bold text-base mt-8 mb-4">Common Operations</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#252627] flex items-center justify-center shrink-0 mt-0.5 text-[#2087B3] text-xs font-bold">+</div>
                  <p className="text-slate-400 text-xs"><span className="text-white font-semibold">Addition:</span> Joins two numeric values together.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-[#252627] flex items-center justify-center shrink-0 mt-0.5 text-[#2087B3] text-xs font-bold">*</div>
                  <p className="text-slate-400 text-xs"><span className="text-white font-semibold">Multiplication:</span> Computes the product of two values.</p>
                </li>
              </ul>
            </div>
          </div>
        </main>

        {/* RIGHT PANEL (Quiz) */}
        <section className="flex-1 flex flex-col bg-[#1a1b1e] overflow-hidden">
          {/* PROGRESS BAR */}
          <div className="px-8 pt-6 pb-2 shrink-0">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <UndoIcon />
              </button>
              <div className="flex-1 h-2 bg-[#424548] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#2087B3] rounded-full transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Q{currentQuestion + 1} OF {quizData.length}
              </span>
            </div>
          </div>

          {/* QUESTION AREA */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-12 py-10">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-white text-xl font-medium leading-relaxed mb-10">
                {question.question}
              </h3>

              <div className="space-y-3">
                {question.options.map((option) => (
                  <div 
                    key={option.id}
                    onClick={() => handleOptionClick(option.id)}
                    className={`group flex items-center gap-4 bg-[#252627] border-2 border-[#424548] rounded-xl px-5 py-4 cursor-pointer transition-all hover:border-[rgba(32,135,179,0.5)] hover:bg-[rgba(32,135,179,0.08)] ${getOptionClass(option)}`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-[#1a1b1e] border border-[#424548] text-[rgba(255,255,255,0.6)] font-black text-sm flex items-center justify-center group-hover:border-[#2087B3]/50 transition-colors ${
                      selectedOption === option.id ? 'border-[#2087B3] text-[#2087B3]' : ''
                    } ${hasSubmitted && option.isCorrect ? 'border-[#00AB72] text-[#00AB72]' : ''}`}>
                      {option.id}
                    </div>
                    <span className={`text-sm ${selectedOption === option.id ? 'text-white font-medium' : 'text-slate-300'}`}>
                      {option.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Explanation */}
              {hasSubmitted && (
                <div className="bg-[#0E4A66]/40 border-l-2 border-[#2087B3] rounded-r-xl px-5 py-4 mt-8 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircleIcon />
                    <span className="text-white font-bold text-sm">
                      {question.options.find(opt => opt.id === selectedOption)?.isCorrect ? 'Correct!' : 'Incorrect'}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{question.explanation}</p>
                </div>
              )}
            </div>
          </div>

          {/* SUBMIT BAR */}
          <div className="h-20 bg-[#1a1a2e] border-t border-[#424548] px-8 flex items-center gap-4 shrink-0">
            <button 
              onClick={hasSubmitted ? handleNext : handleSubmit}
              disabled={selectedOption === null && !hasSubmitted}
              className="flex-1 bg-[#2087B3] hover:bg-[#1a6b8e] disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
            >
              <span>{hasSubmitted ? 'NEXT →' : 'SUBMIT'}</span>
              {!hasSubmitted && (
                <div className="bg-[#0E4A66] border border-[#2087B3] text-[#2087B3] text-[10px] px-2 py-0.5 rounded uppercase font-black">Enter</div>
              )}
            </button>
          </div>
        </section>
      </div>

      {/* QUIZ COMPLETE MODAL */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[#252627] border border-[#424548] rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl transform scale-100 transition-transform duration-300">
            {/* Score Circle */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="44" stroke="#424548" strokeWidth="8" fill="transparent" />
                <circle 
                  cx="48" 
                  cy="48" 
                  r="44" 
                  stroke="#00AB72" 
                  strokeWidth="8" 
                  fill="transparent" 
                  strokeDasharray="276" 
                  strokeDashoffset={276 - (276 * score) / quizData.length} 
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-black text-white">{score}/{quizData.length}</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-black text-white">Quiz Complete!</h2>
            <p className="text-slate-400 text-sm mt-2">You got {score} correct out of {quizData.length}</p>
            
            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="text-[#7c79c8] text-4xl font-black">+{score * 10} XP</div>
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.ceil((score / quizData.length) * 3) ? 'text-[#2087B3] fill-[#2087B3]' : 'text-[#424548]'}`}
                  />
                ))}
              </div>
              <div className="bg-[#0E4A66] text-[#2087B3] font-bold text-xs px-4 py-1.5 rounded-full">
                {score === quizData.length ? 'Perfect! 🎉' : score >= 3 ? 'Great Job! 🎉' : 'Good Try! 💪'}
              </div>
            </div>

            <button 
              onClick={handleBackToJourney}
              className="w-full bg-[#2087B3] hover:bg-[#1a6b8e] text-white font-black py-4 rounded-xl mt-8 transition-all"
            >
              Continue
            </button>
            <button 
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setSelectedOption(null);
                setHasSubmitted(false);
                setShowCompleteModal(false);
              }}
              className="w-full text-slate-500 font-bold text-xs mt-4 hover:text-slate-300"
            >
              Review Answers
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JyQuizTheory;
