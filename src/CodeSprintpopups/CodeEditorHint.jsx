import React from 'react';
import styles from './CodeEditorHint.module.css';

// SVG Icons
const LightbulbIcon = () => (
  <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h20v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
  </svg>
);

const WarningIcon = () => (
  <svg className={styles.warningIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </svg>
);

const CloseIcon = () => (
  <svg className={styles.closeIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
  </svg>
);

const CodeEditorHint = ({ onClose, hint }) => {
  return (
    <div className={styles.overlay}>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={onClose}></div>
      
      {/* Modal */}
      <div className={styles.modal}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
        
        {/* Icon Container */}
        <div className={styles.iconContainer}>
          <LightbulbIcon />
        </div>
        
        {/* Content */}
        <div className={styles.content}>
          <h2 className={styles.title}>Hint</h2>
          <p className={styles.description}>{hint}</p>
          <div className={styles.warningBadge}>
            <WarningIcon />
            <span>Using hint reduces max dots to 2/3.</span>
          </div>
        </div>
        
        {/* Action */}
        <button className={styles.gotItButton} onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
};

export default CodeEditorHint;
