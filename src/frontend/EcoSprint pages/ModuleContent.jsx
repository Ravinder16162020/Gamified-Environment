import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  Zap, Bell, ChevronLeft, ChevronRight, List, Check, Wind, Droplets, 
  Lightbulb, Bot, Send, Play, Flame, LogOut, LayoutDashboard, 
  BookOpen, Sword, Trophy, LineChart, Award, Bot as BotIcon, User
} from 'lucide-react';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';
import styles from './ModuleContent.module.css';

// Module data structure
const moduleData = {
  id: 'renewable-energy',
  title: 'Renewable Energy',
  chapter: 2,
  totalChapters: 5,
  lessons: [
    { id: 1, title: 'Intro to Energy', duration: '5 mins', completed: true, locked: false },
    { id: 2, title: 'Solar Power Basics', duration: '12 mins', completed: true, locked: false },
    { id: 3, title: 'Solar Technologies', duration: '15 mins', completed: true, locked: false },
    { id: 4, title: 'Wind & Hydro Power', duration: '18 mins', completed: false, locked: false, current: true },
    { id: 5, title: 'Geothermal Energy', duration: '8 mins', completed: false, locked: true },
    { id: 6, title: 'Chapter Quiz', duration: '20 mins', completed: false, locked: true, isQuiz: true }
  ],
  overallProgress: 72
};

const quizQuestion = {
  question: 'Which component in a wind turbine is responsible for converting mechanical energy into electrical energy?',
  options: [
    { id: 'a', text: 'The Aerodynamic Blades', checked: false },
    { id: 'b', text: 'The Gearbox', checked: false },
    { id: 'c', text: 'The Generator', checked: true, isCorrect: true },
    { id: 'd', text: 'The Anemometer', checked: false }
  ]
};

const botMessages = [
  { type: 'bot', text: "Hi! I'm EcoBot. Do you have any questions about Wind or Hydro power?" },
  { type: 'user', text: 'How does a hydro dam work exactly?' },
  { type: 'bot', text: 'Great question! Water stored in a reservoir flows through a pipe called a penstock. The force of the moving water turns turbine blades, which are connected to a generator above!' }
];

