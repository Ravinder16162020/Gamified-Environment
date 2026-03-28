import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import JourneySidebar from '../../components/Sidebar/JourneySidebar';
import styles from './Practice.module.css';

// SVG Icons
const BoltIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h20v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
  </svg>
);

const NotificationsIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h20v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

const AutoAwesomeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zm5.25 8.5l-1.25-2.75L14 12.5l2.75-1.25L18 8.5l1.25 2.75L22 12.5l-2.75 1.25L18 18z"/>
  </svg>
);

const LightbulbIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const CircleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10"/>
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
  </svg>
);

// Problems data
const PROBLEMS = [
  {
    id: 1,
    title: "Sum of Two Numbers",
    difficulty: "EASY",
    topic: "Variables",
    desc: "In this exercise, you will create a simple program that performs basic arithmetic. Your goal is to write a script that reads two integer inputs from the user and outputs their sum.",
    hint: "Remember that input() always returns a string. You must convert these strings to integers using int() before performing mathematical operations.",
    code: "def calculate_sum():\n    # Read input from user\n    num1 = int(input())\n    num2 = int(input())\n\n    # TODO: Print the sum here\n    print(num1 + num2)\n    \nif __name__ == \"__main__\":\n    calculate_sum()",
    testCases: ["5, 10 → 15", "0, 0 → 0", "-1, 1 → 0", "100, 200 → 300"]
  },
  {
    id: 2,
    title: "Even or Odd",
    difficulty: "EASY",
    topic: "Operators",
    desc: "Write a function that takes an integer as input and returns 'Even' for even numbers and 'Odd' for odd numbers. Use the modulo operator to determine divisibility.",
    hint: "The modulo operator (%) returns the remainder of a division. For even numbers, number % 2 will be zero.",
    code: "def even_or_odd():\n    # Get number from user\n    val = int(input())\n    \n    # Logic here\n    if val % 2 == 0:\n        print('Even')\n    else:\n        print('Odd')\n\nif __name__ == \"__main__\":\n    even_or_odd()",
    testCases: ["2 → Even", "7 → Odd", "0 → Even", "101 → Odd"]
  },
  {
    id: 3,
    title: "Loop Through Range",
    difficulty: "MEDIUM",
    topic: "Loops",
    desc: "Create a loop that prints all numbers from 1 up to (and including) the input integer N. Each number should be on a new line.",
    hint: "Use the range() function inside a for-loop. Remember that range(start, stop) is inclusive of start but exclusive of stop.",
    code: "def print_range():\n    n = int(input())\n    for i in range(1, n + 1):\n        print(i)\n\nif __name__ == \"__main__\":\n    print_range()",
    testCases: ["3 → 1, 2, 3", "1 → 1", "5 → 1..5", "0 → (empty)"]
  },
  {
    id: 4,
    title: "String Reverse",
    difficulty: "MEDIUM",
    topic: "Data Types",
    desc: "Given a string input, reverse its contents and print the result. Try using slicing for an elegant one-line solution.",
    hint: "Python strings can be sliced using [start:stop:step]. A negative step will traverse the string backwards.",
    code: "def reverse_string():\n    s = input()\n    print(s[::-1])\n\nif __name__ == \"__main__\":\n    reverse_string()",
    testCases: ["'hello' → 'olleh'", "'code' → 'edoc'", "'a' → 'a'", "'' → ''"]
  }
];

