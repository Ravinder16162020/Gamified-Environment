import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Zap, FileText, ChevronLeft, ChevronRight, Flag, Grid, 
  HelpCircle, LogOut, LayoutDashboard, BookOpen, Sword, 
  Trophy, LineChart, Award, Bot, Clock
} from 'lucide-react';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';
import styles from './QuizPage.module.css';

// Quiz data
const quizData = {
  title: 'Renewable Energy Quiz',
  totalQuestions: 5,
  points: 40,
  timeLimit: 600, // 10 minutes in seconds
  questions: [
    {
      id: 1,
      text: 'Which of the following is the largest source of renewable electricity in India?',
      options: [
        { id: 'A', text: 'Solar Power' },
        { id: 'B', text: 'Hydropower' },
        { id: 'C', text: 'Wind Energy' },
        { id: 'D', text: 'Biomass' }
      ],
      flagged: false
    },
    {
      id: 2,
      text: 'What is the main advantage of solar energy over fossil fuels?',
      options: [
        { id: 'A', text: 'Lower initial cost' },
        { id: 'B', text: 'No greenhouse gas emissions during operation' },
        { id: 'C', text: 'Works at night without storage' },
        { id: 'D', text: 'Requires less land area' }
      ],
      flagged: false
    },
    {
      id: 3,
      text: 'Which component converts wind energy into electrical energy?',
      options: [
        { id: 'A', text: 'Blades' },
        { id: 'B', text: 'Tower' },
        { id: 'C', text: 'Generator' },
        { id: 'D', text: 'Nacelle' }
      ],
      flagged: false
    },
    {
      id: 4,
      text: 'What is geothermal energy derived from?',
      options: [
        { id: 'A', text: 'Sunlight' },
        { id: 'B', text: 'Earth\'s internal heat' },
        { id: 'C', text: 'Ocean waves' },
        { id: 'D', text: 'Wind currents' }
      ],
      flagged: false
    },
    {
      id: 5,
      text: 'Which renewable energy source has the highest capacity factor?',
      options: [
        { id: 'A', text: 'Solar PV' },
        { id: 'B', text: 'Onshore Wind' },
        { id: 'C', text: 'Hydropower' },
        { id: 'D', text: 'Biomass' }
      ],
      flagged: false
    }
  ]
};

