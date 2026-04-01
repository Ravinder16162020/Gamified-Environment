import React from 'react';
import styles from './GoalChestReward.module.css';

// SVG Icons
const StarIcon = () => (
  <svg className={styles.rewardIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const DiamondIcon = () => (
  <svg className={styles.rewardIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4 10l8 12 8-12-8-8z"/>
  </svg>
);

const GiftEmoji = () => (
  <span className={styles.giftEmoji}>🎁</span>
);

const GoalChestReward = ({ onClose, xp = 40, gems = 1, goalsCompleted = 2, totalGoals = 3 }) => {
  return (
    <div className={styles.overlay}>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onClose}></div>
      
      {/* Modal */}
      <div className={styles.modal}>
        {/* Background Decorations */}
        <div className={styles.bgDecorationTop}></div>
        <div className={styles.bgDecorationBottom}></div>
        
        {/* Top Section: Visual Anchor */}
        <div className={styles.visualSection}>
          {/* Glow effect */}
          <div className={styles.glowEffect}></div>
          {/* Animated Reward Icon */}
          <div className={styles.giftContainer}>
            <GiftEmoji />
          </div>
        </div>
        
        {/* Content Section */}
        <div className={styles.contentSection}>
          <h2 className={styles.title}>Goal Complete!</h2>
          <p className={styles.subtitle}>You've unlocked a secret sprint cache.</p>
        </div>
        
        {/* Rewards Detail */}
        <div className={styles.rewardsSection}>
          <div className={styles.rewardItem}>
            <div className={styles.rewardIconContainer}>
              <StarIcon />
            </div>
            <span className={styles.xpValue}>+{xp} XP</span>
          </div>
          <div className={styles.rewardItem}>
            <div className={`${styles.rewardIconContainer} ${styles.gemIconContainer}`}>
              <DiamondIcon />
            </div>
            <span className={styles.gemValue}>+{gems} Gem</span>
          </div>
        </div>
        
        {/* Progress Indicator */}
        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Daily Momentum</span>
            <span className={styles.progressValue}>{goalsCompleted} / {totalGoals} Goals</span>
          </div>
          <div className={styles.progressBarContainer}>
            <div 
              className={styles.progressBar} 
              style={{ width: `${(goalsCompleted / totalGoals) * 100}%` }}
            >
              <div className={styles.progressBarShine}></div>
            </div>
          </div>
        </div>
        
        {/* Action Button */}
        <button className={styles.awesomeButton} onClick={onClose}>
          Awesome! 🎉
        </button>
      </div>
    </div>
  );
};

export default GoalChestReward;
