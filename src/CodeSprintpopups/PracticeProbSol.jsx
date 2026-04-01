import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PracticeProbSol.module.css';

// SVG Icons
const CheckCircleIcon = () => (
  <svg className={styles.successIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const TimerIcon = () => (
  <svg className={styles.statIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </svg>
);

const CheckSmallIcon = () => (
  <svg className={styles.statIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const ArrowForwardIcon = () => (
  <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
  </svg>
);

const PracticeProbSol = ({ onClose, onContinue, problemTitle = "BST Smallest Element", difficulty = "Medium", xp = 40, time = "245s" }) => {
  const navigate = useNavigate();

  const handleBackToPractice = () => {
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      {/* Confetti Elements */}
      <div className={styles.confettiContainer}>
        <div className={styles.confettiWrapper}>
          <div className={`${styles.confetti} ${styles.confetti1}`}></div>
          <div className={`${styles.confetti} ${styles.confetti2}`}></div>
          <div className={`${styles.confetti} ${styles.confetti3}`}></div>
          <div className={`${styles.confetti} ${styles.confetti4}`}></div>
          <div className={`${styles.confetti} ${styles.confetti5}`}></div>
          <div className={`${styles.confetti} ${styles.confetti6}`}></div>
          <div className={`${styles.confetti} ${styles.confetti7}`}></div>
          <div className={`${styles.confetti} ${styles.confetti8}`}></div>
          <div className={`${styles.confetti} ${styles.confetti9}`}></div>
          <div className={`${styles.confetti} ${styles.confetti10}`}></div>
        </div>
      </div>

      {/* Modal Card */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Success Icon with Radial Glow */}
        <div className={styles.iconWrapper}>
          <div className={styles.iconGlow}></div>
          <div className={styles.iconContainer}>
            <CheckCircleIcon />
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <h3 className={styles.title}>Problem Solved!</h3>
          <div className={styles.xpSection}>
            <span className={styles.xpText}>+{xp} XP</span>
            <div className={styles.tags}>
              <div className={styles.problemTag}>{problemTitle}</div>
              <div className={styles.difficultyTag}>{difficulty}</div>
            </div>
          </div>

          {/* Stats Row */}
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <TimerIcon />
              <span>{time}</span>
            </div>
            <div className={styles.statItem}>
              <CheckSmallIcon />
              <span>All tests passed</span>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.nextButton} onClick={onContinue}>
              Next Problem
              <ArrowForwardIcon />
            </button>
            <button className={styles.backButton} onClick={handleBackToPractice}>
              Back to Practice
            </button>
          </div>
        </div>

        {/* Tonal Surface Glow */}
        <div className={styles.glint}></div>
      </div>
    </div>
  );
};

export default PracticeProbSol;
