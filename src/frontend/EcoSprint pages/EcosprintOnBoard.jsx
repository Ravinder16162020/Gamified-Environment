import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EcosprintOnBoard.module.css';

const EcosprintOnBoard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState(['reforestation']);
  const [expandedTour, setExpandedTour] = useState(null);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - go to dashboard
      navigate('/dashboard');
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const toggleTour = (index) => {
    setExpandedTour(expandedTour === index ? null : index);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.featurePills}>
            <div className={styles.pill}>
              <span className={styles.pillIcon}>🎒</span> Earn Eco-Points
            </div>
            <div className={styles.pill}>
              <span className={styles.pillIcon}>📊</span> Climb Leaderboards
            </div>
            <div className={styles.pill}>
              <span className={styles.pillIcon}>🤖</span> Ask EcoBot Anything
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.interestGrid}>
            {[
              { id: 'reforestation', label: '🌱 Reforestation' },
              { id: 'ocean', label: '🌊 Ocean Care' },
              { id: 'solar', label: '☀️ Solar Energy' },
              { id: 'recycling', label: '♻️ Recycling' },
            ].map((item) => (
              <button
                key={item.id}
                className={`${styles.interestTile} ${selectedInterests.includes(item.id) ? styles.interestTileActive : ''}`}
                onClick={() => toggleInterest(item.id)}
              >
                <span>{item.label}</span>
                {selectedInterests.includes(item.id) && (
                  <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        );
      case 3:
        return (
          <div className={styles.tourList}>
            {[
              { icon: '🚀', title: 'Learning Paths', desc: 'Step-by-step interactive courses designed by environmental scientists to build your green expertise.' },
              { icon: '🤝', title: 'Community Hub', desc: 'Connect with like-minded students, share your projects, and join local cleanup events.' },
            ].map((item, index) => (
              <div
                key={index}
                className={`${styles.tourCard} ${expandedTour === index ? styles.tourCardActive : ''}`}
                onClick={() => toggleTour(index)}
              >
                <div className={styles.tourHeader}>
                  <div className={styles.tourIconWrapper}>
                    <div className={styles.tourIcon}>{item.icon}</div>
                    <div className={styles.tourTitle}>{item.title}</div>
                  </div>
                  <span className={styles.tourArrow}>{expandedTour === index ? '▴' : '▾'}</span>
                </div>
                {expandedTour === index && (
                  <div className={styles.tourContent}>{item.desc}</div>
                )}
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className={styles.pointsCard}>
            <div className={styles.pointsContent}>
              <div className={styles.pointsEmoji}>🌱</div>
              <div>
                <div className={styles.pointsLabel}>Initial Balance</div>
                <div className={styles.pointsValue}>500 Points</div>
              </div>
            </div>
            <div className={styles.pointsCheck}>✓</div>
          </div>
        );
      default:
        return null;
    }
  };

  const getStepData = () => {
    const steps = {
      1: { badge: 'School Student', title: 'Welcome to EcoSprint, Alex! 🌿', subtitle: 'Join thousands of learners making a real impact. Learn about the planet and earn rewards along the way!', button: "Let's Get Started" },
      2: { badge: 'Interests', title: 'What interests you? 🔍', subtitle: 'Select topics you care about to personalize your EcoSprint journey.', button: 'Continue' },
      3: { badge: 'Platform Tour', title: 'Quick Tour 🗺️', subtitle: 'See how you can interact with the community and track your progress.', button: 'Start My EcoSprint!' },
      4: { badge: 'All Set!', title: "You're Ready! 🎉", subtitle: "We've credited 500 Eco-Points to your new account. Let's start your first sprint!", button: 'Enter Dashboard' },
    };
    return steps[currentStep];
  };

  const stepData = getStepData();

  return (
    <div className={styles.container}>
      <main className={styles.card}>
        {/* Skip Button */}
        {currentStep < 4 && (
          <div className={styles.skipContainer}>
            <button className={styles.skipBtn} onClick={handleSkip}>
              Skip <span>→</span>
            </button>
          </div>
        )}

        {/* Mascot Section */}
        <div className={styles.mascotArea}>
          {currentStep === 4 ? (
            <div className={styles.badgeDisplay}>
              <div className={styles.badgeCircle}>
                <span className={styles.badgeEmoji}>🥇</span>
                <div className={styles.newBadge}>NEW BADGE</div>
              </div>
            </div>
          ) : (
            <div className={styles.mascotCircle}>
              <div className={styles.mascotFace}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              {/* Floating Icons */}
              <span className={`${styles.floatingIcon} ${styles.icon1}`}>🌿</span>
              <span className={`${styles.floatingIcon} ${styles.icon2}`}>🏆</span>
              <span className={`${styles.floatingIcon} ${styles.icon3}`}>⚡</span>
              <span className={`${styles.floatingIcon} ${styles.icon4}`}>🌍</span>
            </div>
          )}
        </div>

        {/* Header Content */}
        <div className={styles.headerContent}>
          <div className={styles.badge}>{stepData.badge}</div>
          <h1 className={styles.title}>{stepData.title}</h1>
          <p className={styles.subtitle}>{stepData.subtitle}</p>
        </div>

        {/* Dynamic Content */}
        <div className={styles.dynamicBody}>
          {renderStepContent()}
        </div>

        {/* Action Button */}
        <div className={styles.ctaSection}>
          <button className={styles.nextBtn} onClick={handleNext}>
            {stepData.button} <span className={styles.arrow}>→</span>
          </button>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          {currentStep < 4 ? (
            <>
              <div className={styles.dots}>
                <div className={`${styles.dot} ${currentStep === 1 ? styles.dotActive : ''}`}></div>
                <div className={`${styles.dot} ${currentStep === 2 ? styles.dotActive : ''}`}></div>
                <div className={`${styles.dot} ${currentStep === 3 ? styles.dotActive : ''}`}></div>
              </div>
              <span className={styles.stepText}>Step {currentStep} of 3</span>
            </>
          ) : (
            <p className={styles.completeText}>Onboarding Complete</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default EcosprintOnBoard;
