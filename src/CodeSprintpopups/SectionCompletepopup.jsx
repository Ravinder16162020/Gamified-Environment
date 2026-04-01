import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SectionCompletepopup.module.css';

// SVG Icons
const TrophyIcon = () => (
  <svg className={styles.trophyIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.1C5.84 9.63 5 8.95 5 8zm7 7c-1.1 0-1.99-.45-2.63-1.17C9.25 13.43 9 12.74 9 12V7h6v5c0 .74-.25 1.43-.63 2.08-.64.72-1.53 1.17-2.63 1.17zm5-8h2v1c0 .95-.84 1.63-2 1.9V7z"/>
  </svg>
);

const CheckIcon = () => (
  <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const StarIcon = () => (
  <svg className={styles.starIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
);

const VariablesIcon = () => (
  <svg className={styles.variablesIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"/>
  </svg>
);

const ArrowForwardIcon = () => (
  <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
  </svg>
);

const SectionCompletepopup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/journey');
    if (onClose) onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.particlesContainer}>
        <div className={styles.particle1}></div>
        <div className={styles.particle2}></div>
        <div className={styles.particle3}></div>
        <div className={styles.particle4}></div>
        <div className={styles.particle5}></div>
        <div className={styles.particle6}></div>
        <div className={styles.particle7}></div>
        <div className={styles.particle8}></div>
        <div className={styles.particle9}></div>
        <div className={styles.particle10}></div>
        <div className={styles.particle11}></div>
        <div className={styles.particle12}></div>
      </div>

      <div className={styles.modal}>
        <div className={styles.tintOverlay}></div>

        <div className={styles.header}>
          <div className={styles.trophyContainer}>
            <TrophyIcon />
          </div>
          <h1 className={styles.title}>Section Complete! 🏆</h1>
          <div className={styles.badge}>
            <span className={styles.badgeText}>Foundations Phase</span>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.xpText}>+50 XP</div>
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <CheckIcon />
              <span>4/4 Nodes</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.statItem}>
              <StarIcon />
              <span>Avg: 3 Stars</span>
            </div>
          </div>
        </div>

        <div className={styles.nextSection}>
          <div className={styles.nextSectionLabel}>Next Destination</div>
          <div className={styles.nextSectionContent}>
            <div className={styles.nextSectionLeft}>
              <div className={styles.nextSectionIcon}>
                <VariablesIcon />
              </div>
              <div className={styles.nextSectionInfo}>
                <div className={styles.nextSectionTitle}>Variables</div>
                <div className={styles.nextSectionSubtitle}>Memory & Assignment</div>
              </div>
            </div>
            <svg className={styles.chevronIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </div>
        </div>

        <button onClick={handleContinue} className={styles.continueButton}>
          Continue Journey
          <ArrowForwardIcon />
        </button>

        <div className={styles.glowBottomLeft}></div>
        <div className={styles.glowTopRight}></div>
      </div>
    </div>
  );
};

export default SectionCompletepopup;
