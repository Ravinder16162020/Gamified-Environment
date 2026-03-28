import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, LayoutDashboard, BookOpen, Sword, Trophy, 
  LineChart, Award, Bot, LogOut, ChevronRight, Check, 
  X, Minus, History, HelpCircle, Lightbulb, CheckCircle2, AlertCircle
} from 'lucide-react';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';
import styles from './DailyChallenge.module.css';

// Challenge data
const challengeData = {
  question: "Which greenhouse gas has the highest 100-year global warming potential among these options?",
  topic: "Greenhouse Gases",
  correctAnswer: "B",
  options: [
    { id: "A", text: "Carbon Dioxide (CO2)" },
    { id: "B", text: "Methane (CH4)" },
    { id: "C", text: "Nitrous Oxide (N2O)" },
    { id: "D", text: "Water Vapor" }
  ],
  funFact: "Methane is over 25 times as potent as carbon dioxide at trapping heat in the atmosphere over a 100-year period.",
  wrongFact: "While Carbon Dioxide is more abundant, Methane is significantly more effective at trapping radiation."
};

const recentActivity = [
  { date: "Oct 24", topic: "Recycling", earned: 50, status: "correct" },
  { date: "Oct 23", topic: "Ocean Life", earned: 0, status: "wrong" },
  { date: "Oct 22", topic: "Energy", earned: 0, status: "missed" },
  { date: "Oct 21", topic: "Solar Panels", earned: 50, status: "correct" }
];

const DailyChallenge = () => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [countdown, setCountdown] = useState("00:00:00");
  const [answered, setAnswered] = useState(false);

  // Countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);
      
      const diff = tomorrow - now;
      const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
      
      setCountdown(`${hours}:${minutes}:${seconds}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (choice) => {
    if (answered) return;
    
    setSelectedAnswer(choice);
    setAnswered(true);
    
    const correct = choice === challengeData.correctAnswer;
    setIsCorrect(correct);
    
    // Trigger confetti if correct
    if (correct && window.confetti) {
      window.confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4EA24E', '#FBBF24', '#ffffff']
      });
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "correct":
        return <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center"><Check className="text-[#4EA24E] w-5 h-5" /></div>;
      case "wrong":
        return <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"><X className="text-red-500 w-5 h-5" /></div>;
      case "missed":
        return <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"><Minus className="text-slate-400 w-5 h-5" /></div>;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "correct":
        return <span className="text-xs font-bold text-[#4EA24E]">CORRECT</span>;
      case "wrong":
        return <span className="text-xs font-bold text-red-500">WRONG</span>;
      case "missed":
        return <span className="text-xs font-bold text-slate-400">MISSED</span>;
      default:
        return null;
    }
  };

  const getStatusOpacity = (status) => {
    return status === "missed" ? "opacity-60" : "";
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex overflow-hidden">
      <SidebarEcoDboard />
      
      {/* Main Content */}
      <main className="flex-1 ml-20 overflow-y-auto">
        {/* Header & Breadcrumb */}
        <header className="p-8 pb-0">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <button onClick={() => navigate('/dashboard')} className="hover:text-[#4EA24E] transition-colors">Dashboard</button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">Daily Challenge</span>
          </nav>
          
          {/* Hero Banner */}
          <section className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg shadow-orange-100">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Active</span>
                  <span className="bg-white text-orange-600 px-3 py-1 rounded-full text-xs font-black shadow-sm">+50 ECO-POINTS</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black mb-4">Today's Eco Challenge ⚡</h1>
                <div className="flex gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 min-w-[100px] border border-white/20">
                    <p className="text-[10px] uppercase font-bold opacity-80">Current Streak</p>
                    <p className="text-2xl font-black">12 🔥</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 min-w-[100px] border border-white/20">
                    <p className="text-[10px] uppercase font-bold opacity-80">Longest</p>
                    <p className="text-2xl font-black">24</p>
                  </div>
                  <div className="hidden sm:block bg-white/10 backdrop-blur-md rounded-2xl p-4 min-w-[100px] border border-white/20">
                    <p className="text-[10px] uppercase font-bold opacity-80">This Week</p>
                    <p className="text-2xl font-black">4/7</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-slate-900 shadow-xl min-w-[200px]">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Reset In</p>
                <div className="text-3xl font-mono font-black tabular-nums text-slate-800">{countdown}</div>
              </div>
            </div>
            {/* Decorative Shape */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </section>
        </header>

        <div className="p-8 grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Question Card Section */}
          <section className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-xl">
                    <HelpCircle className="text-[#4EA24E] w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold">Today's Question</h2>
                </div>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">Topic: {challengeData.topic}</span>
              </div>
              
              <p className="text-2xl font-semibold text-slate-800 mb-10 leading-relaxed">
                {challengeData.question}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {challengeData.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option.id)}
                    disabled={answered}
                    className={`p-5 rounded-2xl border-2 text-left transition-all flex items-start gap-4 ${
                      answered && selectedAnswer === option.id
                        ? option.id === challengeData.correctAnswer
                          ? 'border-[#4EA24E] bg-emerald-50'
                          : 'border-red-400 bg-red-50'
                        : answered && option.id === challengeData.correctAnswer
                          ? 'border-[#4EA24E] bg-emerald-50'
                          : 'border-slate-100 bg-slate-50 hover:border-[#4EA24E] hover:bg-emerald-50'
                    } ${answered ? 'cursor-default' : 'hover:-translate-y-1'}`}
                  >
                    <span className={`flex-shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center font-bold transition-colors ${
                      answered && (selectedAnswer === option.id || option.id === challengeData.correctAnswer)
                        ? option.id === challengeData.correctAnswer
                          ? 'bg-[#4EA24E] text-white border-[#4EA24E]'
                          : 'bg-red-500 text-white border-red-500'
                        : 'bg-white border-slate-200'
                    }`}>
                      {option.id}
                    </span>
                    <span className={`font-medium ${
                      answered && selectedAnswer === option.id && option.id !== challengeData.correctAnswer
                        ? 'text-red-600 line-through'
                        : 'text-slate-700'
                    }`}>
                      {option.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Challenges */}
          <section className="space-y-6 h-full">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm h-full flex flex-col">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <History className="w-5 h-5 text-slate-400" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors ${getStatusOpacity(activity.status)}`}
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(activity.status)}
                      <div>
                        <p className="text-sm font-bold">{activity.date} - {activity.topic}</p>
                        <p className="text-xs text-slate-500">
                          {activity.status === "missed" ? "Streak Lost" : `Earned ${activity.earned} pts`}
                        </p>
                      </div>
                    </div>
                    {getStatusText(activity.status)}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Result Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-[40px] p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
              isCorrect ? 'bg-emerald-100 text-[#4EA24E]' : 'bg-red-100 text-red-500'
            }`}>
              {isCorrect ? (
                <CheckCircle2 className="w-16 h-16" />
              ) : (
                <AlertCircle className="w-16 h-16" />
              )}
            </div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black mb-2">
                {isCorrect ? "Exactly Right!" : "Not quite!"}
              </h2>
              <p className="text-slate-600 font-medium">
                {isCorrect 
                  ? "You've earned +50 Eco-Points for today." 
                  : `The correct answer was ${challengeData.options.find(o => o.id === challengeData.correctAnswer)?.text}.`
                }
              </p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 mb-8">
              <div className="flex items-center gap-2 mb-2 text-[#4EA24E]">
                <Lightbulb className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">Fun Eco Fact</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed italic">
                "{isCorrect ? challengeData.funFact : challengeData.wrongFact}"
              </p>
            </div>
            <button 
              onClick={closeModal}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyChallenge;
