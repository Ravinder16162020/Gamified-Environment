import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronLeft, ChevronRight, Clock, CheckCircle2, PlayCircle, Star, MoreHorizontal, Check, X, RefreshCw, FileText, Award, ArrowRight } from 'lucide-react';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';
import styles from './ClimateChangeLesson.module.css';

const lessonSteps = [
  { id: 1, title: 'Introduction', duration: '5 min', completed: true, current: false },
  { id: 2, title: 'Greenhouse Effect', duration: '8 min', completed: true, current: false },
  { id: 3, title: 'Global Warming', duration: '10 min', completed: false, current: true },
  { id: 4, title: 'Carbon Cycle', duration: '12 min', completed: false, current: false },
  { id: 5, title: 'Human Impact', duration: '10 min', completed: false, current: false },
  { id: 6, title: 'Quiz', duration: '5 min', completed: false, current: false }
];

const quizQuestion = {
  question: "Which gas is most responsible for the greenhouse effect?",
  options: [
    { id: 'a', text: "Oxygen (O₂)", correct: false },
    { id: 'b', text: "Carbon Dioxide (CO₂)", correct: true },
    { id: 'c', text: "Nitrogen (N₂)", correct: false },
    { id: 'd', text: "Hydrogen (H₂)", correct: false }
  ]
};

const achievements = [
  { icon: <CheckCircle2 className="w-5 h-5 text-green-600" />, text: '2 of 6 lessons completed', completed: true },
  { icon: <Clock className="w-5 h-5 text-blue-600" />, text: '23 minutes learning', completed: true },
  { icon: <Award className="w-5 h-5 text-amber-500" />, text: '200 XP points available', completed: false }
];

