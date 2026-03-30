import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  FileText, ChevronLeft, ChevronRight, Flag, Grid, 
  HelpCircle
} from 'lucide-react';
import SidebarEcoDboard from '../../components/Sidebar/SidebarEcoDboard';
import SubmitQuiz from '../../popup/SubmitQuiz';
import ModuleCompletepopup from '../../popup/ModuleCompletepopup';
import LevelUppopup from '../../popup/LevelUppopup';
import QuizBadgeEarnedpopup from '../../popup/QuizBadgeEarnedpopup';
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
  const { moduleId } = useParams();
  // eslint-disable-next-line no-unused-vars
  const _moduleId = moduleId;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(quizData.timeLimit);
  const [attempt] = useState(1);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [showModuleCompletePopup, setShowModuleCompletePopup] = useState(false);
  const [showLevelUpPopup, setShowLevelUpPopup] = useState(false);
  const [showBadgeEarnedPopup, setShowBadgeEarnedPopup] = useState(false);

  const handleSubmitClick = () => {
    // Show submit confirmation popup instead of direct navigation
    setShowSubmitPopup(true);
  };

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitClick();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleSubmitNow = () => {
    // Close submit popup and show module complete popup
    setShowSubmitPopup(false);
    setShowModuleCompletePopup(true);
  };

  const handleModuleCompleteContinue = () => {
    // Close module complete popup and show level up popup
    setShowModuleCompletePopup(false);
    setShowLevelUpPopup(true);
  };

  const handleLevelUpContinue = () => {
    // Close level up popup and show badge earned popup
    setShowLevelUpPopup(false);
    setShowBadgeEarnedPopup(true);
  };

  const question = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.totalQuestions) * 100;
  const answeredCount = Object.keys(answers).length;

  const isFlagged = flagged[question.id] || false;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;

  return (
    <>
      {showSubmitPopup && (
        <SubmitQuiz 
          onClose={() => setShowSubmitPopup(false)}
          onSubmitNow={handleSubmitNow}
          moduleId={moduleId}
          answeredCount={answeredCount}
          totalQuestions={quizData.totalQuestions}
          flaggedCount={flaggedCount}
        />
      )}
      {showModuleCompletePopup && (
        <ModuleCompletepopup 
          onClose={() => setShowModuleCompletePopup(false)}
          onContinue={handleModuleCompleteContinue}
          moduleName={quizData.title}
          score={80}
          attempt={attempt}
          ecoPoints={quizData.points}
        />
      )}
      {showLevelUpPopup && (
        <LevelUppopup 
          onClose={() => setShowLevelUpPopup(false)}
          onContinue={handleLevelUpContinue}
          level={5}
          levelName="Climate Guardian"
          progress={100}
        />
      )}
      {showBadgeEarnedPopup && (
        <QuizBadgeEarnedpopup 
          onClose={() => setShowBadgeEarnedPopup(false)}
          badgeName="Pattern Pioneer"
          badgeDescription="You've successfully identified complex environmental patterns in 5 consecutive modules."
          earnedBadges={7}
          totalBadges={20}
        />
      )}
      <div className={`${styles.quizContainer} ${showSubmitPopup || showModuleCompletePopup || showLevelUpPopup || showBadgeEarnedPopup ? styles.dimmed : ''}`}>
        <SidebarEcoDboard />
      
      <div className={styles.mainWrapper}>
        {/* Main Content Area */}
        <main className={styles.mainContent}>
          {/* Quiz Header Card */}
          <div className={styles.headerCard}>
            <div className={styles.headerCardInner}>
              <div className={styles.headerLeft}>
                <div className={styles.headerIcon}>
                  <FileText />
                </div>
                <div>
                  <h1 className={styles.headerTitle}>{quizData.title}</h1>
                  <div className={styles.headerMeta}>
                    <span className={styles.attemptBadge}>
                      Attempt {attempt}
                    </span>
                    <span className={styles.metaDivider}>•</span>
                    <span className={styles.pointsStake}>+{quizData.points} pts stake</span>
                  </div>
                </div>
              </div>
              <div className={styles.headerRight}>
                <span className={styles.questionCounter}>
                  Question <span className={styles.questionNumber}>{currentQuestion + 1}</span> of {quizData.totalQuestions}
                </span>
                <div className={styles.progressBarContainer}>
                  <div 
                    className={styles.progressBar}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Two-Column Layout */}
          <div className={styles.contentGrid}>
            {/* Question Card (Left) */}
            <section className={styles.leftColumn}>
              <div className={styles.questionCard}>
                <div className={styles.questionHeader}>
                  <span className={styles.questionNumberLabel}>
                    Question {String(currentQuestion + 1).padStart(2, '0')}
                  </span>
                  <button 
                    onClick={handleFlagToggle}
                    className={`${styles.flagButton} ${isFlagged ? styles.flagged : ''}`}
                  >
                    <Flag className={isFlagged ? styles.flagged : ''} />
                    <span>{isFlagged ? 'Flagged' : 'Flag for Review'}</span>
                  </button>
                </div>
                
                <h2 className={styles.questionText}>
                  {question.text}
                </h2>
                
                <div className={styles.optionsList}>
                  {question.options.map((option) => {
                    const isSelected = answers[question.id] === option.id;
                    return (
                      <label 
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id)}
                        className={`${styles.optionLabel} ${isSelected ? styles.selected : ''}`}
                      >
                        <input 
                          type="radio" 
                          name={`q${question.id}`} 
                          value={option.id}
                          checked={isSelected}
                          onChange={() => handleOptionSelect(option.id)}
                          className={styles.optionInput}
                        />
                        <div className={`${styles.optionLetter} ${isSelected ? styles.selected : ''}`}>
                          {option.id}
                        </div>
                        <span className={`${styles.optionText} ${isSelected ? styles.selected : ''}`}>
                          {option.text}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className={styles.navigationButtons}>
                <button 
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={`${styles.navButton} ${styles.prevButton}`}
                >
                  <ChevronLeft />
                  Previous
                </button>
                <button 
                  onClick={handleNext}
                  disabled={currentQuestion === quizData.totalQuestions - 1}
                  className={`${styles.navButton} ${styles.nextButton}`}
                >
                  Next Question
                  <ChevronRight />
                </button>
              </div>
            </section>

            {/* Right Sidebar (Overview) */}
            <aside className={styles.rightColumn}>
              <div className={styles.overviewCard}>
                <h3 className={styles.overviewTitle}>
                  <Grid />
                  QUESTION OVERVIEW
                </h3>
                
                <div className={styles.questionGrid}>
                  {quizData.questions.map((q, index) => {
                    const isAnswered = answers[q.id] !== undefined;
                    const isFlagged = flagged[q.id];
                    const isCurrent = index === currentQuestion;
                    
                    return (
                      <button
                        key={q.id}
                        onClick={() => handleQuestionJump(index)}
                        className={`${styles.questionNumberButton} ${
                          isCurrent ? styles.current : ''
                        } ${isAnswered ? styles.answered : ''} ${
                          isFlagged ? styles.flagged : ''
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
                
                <div className={styles.timerSection}>
                  <div className={styles.timerLabel}>
                    <span>Time Remaining</span>
                    <span className={styles.timerValue}>
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                  <div className={styles.timerBar}>
                    <div 
                      className={styles.timerProgress}
                      style={{ width: `${(timeRemaining / quizData.timeLimit) * 100}%` }}
                    />
                  </div>
                </div>
                
                <button 
                  onClick={handleSubmitClick}
                  disabled={answeredCount < quizData.totalQuestions}
                  className={`${styles.submitButton} ${
                    answeredCount >= quizData.totalQuestions ? styles.enabled : ''
                  }`}
                >
                  Submit Quiz
                </button>
                <p className={styles.submitHint}>
                  {answeredCount < quizData.totalQuestions 
                    ? `Answer all questions to submit (${answeredCount}/${quizData.totalQuestions} answered)` 
                    : 'All questions answered - ready to submit'}
                </p>
              </div>

              {/* Help Card */}
              <div className={styles.helpCard}>
                <div className={styles.helpContent}>
                  <div className={styles.helpIconWrapper}>
                    <HelpCircle />
                  </div>
                  <div className={styles.helpText}>
                    <p className={styles.helpTitle}>Need Help?</p>
                    <p className={styles.helpDescription}>
                      Stuck on a question? Ask <b>EcoBot</b> for a hint! (Cost: 5 pts)
                    </p>
                    <button className={styles.ecoBotLink}>
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
    </>
  );
};

export default QuizPage;