const ModuleContent = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const location = useLocation();
  
  // Get resume lesson from query param or default to current lesson
  const queryParams = new URLSearchParams(location.search);
  const resumeLessonId = parseInt(queryParams.get('resume')) || null;
  
  // State for lessons to track completion and locking dynamically
  const [lessons, setLessons] = useState(moduleData.lessons);
  const [activeLessonId, setActiveLessonId] = useState(resumeLessonId || 4);
  const [selectedOption, setSelectedOption] = useState('c');
  const [activeTab, setActiveTab] = useState('notes');
  const [notes, setNotes] = useState("- Wind energy is kinetic\n- Offshore is more efficient\n- Hydro uses gravitational potential energy");
  const [botInput, setBotInput] = useState('');
  const [messages, setMessages] = useState(botMessages);
  const [parallaxStyle, setParallaxStyle] = useState({});

  // Determine which lesson to show based on entry mode
  useEffect(() => {
    const entryMode = queryParams.get('mode');
    
    if (entryMode === 'start') {
      // Start from Lesson 1
      setActiveLessonId(1);
    } else if (entryMode === 'review') {
      // Review mode - start from Lesson 1, all unlocked
      setActiveLessonId(1);
    } else if (entryMode === 'continue' || !entryMode) {
      // Continue from last incomplete lesson
      const lastIncomplete = lessons.find(l => !l.completed && !l.locked)?.id || 1;
      setActiveLessonId(lastIncomplete);
    }
  }, [location.search, lessons]);

  const activeLesson = lessons.find(l => l.id === activeLessonId) || lessons[0];

  const handleLessonClick = (lessonId) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson.locked) {
      alert('Complete previous modules to unlock this one');
      return;
    }
    // If it's a quiz, navigate to the quiz page
    if (lesson.isQuiz) {
      navigate(`/modules/${moduleId}/quiz`);
      return;
    }
    setActiveLessonId(lessonId);
  };

  const handlePrevious = () => {
    const prevLesson = lessons.find(l => l.id === activeLessonId - 1);
    if (prevLesson && !prevLesson.locked) {
      setActiveLessonId(prevLesson.id);
    }
  };

  const handleNext = () => {
    const currentLesson = lessons.find(l => l.id === activeLessonId);
    const nextLesson = lessons.find(l => l.id === activeLessonId + 1);
    
    if (nextLesson) {
      if (nextLesson.locked) {
        alert('Complete previous modules to unlock this one');
        return;
      }
      if (nextLesson.isQuiz) {
        // Navigate to quiz page
        navigate(`/modules/${moduleId}/quiz`);
        return;
      }
      // Mark current lesson as completed and unlock next
      setLessons(prev => prev.map(l => {
        if (l.id === currentLesson.id) return { ...l, completed: true };
        if (l.id === nextLesson.id) return { ...l, locked: false };
        return l;
      }));
      setActiveLessonId(nextLesson.id);
    }
  };

  const handleMarkComplete = () => {
    const currentLesson = lessons.find(l => l.id === activeLessonId);
    const nextLesson = lessons.find(l => l.id === activeLessonId + 1);
    
    if (nextLesson?.isQuiz) {
      // Mark current complete and unlock quiz
      setLessons(prev => prev.map(l => {
        if (l.id === currentLesson.id) return { ...l, completed: true };
        if (l.id === nextLesson.id) return { ...l, locked: false };
        return l;
      }));
      navigate(`/modules/${moduleId}/quiz`);
    } else if (nextLesson) {
      // Mark current complete, unlock next, and move to it
      setLessons(prev => prev.map(l => {
        if (l.id === currentLesson.id) return { ...l, completed: true };
        if (l.id === nextLesson.id) return { ...l, locked: false };
        return l;
      }));
      setActiveLessonId(nextLesson.id);
    } else {
      // Module complete
      setLessons(prev => prev.map(l => 
        l.id === currentLesson.id ? { ...l, completed: true } : l
      ));
      navigate('/modules');
    }
  };

  const handleParallaxMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    setParallaxStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    });
  };

  const handleParallaxLeave = () => {
    setParallaxStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    });
  };

  const handleSendMessage = () => {
    if (!botInput.trim()) return;
    setMessages([...messages, { type: 'user', text: botInput }]);
    setBotInput('');
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'Great question! Wind turbines convert kinetic energy from wind into mechanical energy, then into electrical energy through the generator.' 
      }]);
    }, 1000);
  };

  return (
    <div className="h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-hidden">
      <SidebarEcoDboard />
      
      <div className="ml-20 flex flex-col h-full">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-800">Module: {moduleData.title}</h1>
            <span className="text-sm px-3 py-1 bg-gray-100 text-gray-500 rounded-full font-medium">
              Chapter {activeLessonId} of {moduleData.totalChapters}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full border border-orange-100">
              <Flame className="w-4 h-4 fill-orange-500" />
              <span className="text-sm font-bold">7 Day Streak</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-400 hover:text-[#4EA24E] transition-colors relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-[#4EA24E] overflow-hidden">
                <img 
                  alt="User Avatar" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-M7lZdRMzOfuhEybQP-nXdiBs0mtOa7USnnnz5NE2cFaoBj1Vz1agQmyUBqzV4SkokXeiQfFWUQx9rdn7z1W34S7Y98baG8t10uA9b4w4nLgMekoxk6k1x0OjxzqU4NkZoqW_2_3cP1wFshA6gV3TR2TrdDGOumT_EYAtEvq1yCpe6ZSrH-Dj9gG7nkcJRGpIvKIoKxtI71ublGLoX7aQcWiZuzNYZEw9BDtwiRk_nNeQwQz3SfA92TT0D6CABK7X4lYy-HGQuA"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex overflow-hidden">
          {/* Left Panel - Lesson List */}
          <section className="w-72 border-r border-gray-200 bg-white flex flex-col shrink-0">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-800 flex items-center gap-2">
                <List className="w-4 h-4 text-[#4EA24E]" />
                Course Content
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {lessons.map((lesson) => (
                <div 
                  key={lesson.id}
                  onClick={() => handleLessonClick(lesson.id)}
                  className={`p-4 border-b border-gray-50 cursor-pointer transition-all ${
                    lesson.id === activeLessonId 
                      ? 'bg-[#E8F5E9]/30 border-l-4 border-l-[#4EA24E] relative' 
                      : lesson.locked 
                        ? 'opacity-60 hover:bg-gray-50' 
                        : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                      lesson.completed 
                        ? 'bg-[#4EA24E] text-white' 
                        : lesson.id === activeLessonId 
                          ? 'border-2 border-[#4EA24E] text-[#4EA24E] bg-white' 
                          : lesson.locked 
                            ? 'border-2 border-gray-300 text-gray-400' 
                            : 'border-2 border-gray-300 text-gray-400'
                    }`}>
                      {lesson.completed ? <Check className="w-3.5 h-3.5" /> : lesson.id}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold transition-colors ${
                        lesson.id === activeLessonId ? 'text-[#4EA24E]' : 'text-gray-800'
                      }`}>
                        {lesson.id}. {lesson.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {lesson.duration} • {lesson.completed ? 'Completed' : lesson.locked ? 'Locked' : lesson.id === activeLessonId ? 'Currently Reading' : 'Available'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Center Content - Reading Area */}
          <section className="flex-1 overflow-y-auto bg-white p-10 flex justify-center">
            <article className="max-w-3xl w-full">
              {/* Parallax Hero Card */}
              <div 
                className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl mb-10 cursor-pointer"
                style={parallaxStyle}
                onMouseMove={handleParallaxMove}
                onMouseLeave={handleParallaxLeave}
              >
                <img 
                  alt="Wind Turbines" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdjf1Hci-a8cuU_nGlvsaHYNcgJxXgAqvkD6q0WXSowrH037i7VtFEjL3yzatL-prQhJep4jEqB3tykLaPQmqMi77D1NaeDzPg0tGEOr-mm_-PDvvpW5-YjPdhzJEsy94_jPioFONDc8iN2kOuRZmmCQdNEyQzd3jRAxWls2DZPq_QZtddIFBCFBF_K7oSVMTQZVURNMEzlDfhQxhgsvFWHoLDAtq6d_l1NWtUVVnqgQhLIUZH7jfuHonwM2S4jOBmXt66iMxe9A"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Capturing the Elements</h2>
                  <p className="text-white/80 max-w-lg">
                    Learn how the movement of wind and water can power entire cities through kinetic energy conversion.
                  </p>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-white/30 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
              </div>

              {/* Lesson Content */}
              <div className="prose prose-lg max-w-none">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">{activeLesson.title}</h1>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Wind and water are two of the most powerful natural forces on Earth. For centuries, humans have harnessed this energy—from windmills grinding grain to waterwheels powering early textile mills. Today, we use sophisticated turbines to generate electricity at a massive scale.
                </p>

                {/* Energy Types Grid */}
                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="p-5 bg-[#E8F5E9]/30 rounded-2xl border border-[#E8F5E9]">
                    <div className="w-10 h-10 bg-[#4EA24E]/10 rounded-lg flex items-center justify-center text-[#4EA24E] mb-3">
                      <Wind className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1">Wind Energy</h3>
                    <p className="text-sm text-gray-600">
                      Kinetic energy from wind turns turbine blades, spinning a generator to create electricity.
                    </p>
                  </div>
                  <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-600 mb-3">
                      <Droplets className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1">Hydro Power</h3>
                    <p className="text-sm text-gray-600">
                      Falling or flowing water spins turbines in dams or tidal systems to generate clean power.
                    </p>
                  </div>
                </div>

                {/* Key Fact Box */}
                <div className="bg-gray-900 text-white p-8 rounded-3xl mb-10 relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="text-[#4EA24E] font-bold uppercase tracking-widest text-xs mb-2">Key Fact</h4>
                    <p className="text-xl font-medium leading-snug">
                      A single modern offshore wind turbine can generate enough electricity to power roughly 
                      <span className="text-[#4EA24E]"> 8,000 homes</span> for a year.
                    </p>
                  </div>
                </div>

                {/* Interactive MCQ */}
                <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">KNOWLEDGE CHECK</span>
                    <span className="text-gray-400 text-sm italic">+50 XP Potential</span>
                  </div>
                  <p className="text-lg font-bold text-gray-800 mb-6">{quizQuestion.question}</p>
                  <div className="space-y-3">
                    {quizQuestion.options.map((option) => (
                      <label 
                        key={option.id}
                        className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                          selectedOption === option.id 
                            ? 'border-[#4EA24E] bg-[#E8F5E9]/20' 
                            : 'border-gray-200 hover:border-[#4EA24E] hover:bg-[#E8F5E9]/10'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="quiz" 
                          className="w-5 h-5 text-[#4EA24E] focus:ring-[#4EA24E]"
                          checked={selectedOption === option.id}
                          onChange={() => setSelectedOption(option.id)}
                        />
                        <span className="ml-4 font-medium text-gray-700">{option.text}</span>
                      </label>
                    ))}
                  </div>
                  <button className="mt-6 w-full py-3 bg-[#4EA24E] text-white font-bold rounded-xl hover:bg-green-700 transition-colors">
                    Check Answer
                  </button>
                </div>
              </div>
            </article>
          </section>

          {/* Right Panel - Tabs */}
          <section className="w-80 border-l border-gray-200 bg-gray-50 flex flex-col shrink-0">
            {/* Tabs Header */}
            <div className="flex border-b border-gray-200 bg-white">
              <button 
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-4 text-sm font-bold transition-colors ${
                  activeTab === 'notes' 
                    ? 'border-b-2 border-[#4EA24E] text-[#4EA24E]' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Notes
              </button>
              <button 
                onClick={() => setActiveTab('bot')}
                className={`flex-1 py-4 text-sm font-bold transition-colors ${
                  activeTab === 'bot' 
                    ? 'border-b-2 border-[#4EA24E] text-[#4EA24E]' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                EcoBot
              </button>
            </div>

            {/* Notes Panel */}
            {activeTab === 'notes' && (
              <div className="flex-1 flex flex-col p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">Scratchpad</span>
                  <button className="text-xs text-[#4EA24E] font-bold hover:underline">Save Draft</button>
                </div>
                <textarea 
                  className="flex-1 w-full p-4 rounded-2xl border-none focus:ring-2 focus:ring-[#4EA24E] bg-white shadow-sm resize-none text-sm leading-relaxed"
                  placeholder="Type your notes here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <div className="mt-4 p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-3">
                  <div className="p-2 bg-[#E8F5E9] rounded-lg text-[#4EA24E]">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-gray-600">Notes are automatically saved to your study guide.</p>
                </div>
              </div>
            )}

            {/* EcoBot Panel */}
            {activeTab === 'bot' && (
              <div className="flex-1 flex flex-col p-4">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-2 ${msg.type === 'user' ? 'justify-end' : ''}`}>
                      {msg.type === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-[#4EA24E] flex items-center justify-center shrink-0">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div className={`p-3 rounded-2xl shadow-sm text-sm max-w-[80%] ${
                        msg.type === 'user' 
                          ? 'bg-[#4EA24E] text-white rounded-tr-none' 
                          : 'bg-white border border-gray-100 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative">
                  <input 
                    type="text"
                    className="w-full pl-4 pr-10 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#4EA24E] focus:border-transparent text-sm"
                    placeholder="Ask EcoBot..."
                    value={botInput}
                    onChange={(e) => setBotInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="absolute right-2 top-1.5 p-1.5 bg-[#4EA24E] text-white rounded-full"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </section>
        </main>

        {/* Bottom Navigation Bar */}
        <footer className="h-20 bg-white border-t border-gray-200 flex items-center justify-between px-8 z-10 shrink-0">
          <div className="flex gap-4">
            <button 
              onClick={handlePrevious}
              disabled={activeLessonId <= 1}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="flex justify-between text-xs font-bold text-gray-400 uppercase mb-2">
              <span>Overall Module Progress</span>
              <span>{moduleData.overallProgress}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full">
              <div 
                className="bg-[#4EA24E] h-full rounded-full relative transition-all duration-500" 
                style={{ width: `${moduleData.overallProgress}%` }}
              >
                <div className="absolute -right-1 -top-1 w-4 h-4 bg-white border-2 border-[#4EA24E] rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={handleMarkComplete}
              className="px-5 py-2.5 border border-[#4EA24E] text-[#4EA24E] rounded-xl font-bold hover:bg-[#E8F5E9] transition-colors"
            >
              Mark as Complete
            </button>
            <button 
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-2.5 bg-[#4EA24E] text-white rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-[#4EA24E]/20 transition-all"
            >
              Next Lesson
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ModuleContent;