const ClimateChangeLesson = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  
  const completedCount = lessonSteps.filter(l => l.completed).length;
  const progressPercent = (completedCount / lessonSteps.length) * 100;
  const currentStepIndex = lessonSteps.findIndex(l => l.current);

  const handleOptionSelect = (optionId) => {
    if (showResult) return;
    setSelectedOption(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    const correct = selectedOption === 'b';
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      // Navigate to previous lesson
      console.log('Previous lesson');
    }
  };

  const handleNext = () => {
    if (currentStepIndex < lessonSteps.length - 1) {
      // Navigate to next lesson
      console.log('Next lesson');
    }
  };

  return (
    <div className="h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-hidden">
      <SidebarEcoDboard />
      
      <main className="ml-20 h-full flex flex-col">
        {/* Lesson Navigation Bar */}
        <div className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/modules/climate-change')}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Global Temperature Rise</h1>
              <p className="text-xs text-slate-500">Lesson 3 of 6 • 10 minutes</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Progress Bar */}
            <div className="hidden md:flex items-center gap-3 w-64">
              <span className="text-sm font-medium text-slate-600">{progressPercent}%</span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#4EA24E] rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button 
                onClick={handleNext}
                className="px-4 py-2 bg-[#4EA24E] text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Content */}
          <div className={`flex-1 overflow-y-auto p-6 ${sidebarExpanded ? 'mr-0' : ''}`}>
            <div className="max-w-3xl mx-auto space-y-6 pb-8">
              {/* Introduction Card */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shrink-0">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Understanding Global Temperature Rise</h2>
                    <p className="text-slate-600 leading-relaxed">
                      Earth's average temperature has increased by approximately 1.1°C since the late 1800s. 
                      Most of this warming has occurred in the past 40 years. In this lesson, we'll explore 
                      the causes and consequences of global temperature rise.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Concepts */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#4EA24E]" /> Key Concepts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <h4 className="font-semibold text-slate-900 mb-2">🌡️ Temperature Anomalies</h4>
                    <p className="text-sm text-slate-600">
                      Scientists track temperature changes using anomalies - the difference from long-term averages. 
                      This helps identify warming trends more clearly.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <h4 className="font-semibold text-slate-900 mb-2">📈 Accelerating Trends</h4>
                    <p className="text-sm text-slate-600">
                      The rate of warming has doubled since 1980. The last decade was the warmest on record, 
                      with each decade progressively hotter.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <h4 className="font-semibold text-slate-900 mb-2">🧊 Feedback Loops</h4>
                    <p className="text-sm text-slate-600">
                      Melting ice reduces Earth's reflectivity, causing more heat absorption. 
                      This creates a self-reinforcing warming cycle.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <h4 className="font-semibold text-slate-900 mb-2">🌊 Ocean Heat</h4>
                    <p className="text-sm text-slate-600">
                      Over 90% of excess heat is absorbed by oceans. This affects marine life, 
                      weather patterns, and contributes to sea-level rise.
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Quiz */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-[#4EA24E]" /> Quick Check
                  </h3>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    +20 XP
                  </span>
                </div>
                
                <p className="text-slate-700 mb-4 font-medium">{quizQuestion.question}</p>
                
                <div className="space-y-3 mb-4">
                  {quizQuestion.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      disabled={showResult}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                        selectedOption === option.id
                          ? showResult
                            ? option.correct
                              ? 'border-green-500 bg-green-50'
                              : 'border-red-500 bg-red-50'
                            : 'border-[#4EA24E] bg-[#F0F9F0]'
                          : showResult && option.correct
                            ? 'border-green-500 bg-green-50'
                            : 'border-slate-200 hover:border-slate-300'
                      } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                        selectedOption === option.id
                          ? showResult
                            ? option.correct
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                            : 'bg-[#4EA24E] text-white'
                          : showResult && option.correct
                            ? 'bg-green-500 text-white'
                            : 'bg-slate-100 text-slate-600'
                      }`}>
                        {option.id.toUpperCase()}
                      </span>
                      <span className="flex-1">{option.text}</span>
                      {showResult && option.correct && (
                        <Check className="w-5 h-5 text-green-600" />
                      )}
                      {showResult && selectedOption === option.id && !option.correct && (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                    </button>
                  ))}
                </div>
                
                {!showResult ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!selectedOption}
                    className="w-full py-3 bg-[#4EA24E] text-white font-bold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Check Answer
                  </button>
                ) : (
                  <div className={`p-4 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span className="font-bold text-green-800">Correct! Well done!</span>
                        </>
                      ) : (
                        <>
                          <X className="w-5 h-5 text-red-500" />
                          <span className="font-bold text-red-800">Not quite right</span>
                        </>
                      )}
                    </div>
                    <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {isCorrect 
                        ? "Carbon Dioxide is indeed the primary greenhouse gas driving global warming, though methane and water vapor also play significant roles."
                        : "The correct answer is Carbon Dioxide (CO₂). While all these gases exist in the atmosphere, CO₂ is the primary driver of the greenhouse effect and global warming."
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* Data Visualization Placeholder */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Global Temperature Trends</h3>
                <div className="bg-slate-50 rounded-xl p-8 text-center">
                  <div className="text-5xl font-bold text-[#4EA24E] mb-2">+1.1°C</div>
                  <p className="text-slate-600 mb-4">Average global temperature increase since 1880</p>
                  <div className="flex justify-center gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-800">2023</div>
                      <div className="text-slate-500">Hottest Year</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-800">10</div>
                      <div className="text-slate-500">Hottest Years (since 2010)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-800">2x</div>
                      <div className="text-slate-500">Rate increase since 1980</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className={`bg-white border-l border-slate-200 overflow-y-auto transition-all duration-300 ${sidebarExpanded ? 'w-80' : 'w-0 lg:w-80'}`}>
            <div className="p-6 space-y-6 w-80">
              {/* Module Progress */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-slate-900">Module Progress</h3>
                  <span className="text-sm text-[#4EA24E] font-medium">{completedCount}/6</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-[#4EA24E] rounded-full" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              {/* Lesson Steps */}
              <div>
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#4EA24E]" /> Lessons
                </h3>
                <div className="space-y-2">
                  {lessonSteps.map((step) => (
                    <div 
                      key={step.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                        step.current 
                          ? 'border-[#4EA24E] bg-[#F0F9F0]' 
                          : step.completed 
                            ? 'border-slate-200 bg-white' 
                            : 'border-slate-100 bg-slate-50 opacity-60'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        step.completed 
                          ? 'bg-green-100 text-green-600' 
                          : step.current 
                            ? 'bg-[#4EA24E] text-white' 
                            : 'bg-slate-200 text-slate-400'
                      }`}>
                        {step.completed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <span className="text-xs font-bold">{step.id}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${step.current ? 'text-[#4EA24E]' : 'text-slate-900'}`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-slate-500">{step.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-slate-50 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#4EA24E]" /> Achievements
                </h3>
                <div className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {achievement.icon}
                      <span className={achievement.completed ? 'text-slate-900' : 'text-slate-500'}>
                        {achievement.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <button className="w-full py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm">
                  <RefreshCw className="w-4 h-4" /> Restart Lesson
                </button>
                <button 
                  onClick={() => navigate('/modules/climate-change')}
                  className="w-full py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <FileText className="w-4 h-4" /> Module Overview
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClimateChangeLesson;
