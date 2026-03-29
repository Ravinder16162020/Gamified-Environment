import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUpSuccess.module.css';

const SignUpSuccess = ({ onClose }) => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      {/* Confetti Elements */}
      <div className={styles.confettiContainer}>
        <div className={`${styles.confetti} ${styles.confettiGreen}`} style={{ left: '20%', top: '10%' }}></div>
        <div className={`${styles.confetti} ${styles.confettiYellow}`} style={{ left: '80%', top: '15%' }}></div>
        <div className={`${styles.confetti} ${styles.confettiOrange}`} style={{ left: '40%', top: '5%' }}></div>
        <div className={`${styles.confetti} ${styles.confettiBlue}`} style={{ left: '60%', top: '25%' }}></div>
        <div className={`${styles.confetti} ${styles.confettiGreen}`} style={{ left: '15%', top: '80%' }}></div>
        <div className={`${styles.confetti} ${styles.confettiYellow}`} style={{ left: '85%', top: '70%' }}></div>
        <div className={`${styles.confetti} ${styles.confettiOrange}`} style={{ left: '30%', top: '90%' }}></div>
        <div className={`${styles.confetti} ${styles.confettiBlue}`} style={{ left: '70%', top: '85%' }}></div>
        <div className={`${styles.confetti} ${styles.confettiGreen}`} style={{ left: '50%', top: '15%' }}></div>
        <div className={`${styles.confetti} ${styles.confettiYellow}`} style={{ left: '10%', top: '40%' }}></div>
      </div>

      {/* Success Modal Card */}
      <div className={styles.modalCard}>
        {/* Success Icon */}
        <div className={styles.iconWrapper}>
          <div className={styles.iconCircle}>
            <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>

        {/* Content */}
        <h1 className={styles.title}>
          Welcome to EcoSprint! 🌿
        </h1>
        <p className={styles.description}>
          Your account has been created successfully. You're now part of the global movement for a sustainable future.
        </p>

        {/* Chips Container */}
        <div className={styles.chipsContainer}>
          <span className={styles.chipGreen}>
            Eco-Runner
          </span>
          <span className={styles.chipAmber}>
            <svg className={styles.trophyIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm7 6c-1.1 0-2-.9-2-2V5h4v7c0 1.1-.9 2-2 2zm7-6c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
            </svg>
            +15 Eco-Points awaiting
          </span>
        </div>

        {/* Main Action */}
        <button onClick={handleStartJourney} className={styles.startButton}>
          Start Your Journey
          <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
          </svg>
        </button>

        {/* Footer Meta */}
        <p className={styles.sessionId}>
          Sprint Session ID: ES-992-ALPHA
        </p>
      </div>
    </div>
  );
};

export default SignUpSuccess;
