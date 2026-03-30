import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Quizstartconfirm.module.css';

const Quizstartconfirm = ({ onClose, moduleId }) => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate(`/modules/${moduleId}/quiz`);
  };

  const handleBackToModule = () => {
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      {/* Modal Card */}
      <div className={styles.modalCard}>
        {/* Decorative brand glow */}
        <div className={styles.brandGlow}></div>
        
        {/* Top Icon */}
        <div className={styles.iconWrapper}>
          <svg className={styles.editIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/>
          </svg>
        </div>

        {/* Module Chip */}
        <div className={styles.moduleChip}>
          Sustainable Coding Quiz
        </div>

        {/* Title */}
        <h2 className={styles.title}>Ready to take the quiz?</h2>

        {/* Rules */}
        <div className={styles.rulesList}>
          <div className={styles.ruleItem}>
            <div className={`${styles.ruleIcon} ${styles.ruleIconBlue}`}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            </div>
            <p className={styles.ruleText}>5 multiple choice questions.</p>
          </div>
          <div className={styles.ruleItem}>
            <div className={`${styles.ruleIcon} ${styles.ruleIconAmber}`}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
            <p className={styles.ruleText}>Score 70% or above (4/5) to pass.</p>
          </div>
          <div className={styles.ruleItem}>
            <div className={`${styles.ruleIcon} ${styles.ruleIconGreen}`}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <p className={styles.ruleText}>First attempt +40 pts · Second +20 pts · Perfect +60 pts.</p>
          </div>
          <div className={styles.ruleItem}>
            <div className={`${styles.ruleIcon} ${styles.ruleIconPurple}`}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
            </div>
            <p className={styles.ruleText}>No time limit.</p>
          </div>
          <div className={styles.ruleItem}>
            <div className={`${styles.ruleIcon} ${styles.ruleIconRed}`}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            </div>
            <p className={styles.ruleText}>Answers cannot be changed after submitting.</p>
          </div>
        </div>

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button onClick={handleStartQuiz} className={styles.startBtn}>
            Start Quiz
            <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </button>
          <button onClick={handleBackToModule} className={styles.backBtn}>
            <svg className={styles.backArrowIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back to Module
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quizstartconfirm;
