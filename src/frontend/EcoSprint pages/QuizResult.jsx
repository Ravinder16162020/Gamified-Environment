import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Zap, LayoutDashboard, BookOpen, Sword, Trophy, 
  LineChart, Award, Bot, LogOut, Check, X, Star
} from 'lucide-react';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';
import styles from './QuizResult.module.css';

// Quiz result data
const resultData = {
  score: 4,
  totalQuestions: 5,
  percentage: 80,
  passed: true,
  timeTaken: '04:12',
  accuracy: '80%',
  pointsEarned: 40,
  currentLevel: 4,
  currentXP: 840,
  xpToNextLevel: 1000,
  xpRemaining: 160,
  userName: 'Alex',
  questions: [
    {
      id: 1,
      text: 'What is the primary source of solar energy?',
      userAnswer: 'The Sun',
      correctAnswer: 'The Sun',
      isCorrect: true,
      explanation: 'Solar energy is radiant light and heat from the Sun that is harnessed using a range of technologies such as solar power to generate electricity.'
    },
    {
      id: 2,
      text: 'Which of these is NOT a renewable resource?',
      userAnswer: 'Biomass',
      correctAnswer: 'Natural Gas',
      isCorrect: false,
      explanation: 'Natural gas is a fossil fuel and is non-renewable. Biomass comes from organic materials and is considered renewable.'
    },
    {
      id: 3,
      text: 'Where is kinetic energy in wind captured?',
      userAnswer: 'Turbine Blades',
      correctAnswer: 'Turbine Blades',
      isCorrect: true,
      explanation: 'Wind turbines use blades to collect the wind\'s kinetic energy.'
    },
    {
      id: 4,
      text: 'Hydroelectric energy mechanics',
      userAnswer: 'Correct',
      correctAnswer: 'Correct',
      isCorrect: true,
      explanation: 'Hydroelectric power converts the energy of flowing water into electricity.'
    },
    {
      id: 5,
      text: 'Geothermal heat sources',
      userAnswer: 'Correct',
      correctAnswer: 'Correct',
      isCorrect: true,
      explanation: 'Geothermal energy is heat derived within the sub-surface of the earth.'
    }
  ]
};

