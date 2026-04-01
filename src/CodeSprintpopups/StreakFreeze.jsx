import React from 'react';
import styles from './StreakFreeze.module.css';

const StreakFreeze = ({ onClose, onActivate, streak = 14, availableFreezes = 1 }) => {
  return (
    <div className={styles.overlay}>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onClose}></div>
      
      {/* Modal Card */}
      <div className={styles.modal}>
        {/* Spinning Snowflake Icon */}
        <div className={styles.iconContainer}>
          <div className={styles.snowflake}>❄️</div>
        </div>
        
        {/* Title */}
        <h2 className={styles.title}>Freeze your streak?</h2>
        
        {/* Description */}
        <p className={styles.description}>
          Freeze protects your <span className={styles.streakHighlight}>{streak}-day streak</span> for 24 hours. You have {availableFreezes} freeze(s) available.
        </p>
        
        {/* Cost Box */}
        <div className={styles.costBox}>
          <span className={styles.costLabel}>Cost:</span>
          <span className={styles.costValue}>Free — {availableFreezes} use available</span>
        </div>
        
        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.activateButton} onClick={onActivate}>
            Activate Freeze ❄️
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreakFreeze;
