import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Logoutpop.module.css';

// SVG Icons
const LogoutIcon = () => (
  <svg className={styles.headerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" x2="9" y1="12" y2="12"/>
  </svg>
);

const FireIcon = () => (
  <svg className={styles.fireIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"/>
  </svg>
);

const Logoutpop = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Subtle Surface Tint Overlay */}
        <div className={styles.tintOverlay}></div>
        
        {/* Top Icon Container */}
        <div className={styles.iconContainer}>
          <LogoutIcon />
        </div>
        
        {/* Header Content */}
        <div className={styles.header}>
          <h2 className={styles.title}>Log out of CodeSprint?</h2>
          <p className={styles.subtitle}>Progress saved.</p>
        </div>
        
        {/* Streak Warning Bento-style Box */}
        <div className={styles.streakBox}>
          <div className={styles.fireContainer}>
            <FireIcon />
          </div>
          <div>
            <p className={styles.streakLabel}>Active Streak</p>
            <p className={styles.streakText}>You have an active 7-day streak! Log back in tomorrow to keep it.</p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Yes, Log Out
          </button>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
        </div>
        
        {/* Decorative Visual Soul (Light Glint) */}
        <div className={styles.glint}></div>
      </div>
    </div>
  );
};

export default Logoutpop;