const QuizResult = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const [animatedPoints, setAnimatedPoints] = useState(0);
  const [arcOffset, setArcOffset] = useState(283);

  const progressPercentage = (resultData.currentXP / resultData.xpToNextLevel) * 100;
  const circumference = 2 * Math.PI * 82; // r=82
  const strokeDashoffset = circumference - (resultData.percentage / 100) * circumference;

  // Animate points counter
  useEffect(() => {
    let count = 0;
    const timer = setInterval(() => {
      count += 2;
      setAnimatedPoints(count);
      if (count >= resultData.pointsEarned) {
        clearInterval(timer);
        setAnimatedPoints(resultData.pointsEarned);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  // Animate score arc
  useEffect(() => {
    setTimeout(() => {
      setArcOffset(strokeDashoffset);
    }, 300);
  }, []);

  const handleContinueNextModule = () => {
    navigate('/modules');
  };

  const handleViewProgress = () => {
    navigate('/dashboard');
  };

  const handleReturnDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-hidden">
      <SidebarEcoDboard />
      
      <div className="ml-20 flex flex-col h-screen overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6">
          <div className="w-full mx-auto p-6 md:p-8 space-y-8">
            {/* Hero Section Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Score Hero Card */}
              <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-center gap-10 relative overflow-hidden p-10">
                <div className="absolute top-0 right-0 p-4">
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                    PASSED
                  </span>
                </div>
                
                {/* Circular Progress */}
                <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      className="text-slate-100" 
                      cx="96" 
                      cy="96" 
                      fill="transparent" 
                      r="82" 
                      stroke="currentColor" 
                      strokeWidth="12"
                    />
                    <circle 
                      className="text-[#4EA24E] transition-all duration-[1500ms] ease-in-out"
                      cx="96" 
                      cy="96" 
                      fill="transparent" 
                      r="82" 
                      stroke="currentColor" 
                      strokeWidth="12"
                      strokeLinecap="round"
                      style={{ 
                        strokeDasharray: circumference,
                        strokeDashoffset: arcOffset 
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-slate-800">
                      {resultData.score}/{resultData.totalQuestions}
                    </span>
                    <span className="text-sm font-semibold text-slate-400 uppercase">
                      {resultData.percentage}% Score
                    </span>
                  </div>
                </div>
                
                <div className="text-center md:text-left space-y-4 flex-1">
                  <h2 className="text-3xl font-bold text-slate-800">
                    Great Job, {resultData.userName}! 👋
                  </h2>
                  <p className="text-slate-500 leading-relaxed text-lg">
                    You've successfully mastered the basics of renewable energy. Your understanding of solar and wind power is exceptional!
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                    <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Time Taken</span>
                      <span className="text-xl font-bold text-slate-700">{resultData.timeTaken}</span>
                    </div>
                    <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Accuracy</span>
                      <span className="text-xl font-bold text-slate-700">{resultData.accuracy}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Points Earned Card */}
              <div className="bg-gradient-to-br from-[#4EA24E] to-emerald-600 rounded-3xl p-8 text-white flex flex-col justify-between shadow-lg shadow-emerald-200 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 animate-bounce">
                    <Star className="w-6 h-6 text-white fill-white" />
                  </div>
                  <h3 className="text-lg font-medium opacity-90">Eco-Points Earned</h3>
                  <div className="text-4xl font-bold mt-1">+{animatedPoints} pts</div>
                </div>
                <div className="mt-8 space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Level {resultData.currentLevel}</span>
                    <span>{resultData.currentXP} / {resultData.xpToNextLevel} XP</span>
                  </div>
                  <div className="w-full bg-black/10 rounded-full h-3">
                    <div 
                      className="bg-white rounded-full h-3 transition-all duration-1000" 
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs opacity-75 text-center mt-2">
                    {resultData.xpRemaining} XP to next level
                  </p>
                </div>
              </div>
            </div>

            {/* Answer Review Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800">Review Answers</h3>
                <span className="text-sm font-medium text-slate-500">
                  {resultData.totalQuestions} Questions
                </span>
              </div>
              
              <div className="space-y-4">
                {resultData.questions.map((question) => (
                  <div 
                    key={question.id}
                    className={`bg-white border p-6 rounded-2xl flex flex-col md:flex-row gap-4 ${
                      question.isCorrect ? 'border-slate-100' : 'border-red-100'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      question.isCorrect 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {question.isCorrect ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <X className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-slate-800">{question.text}</h4>
                        <span className={`text-xs font-bold uppercase tracking-wider ${
                          question.isCorrect ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                          {question.isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        Your Answer: 
                        <span className={`font-medium ${
                          question.isCorrect ? '' : 'line-through text-red-500'
                        }`}>
                          {question.userAnswer}
                        </span>
                        {!question.isCorrect && (
                          <>
                            {' • Correct: '}
                            <span className="font-medium text-emerald-600">{question.correctAnswer}</span>
                          </>
                        )}
                      </p>
                      <div className={`mt-3 p-3 bg-slate-50 rounded-lg text-xs text-slate-500 border-l-4 ${
                        question.isCorrect ? 'border-[#4EA24E]' : 'border-red-400'
                      }`}>
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pb-12">
              <button 
                onClick={handleContinueNextModule}
                className="flex-1 bg-[#4EA24E] hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-100 active:scale-95"
              >
                Continue to Next Module
              </button>
              <button 
                onClick={handleViewProgress}
                className="flex-1 bg-white border-2 border-slate-200 hover:border-[#4EA24E] hover:text-[#4EA24E] text-slate-600 font-bold py-4 rounded-2xl transition-all active:scale-95"
              >
                View My Progress
              </button>
              <button 
                onClick={handleReturnDashboard}
                className="md:w-auto px-8 bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-2xl transition-all active:scale-95"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QuizResult;