const QuizPage = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(quizData.timeLimit);
  const [attempt, setAttempt] = useState(1);

  const question = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.totalQuestions) * 100;
  const answeredCount = Object.keys(answers).length;

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionId) => {
    setAnswers(prev => ({
      ...prev,
      [question.id]: optionId
    }));
  };

  const handleFlagToggle = () => {
    setFlagged(prev => ({
      ...prev,
      [question.id]: !prev[question.id]
    }));
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleQuestionJump = (index) => {
    setCurrentQuestion(index);
  };

  const handleSubmit = () => {
    // Navigate to quiz results page
    navigate(`/modules/${moduleId}/quiz/result`);
  };

  const handleContinueLearning = () => {
    navigate(`/modules/${moduleId}/learn?mode=continue`);
  };

  const isAnswered = answers[question.id] !== undefined;
  const isFlagged = flagged[question.id] || false;

  return (
    <div className="h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-hidden">
      <SidebarEcoDboard />
      
      <div className="ml-20 flex flex-col h-full overflow-y-auto">
        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-8 relative">
          {/* Quiz Header Card */}
          <div className="w-full mx-auto mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#4EA24E]/10 rounded-xl flex items-center justify-center text-[#4EA24E]">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">{quizData.title}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full uppercase tracking-wider">
                      Attempt {attempt}
                    </span>
                    <span className="text-slate-400 text-sm">•</span>
                    <span className="text-[#4EA24E] font-bold text-sm">+{quizData.points} pts stake</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-sm font-medium text-slate-500">
                  Question <span className="text-slate-800">{currentQuestion + 1}</span> of {quizData.totalQuestions}
                </span>
                <div className="w-48 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#4EA24E] rounded-full transition-all duration-500" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Two-Column Layout */}
          <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Question Card (Left) */}
            <section className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Question {String(currentQuestion + 1).padStart(2, '0')}
                  </span>
                  <button 
                    onClick={handleFlagToggle}
                    className={`flex items-center gap-2 text-sm transition-colors ${
                      isFlagged ? 'text-amber-600' : 'text-slate-500 hover:text-amber-600'
                    }`}
                  >
                    <Flag className={`w-4 h-4 ${isFlagged ? 'fill-amber-600' : ''}`} />
                    <span>{isFlagged ? 'Flagged' : 'Flag for Review'}</span>
                  </button>
                </div>
                
                <h2 className="text-lg md:text-xl font-semibold text-slate-800 leading-relaxed mb-8">
                  {question.text}
                </h2>
                
                <div className="space-y-4">
                  {question.options.map((option) => {
                    const isSelected = answers[question.id] === option.id;
                    return (
                      <label 
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id)}
                        className={`block cursor-pointer group transition-all duration-200 border-2 rounded-xl p-4 flex items-center gap-4 hover:shadow-md ${
                          isSelected 
                            ? 'border-[#4EA24E] bg-[#4EA24E] text-white shadow-md' 
                            : 'border-slate-100 hover:border-[#4EA24E]/50 text-slate-700'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name={`q${question.id}`} 
                          value={option.id}
                          checked={isSelected}
                          onChange={() => handleOptionSelect(option.id)}
                          className="hidden"
                        />
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-colors ${
                          isSelected 
                            ? 'bg-white/20 text-white' 
                            : 'border-2 border-slate-200 text-slate-500 group-hover:border-[#4EA24E]/50'
                        }`}>
                          {option.id}
                        </div>
                        <span className={`font-medium ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                          {option.text}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between">
                <button 
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>
                <button 
                  onClick={handleNext}
                  disabled={currentQuestion === quizData.totalQuestions - 1}
                  className="flex items-center gap-2 px-8 py-3 bg-[#4EA24E] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#4EA24E]/20 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Next Question
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </section>

            {/* Right Sidebar (Overview) */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Grid className="w-4 h-4 text-[#4EA24E]" />
                  QUESTION OVERVIEW
                </h3>
                
                <div className="grid grid-cols-5 gap-3 mb-8">
                  {quizData.questions.map((q, index) => {
                    const isAnswered = answers[q.id] !== undefined;
                    const isFlagged = flagged[q.id];
                    const isCurrent = index === currentQuestion;
                    
                    return (
                      <button
                        key={q.id}
                        onClick={() => handleQuestionJump(index)}
                        className={`w-full aspect-square flex items-center justify-center rounded-lg font-bold text-sm transition-all ${
                          isCurrent 
                            ? 'bg-[#4EA24E] text-white shadow-sm ring-2 ring-[#4EA24E] ring-offset-2' 
                            : isAnswered 
                              ? 'bg-[#4EA24E]/20 text-[#4EA24E] border-2 border-[#4EA24E]' 
                              : isFlagged 
                                ? 'bg-amber-100 text-amber-600 border-2 border-amber-300' 
                                : 'border-2 border-slate-100 text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
                
                <div className="space-y-3 pt-6 border-t border-slate-50">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                    <span>Time Remaining</span>
                    <span className={`font-bold ${timeRemaining < 60 ? 'text-[#D23B42]' : 'text-[#D23B42]'}`}>
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#D23B42] rounded-full transition-all duration-1000"
                      style={{ width: `${(timeRemaining / quizData.timeLimit) * 100}%` }}
                    />
                  </div>
                </div>
                
                <button 
                  onClick={handleSubmit}
                  disabled={answeredCount < quizData.totalQuestions}
                  className={`w-full mt-8 py-4 font-bold rounded-xl transition-all ${
                    answeredCount < quizData.totalQuestions 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                      : 'bg-[#4EA24E] text-white hover:shadow-lg hover:shadow-[#4EA24E]/20'
                  }`}
                >
                  Submit Quiz
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-3 italic">
                  {answeredCount < quizData.totalQuestions 
                    ? `Answer all questions to submit (${answeredCount}/${quizData.totalQuestions} answered)` 
                    : 'All questions answered - ready to submit'}
                </p>
              </div>

              {/* Help Card */}
              <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-2 rounded-lg text-amber-500">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">Need Help?</p>
                    <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                      Stuck on a question? Ask <b>EcoBot</b> for a hint! (Cost: 5 pts)
                    </p>
                    <button className="mt-3 text-xs font-bold text-amber-600 hover:text-amber-800">
                      ASK ECOBOT →
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QuizPage;
