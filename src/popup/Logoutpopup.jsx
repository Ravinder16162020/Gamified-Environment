import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Logoutpopup.module.css';

const Logoutpopup = ({ onClose, userName, streakDays = 7 }) => {
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    // Navigate to login page
    navigate('/login');
  };

  const handleCancel = () => {
    // Close popup and stay on profile page
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
      {/* Modal Card */}
      <div className={styles.modalCard}>
        {/* Icon Header */}
        <div className={styles.iconWrapper}>
          <svg 
            className={styles.logoutIcon} 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2.5" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" x2="9" y1="12" y2="12"></line>
          </svg>
        </div>

        {/* Text Content */}
        <h2 className={styles.title}>Log out of EcoSprint?</h2>
        <p className={styles.subtitle}>Your progress is saved. You can always log back in.</p>

        {/* Streak Warning Box */}
        <div className={styles.streakBox}>
          {/* Flame Icon */}
          <div className={styles.flameIconWrapper}>
            <svg 
              className={styles.flameIcon} 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2c-.5 0-1.07.45-1.2 1.35C10.5 5.23 10.33 6.64 11 8c.67 1.36 2.06 2.37 3.5 3 .72.32 1.5.5 2.25.75.75.25 1.25.75 1.25 1.5 0 2.76-2.24 5-5 5-2.5 0-4.63-1.85-4.94-4.29-.06-.47-.56-.71-.97-.47-1.46.85-2.34 2.45-2.34 4.19 0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.57-.6-3.02-1.58-4.1-.48-.54-1.12-1-1.83-1.33-.71-.33-1.49-.57-2.25-.82-.76-.25-1.5-.5-2.25-.82-.75-.32-1.3-.85-1.5-1.5-.2-.65 0-1.5.25-2.5.25-1 1-2.5 1-2.5s-1.5.5-2.5 1.5C8 4.5 7.5 6 7.5 7.5c0 1.5.5 3 1.5 4.5 0 0-3-1-4.5-4C4.5 10 5 12 6 13.5c1 1.5 2.5 2.5 4 3 0 0-1-1-1.5-2.5-.5-1.5 0-3 1-4.5 1-1.5 2.5-2.5 2.5-2.5s-1.5.5-2.5 1.5C9.5 8.5 9 10 9 11.5c0 1.5.5 3 1.5 4.5.4 0 .7-.1 1-.3.3-.2.5-.4.7-.7.2-.3.3-.7.3-1.1 0-.4-.1-.8-.3-1.1-.2-.3-.5-.5-.7-.7s-.5-.5-.7-.8c-.2-.3-.3-.7-.3-1.1 0-.4.1-.8.3-1.1s.5-.5.8-.7c.3-.2.6-.3 1-.3.4 0 .7.1 1 .3s.5.5.7.8c.2.3.3.7.3 1.1 0 .4-.1.8-.3 1.1-.2.3-.5.5-.8.7-.3.2-.6.3-1 .3s-.7-.1-1-.3c-.3-.2-.5-.5-.7-.8s-.3-.7-.3-1.1z"></path>
            </svg>
          </div>
          <p className={styles.streakText}>
            You have a {streakDays}-day streak! Log back in tomorrow.
          </p>
        </div>

        {/* Action Buttons */}
        <div className={styles.buttonGroup}>
          <button 
            onClick={handleConfirmLogout} 
            className={styles.logoutBtn}
          >
            Yes, Log Out
          </button>
          <button 
            onClick={handleCancel} 
            className={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logoutpopup;