const Practice = () => {
  const navigate = useNavigate();
  const [currentProblem, setCurrentProblem] = useState(PROBLEMS[0]);
  const [selectedTopic, setSelectedTopic] = useState('Variables');
  const [selectedDiff, setSelectedDiff] = useState(null);
  const [consoleOutput, setConsoleOutput] = useState(<p className="text-[#899299] italic">Run your code to see output...</p>);
  const [isRunning, setIsRunning] = useState(false);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [code, setCode] = useState(PROBLEMS[0].code);
  const [testCases, setTestCases] = useState(PROBLEMS[0].testCases.map((tc, i) => ({ id: i, text: tc, passed: false })));

  const topics = ['Variables', 'Operators', 'Loops', 'Data Types'];

  const filteredProblems = PROBLEMS.filter(p => {
    const topicMatch = !selectedTopic || p.topic === selectedTopic;
    const diffMatch = !selectedDiff || p.difficulty === selectedDiff;
    return topicMatch && diffMatch;
  });

  const selectProblem = (problem) => {
    setCurrentProblem(problem);
    setCode(problem.code);
    setTestCases(problem.testCases.map((tc, i) => ({ id: i, text: tc, passed: false })));
    setConsoleOutput(<p className="text-[#899299] italic">Run your code to see output...</p>);
    setShowSubmitBtn(false);
  };

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setConsoleOutput(
        <div className="space-y-1">
          <p className="text-[#899299]">{`>>> python3 main.py`}</p>
          <p className="text-[#e3e2e6]">Execution successful.</p>
          <p className="text-[#e3e2e6]">Output: 15</p>
        </div>
      );
    }, 1000);
  };

  const runTests = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      const newTestCases = testCases.map((tc, i) => ({ ...tc, passed: true }));
      setTestCases(newTestCases);
      setConsoleOutput(<p className="text-[#57dea0] font-bold">ALL TEST CASES PASSED! (4/4)</p>);
      setShowSubmitBtn(true);
    }, 1500);
  };

  const submitSolution = () => {
    setShowCelebration(true);
  };

  const continueToNext = () => {
    setShowCelebration(false);
    const nextIndex = (PROBLEMS.indexOf(currentProblem) + 1) % PROBLEMS.length;
    selectProblem(PROBLEMS[nextIndex]);
  };

  return (
    <div className="bg-[#121316] text-[#e3e2e6] font-sans h-screen flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-16 flex justify-between items-center px-6 bg-[#121316] shrink-0 z-50 border-b border-[#3f484e]/10">
        <div className="flex items-center gap-8 ml-16">
          <nav className="hidden md:flex gap-6 items-center">
            <button className="font-bold text-[#899299] hover:text-[#2087B3] transition-colors tracking-tight">
              AI Assistant
            </button>
            <button className="font-bold text-[#2087B3] border-b-2 border-[#2087B3] transition-colors tracking-tight">
              Docs
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#1f1f23] px-3 py-1.5 rounded-lg border border-[#3f484e]/10">
            <BoltIcon />
            <span className="text-xs font-bold tracking-widest text-[#e3e2e6]">1,240 XP</span>
          </div>
          <button className="text-[#899299] hover:text-[#2087B3] transition-colors">
            <NotificationsIcon />
          </button>
          <div className="h-8 w-8 rounded-full overflow-hidden border border-[#2087B3]/20">
            <img 
              alt="User profile avatar" 
              className="h-full w-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuADOH_-D1SoaVIN1yZq_emYUFfDYzdkJjH18GBi8ZOuIawEUsG5qNmCsmEjsXNloWVWn4yeMVbdM35GcvWVq-BjD3N2wvjWAroP_tyDXDWLl9r-VTeFP9mVplVcc_nXD8hByHao110MRQ92SUIKtGtmxoSs9kkApxQ1CriDWorSKe0qGyjKVc8X71T0yioDbXt-bLNKhYEXZKFVXbriMGqi0OkQEkM0CNnOwUmcLa1k7ivv7hL0Y9joK1j_attpwImJoBW6Nwjs9A"
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <JourneySidebar />

        {/* Main Workspace */}
        <main className="flex-1 grid grid-cols-12 overflow-hidden bg-[#121316] h-full ml-16">
          {/* Column 1: Problem List */}
          <section className="col-span-12 lg:col-span-3 xl:col-span-3 flex flex-col border-r border-[#3f484e]/5 bg-[#1A1B1E] h-full overflow-hidden">
            <div className="p-6 space-y-5 shrink-0">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#899299]">
                  <SearchIcon />
                </span>
                <input 
                  className="w-full bg-[#0d0e11] border-none focus:ring-2 focus:ring-[#2087B3]/20 text-sm py-2.5 pl-10 rounded text-[#e3e2e6] outline-none"
                  placeholder="Search problems..." 
                  type="text"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-[0.6875rem] font-bold text-[#899299] tracking-[0.1em] uppercase">Topic Filters</h3>
                <div className="flex flex-wrap gap-2">
                  {topics.map(topic => (
                    <span 
                      key={topic}
                      onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
                      className={`px-3 py-1 text-xs border rounded cursor-pointer transition-colors ${
                        selectedTopic === topic 
                          ? 'bg-[#343538] text-[#2087B3] border-[#2087B3]/30' 
                          : 'bg-[#343538] text-[#bec8cf] border-[#3f484e]/10 hover:bg-[#292a2d]'
                      }`}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedDiff(selectedDiff === 'EASY' ? null : 'EASY')}
                  className={`flex-1 text-[0.6875rem] font-bold py-1.5 border border-[#3f484e]/20 rounded hover:bg-[#57dea0]/5 transition-colors ${
                    selectedDiff === 'EASY' ? 'bg-[#57dea0]/10 border-[#57dea0] text-[#57dea0]' : 'text-[#57dea0]'
                  }`}
                >
                  EASY
                </button>
                <button 
                  onClick={() => setSelectedDiff(selectedDiff === 'MEDIUM' ? null : 'MEDIUM')}
                  className={`flex-1 text-[0.6875rem] font-bold py-1.5 border border-[#3f484e]/20 rounded hover:bg-[#c3c0ff]/5 transition-colors ${
                    selectedDiff === 'MEDIUM' ? 'bg-[#c3c0ff]/10 border-[#c3c0ff] text-[#c3c0ff]' : 'text-[#c3c0ff]'
                  }`}
                >
                  MEDIUM
                </button>
                <button 
                  onClick={() => setSelectedDiff(selectedDiff === 'HARD' ? null : 'HARD')}
                  className={`flex-1 text-[0.6875rem] font-bold py-1.5 border border-[#3f484e]/20 rounded hover:bg-[#ffb4ab]/5 transition-colors ${
                    selectedDiff === 'HARD' ? 'bg-[#ffb4ab]/10 border-[#ffb4ab] text-[#ffb4ab]' : 'text-[#ffb4ab]'
                  }`}
                >
                  HARD
                </button>
              </div>
            </div>
            <div className={`flex-1 overflow-y-auto ${styles.customScrollbar} pb-6`}>
              <div className="space-y-1 px-0">
                {filteredProblems.map(p => {
                  const isActive = p.id === currentProblem.id;
                  return (
                    <div 
                      key={p.id}
                      onClick={() => selectProblem(p)}
                      className={`p-4 rounded-lg cursor-pointer transition-all border-l-4 ${
                        isActive 
                          ? 'bg-[#1f1f23] border-[#2087B3]' 
                          : 'hover:bg-[#1a1b1e] border-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-sm font-bold ${isActive ? 'text-[#e3e2e6]' : 'text-[#899299]'}`}>{p.title}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          p.difficulty === 'EASY' ? 'text-[#57dea0] bg-[#57dea0]/10' : 
                          p.difficulty === 'MEDIUM' ? 'text-[#c3c0ff] bg-[#c3c0ff]/10' : 
                          'text-[#ffb4ab] bg-[#ffb4ab]/10'
                        }`}>
                          {p.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-[#899299]">
                        <span className="uppercase font-bold tracking-wider">{p.topic}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Column 2 & 3: Editor & Testing Workspace */}
          <section className="col-span-12 lg:col-span-9 xl:col-span-9 flex flex-col bg-[#0d0e11] h-full overflow-hidden">
            {/* Editor Header */}
            <div className="h-16 flex items-center justify-between px-6 bg-[#1f1f23]/50 border-b border-[#3f484e]/10 shrink-0">
              <div className="flex items-center gap-4">
                <h2 className="font-bold text-lg text-[#e3e2e6]">{currentProblem.title}</h2>
                <div className="flex gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    currentProblem.difficulty === 'EASY' ? 'bg-[#00a56e]/20 text-[#57dea0] border border-[#57dea0]/20' : 
                    currentProblem.difficulty === 'MEDIUM' ? 'bg-[#403d88]/20 text-[#c3c0ff] border border-[#c3c0ff]/20' : 
                    'bg-[#ffb4ab]/20 text-[#ffb4ab] border border-[#ffb4ab]/20'
                  }`}>
                    {currentProblem.difficulty}
                  </span>
                  <span className="text-[10px] font-bold bg-[#343538] text-[#bec8cf] px-2 py-0.5 rounded uppercase">
                    {currentProblem.topic}
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowAIPanel(true)}
                  className="flex items-center gap-2 bg-[#1f1f23] px-4 py-1.5 rounded-full text-xs font-bold text-[#e3e2e6] border border-[#3f484e]/20 hover:bg-[#343538] transition-colors"
                >
                  <AutoAwesomeIcon />
                  ASK AI
                </button>
                {showSubmitBtn && (
                  <button 
                    onClick={submitSolution}
                    className="flex items-center gap-2 bg-[#2087B3] text-white px-6 py-1.5 rounded-full text-xs font-bold shadow-[0_4px_12px_rgba(32,135,179,0.3)] hover:scale-105 transition-transform"
                  >
                    SUBMIT SOLUTION
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Top Section: Description + Editor */}
              <div className="flex-1 flex overflow-hidden border-b border-[#3f484e]/10">
                {/* Description Section */}
                <div className="w-1/3 p-6 bg-[#1A1B1E] border-r border-[#3f484e]/10 overflow-y-auto no-scrollbar">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold text-[#899299] uppercase tracking-widest mb-2">Description</h4>
                      <p className="text-sm text-[#bec8cf] leading-relaxed">{currentProblem.desc}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-[#899299] uppercase tracking-wider">Input Example</p>
                        <pre className="bg-[#0d0e11] p-3 rounded border border-[#3f484e]/10 font-mono text-xs text-[#2087B3]">5{'\n'}10</pre>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-[#899299] uppercase tracking-wider">Output Example</p>
                        <pre className="bg-[#0d0e11] p-3 rounded border border-[#3f484e]/10 font-mono text-xs text-[#57dea0]">15</pre>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Monaco Editor Area */}
                <div className={`flex-1 relative bg-[#0D0E11] overflow-hidden flex flex-col ${styles.customScrollbar}`}>
                  <div className="flex-1 p-6 font-mono text-sm leading-relaxed overflow-y-auto">
                    <div className="flex gap-4 min-h-full">
                      <div className="text-[#bec8cf]/30 text-right select-none w-6 leading-6">
                        1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8
                      </div>
                      <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="flex-1 bg-transparent text-[#e3e2e6] whitespace-pre-wrap outline-none resize-none font-mono leading-6 min-h-full overflow-y-hidden"
                        spellCheck={false}
                      />
                    </div>
                  </div>
                  {/* Execution Overlay */}
                  {isRunning && (
                    <div className="absolute inset-0 bg-[#121316]/80 flex items-center justify-center z-20 backdrop-blur-sm">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-[#2087B3] border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-[#2087B3] font-bold animate-pulse">EXECUTING CODE...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Section: Results & Controls */}
              <div className="h-64 flex bg-[#0d0e11] overflow-hidden border-t border-[#3f484e]/10">
                {/* Console Output */}
                <div className="w-1/2 flex flex-col border-r border-[#3f484e]/10">
                  <div className="px-4 py-2 bg-[#1a1b1e]/50 border-b border-[#3f484e]/10 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-[#899299] uppercase tracking-widest">Console Output</span>
                    <button 
                      onClick={() => setConsoleOutput(<p className="text-[#899299] italic">Run your code to see output...</p>)}
                      className="text-[#899299] hover:text-[#e3e2e6]"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                  <div className="flex-1 p-4 font-mono text-xs overflow-y-auto no-scrollbar">
                    {consoleOutput}
                  </div>
                </div>
                {/* Test Cases Panel */}
                <div className="w-1/2 flex flex-col">
                  <div className="px-4 py-2 bg-[#1a1b1e]/50 border-b border-[#3f484e]/10 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-[#899299] uppercase tracking-widest">Test Cases</span>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#57dea0]"></div>
                        <span className="text-[9px] text-[#899299]">Passed</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#ffb4ab]"></div>
                        <span className="text-[9px] text-[#899299]">Failed</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-4 grid grid-cols-2 gap-3 overflow-y-auto no-scrollbar">
                    {testCases.map((tc, idx) => (
                      <div 
                        key={idx}
                        className={`p-3 border rounded flex items-center justify-between transition-all ${
                          tc.passed ? 'border-[#57dea0] bg-[#57dea0]/5' : 'border-[#3f484e]/20'
                        }`}
                      >
                        <div>
                          <p className="text-[10px] text-[#899299] mb-0.5 uppercase">CASE {idx + 1}</p>
                          <p className="text-xs font-bold text-[#e3e2e6]">{tc.text}</p>
                        </div>
                        <span className={`material-symbols-outlined ${tc.passed ? 'text-[#57dea0]' : 'text-[#899299]/30'}`}>
                          {tc.passed ? <CheckCircleIcon /> : <CircleIcon />}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Final Action Bar */}
              <div className="h-16 flex items-center justify-between px-6 bg-[#1f1f23] border-t border-[#3f484e]/10 shrink-0 z-40">
                <button 
                  onClick={() => setShowHint(true)}
                  className="flex items-center gap-2 text-[#bec8cf] hover:text-[#2087B3] transition-colors text-xs font-medium"
                >
                  <LightbulbIcon />
                  GET HINT (5 XP)
                </button>
                <div className="flex gap-4">
                  <button 
                    onClick={runCode}
                    className="px-6 py-2 rounded text-xs font-bold text-[#e3e2e6] bg-[#343538] hover:bg-[#292a2d] transition-all border border-[#3f484e]/20"
                  >
                    RUN CODE
                  </button>
                  <button 
                    onClick={runTests}
                    className="px-8 py-2 rounded text-xs font-bold text-white bg-[#2087B3] hover:bg-[#1a6b8e] transition-all shadow-[0_4px_12px_rgba(32,135,179,0.2)]"
                  >
                    RUN TESTS
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* XP Progress Rail */}
      <div className="fixed bottom-0 left-16 right-0 h-1 bg-[#0d0e11] z-50">
        <div className="h-full bg-gradient-to-r from-[#2087B3] via-[#c3c0ff] to-[#57dea0] w-3/4 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" style={{transform: 'skewX(-20deg)'}}></div>
        </div>
      </div>

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center backdrop-blur-md p-4">
          <div className="bg-[#292a2d] max-w-lg w-full rounded-2xl p-10 shadow-2xl border border-[#3f484e]/20 text-center flex flex-col items-center animate-[scaleIn_0.3s_ease-out]">
            <div className="w-24 h-24 bg-[#57dea0]/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircleIcon className="w-16 h-16 text-[#57dea0]" />
            </div>
            <h2 className="font-black text-4xl text-[#e3e2e6] mb-2">Problem Solved!</h2>
            <p className="text-[#bec8cf] mb-8">You've successfully completed the challenge and earned 20 XP. Keep up the sprint!</p>
            <div className="grid grid-cols-3 gap-4 w-full mb-8">
              <div className="bg-[#0d0e11] p-4 rounded-xl border border-[#3f484e]/10">
                <p className="text-[10px] text-[#899299] uppercase font-bold mb-1">XP EARNED</p>
                <p className="text-xl font-bold text-[#2087B3]">+20</p>
              </div>
              <div className="bg-[#0d0e11] p-4 rounded-xl border border-[#3f484e]/10">
                <p className="text-[10px] text-[#899299] uppercase font-bold mb-1">ACCURACY</p>
                <p className="text-xl font-bold text-[#57dea0]">100%</p>
              </div>
              <div className="bg-[#0d0e11] p-4 rounded-xl border border-[#3f484e]/10">
                <p className="text-[10px] text-[#899299] uppercase font-bold mb-1">STREAK</p>
                <p className="text-xl font-bold text-[#c3c0ff]">5 Days</p>
              </div>
            </div>
            <button 
              onClick={continueToNext}
              className="w-full bg-[#2087B3] text-white py-4 rounded-xl font-bold text-sm hover:bg-[#1a6b8e] transition-all"
            >
              CONTINUE TO NEXT CHALLENGE
            </button>
          </div>
        </div>
      )}

      {/* Hint Modal */}
      {showHint && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-[#292a2d] max-w-md w-full rounded-xl p-6 shadow-2xl border border-[#3f484e]/20 animate-[scaleIn_0.3s_ease-out]">
            <div className="flex items-center gap-3 mb-4">
              <LightbulbIcon className="w-6 h-6 text-[#57dea0]" />
              <h3 className="font-bold text-xl text-[#e3e2e6]">Strategy Hint</h3>
            </div>
            <p className="text-[#bec8cf] text-sm leading-relaxed mb-6">{currentProblem.hint}</p>
            <button 
              onClick={() => setShowHint(false)}
              className="w-full bg-[#343538] text-[#e3e2e6] py-2 rounded font-bold text-sm hover:bg-[#292a2d] transition-colors"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}

      {/* AI Panel */}
      {showAIPanel && (
        <div className="absolute top-16 right-0 h-[calc(100%-64px)] w-80 bg-[#292a2d] border-l border-[#3f484e]/20 z-50 flex flex-col shadow-2xl animate-[fadeIn_0.2s_ease-in]">
          <div className="p-4 border-b border-[#3f484e]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AutoAwesomeIcon className="text-[#2087B3]" />
              <span className="font-bold text-sm text-[#e3e2e6]">AI Assistant</span>
            </div>
            <button 
              onClick={() => setShowAIPanel(false)}
              className="text-[#899299] hover:text-[#e3e2e6]"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto text-xs space-y-4 no-scrollbar">
            <div className="bg-[#0d0e11] p-3 rounded-lg border border-[#3f484e]/10 text-[#bec8cf]">
              How can I help you solve this? I can explain the logic or give you a push in the right direction.
            </div>
          </div>
          <div className="p-4 bg-[#343538]/50">
            <input 
              className="w-full bg-[#0d0e11] border border-[#3f484e]/20 rounded px-3 py-2 text-xs text-[#e3e2e6] focus:ring-1 focus:ring-[#2087B3] outline-none"
              placeholder="Ask a question..." 
              type="text"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Practice;
