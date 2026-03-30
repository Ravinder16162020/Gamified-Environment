import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StreakBrokenpopup.module.css';

const StreakBrokenpopup = ({ onClose, previousStreak = 7 }) => {
  const navigate = useNavigate();

  const handleStartNewStreak = () => {
    // Close popup and user can continue on dashboard
    onClose();
  };

  const handleMaybeLater = () => {
    // Close popup and stay on dashboard
    onClose();
  };

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      {/* Modal Container */}
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          {/* Top Section: Broken Heart Icon */}
          <div className={styles.iconSection}>
            <div className={styles.iconWrapper}>
              <span className={styles.brokenHeartIcon}>💔</span>
            </div>
          </div>

          {/* Title & Subtext */}
          <h2 className={styles.title}>Streak Broken 😔</h2>
          <p className={styles.subtitle}>Your {previousStreak}-day streak ended.</p>

          {/* Encouragement Box */}
          <div className={styles.encouragementBox}>
            <span className={`material-symbols-outlined ${styles.lightbulbIcon}`}>lightbulb</span>
            <p className={styles.encouragementText}>
              Don't give up! Starting new streak today is all that matters. 🌱
            </p>
          </div>

          {/* Streak Reset Display */}
          <div className={styles.streakDisplay}>
            <div className={styles.streakColumn}>
              <span className={styles.previousStreak}>{previousStreak} days</span>
              <span className={styles.streakLabel}>Previous</span>
            </div>
            <span className={`material-symbols-outlined ${styles.arrowIcon}`}>trending_flat</span>
            <div className={styles.streakColumn}>
              <span className={styles.currentStreak}>0 days</span>
              <span className={styles.resetLabel}>Reset</span>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.buttonGroup}>
            <button 
              onClick={handleStartNewStreak}
              className={styles.startStreakBtn}
            >
              Start New Streak Today 🔥
            </button>
            <button 
              onClick={handleMaybeLater}
              className={styles.laterBtn}
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakBrokenpopup;
