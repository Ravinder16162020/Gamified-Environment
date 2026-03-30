import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SubmitQuiz.module.css';

const SubmitQuiz = ({ onClose, onSubmitNow, moduleId, answeredCount, totalQuestions, flaggedCount }) => {
  const navigate = useNavigate();

  const handleSubmitNow = () => {
    // Call the parent callback to show ModuleCompletepopup
    onSubmitNow();
  };

  const handleReviewAnswers = () => {
    // Close popup and go back to quiz
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      {/* Modal Card */}
      <div className={styles.modalCard}>
        {/* Icon Cluster */}
        <div className={styles.iconCluster}>
          <div className={styles.iconPulse}></div>
          <div className={styles.iconWrapper}>
            <svg className={styles.warningIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L1 21h22L12 2zm0 3.45l8.27 14.3H3.73L12 5.45z"/>
              <path d="M12 8v7h2V8h-2zm0 9v2h2v-2h-2z"/>
            </svg>
          </div>
        </div>

        {/* Content Header */}
        <h2 className={styles.title}>Submit your quiz?</h2>
        <p className={styles.subtitle}>{answeredCount} of {totalQuestions} answered</p>

        {/* Status Sections */}
        <div className={styles.statusSections}>
          {/* Flagged Section */}
          {flaggedCount > 0 && (
            <div className={styles.flaggedSection}>
              <svg className={styles.flagIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
              </svg>
              <div>
                <p className={styles.statusTitle}>Review Flagged Item</p>
                <p className={styles.statusDesc}>{flaggedCount} question{flaggedCount > 1 ? 's are' : ' is'} still flagged for review.</p>
              </div>
            </div>
          )}
          
          {/* Warning Section */}
          <div className={styles.warningSection}>
            <svg className={styles.infoIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            <div>
              <p className={styles.statusTitle}>Point of no return</p>
              <p className={styles.statusDesc}>Answers cannot be changed after submission.</p>
            </div>
          </div>
        </div>

        {/* Action Cluster */}
        <div className={styles.buttonGroup}>
          {/* Primary Action */}
          <button onClick={handleSubmitNow} className={styles.submitBtn}>
            <span>Submit Now</span>
            <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </button>
          
          {/* Secondary Action */}
          <button onClick={handleReviewAnswers} className={styles.reviewBtn}>
            <svg className={styles.backIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            <span>Review Answers</span>
          </button>
        </div>

        {/* Technical Detail */}
        <p className={styles.transactionId}>Transaction ID: QUIZ-005-ES-24</p>
      </div>
    </div>
  );
};

export default SubmitQuiz;
