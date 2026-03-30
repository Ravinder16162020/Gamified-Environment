import React from 'react';
import { Star } from 'lucide-react';
import styles from './LevelUppopup.module.css';

const LevelUppopup = ({ 
  level = 5, 
  levelName = 'Climate Guardian',
  progress = 100,
  onClose,
  onContinue
}) => {

  const handleContinue = () => {
    // Call the parent callback to show Badge Earned popup
    onContinue();
  };

  return (
    <div className={styles.modalOverlay}>
      {/* MODAL CARD */}
      <div className={styles.modalCard}>
        {/* Radiating Star Elements */}
        <div className={styles.starsContainer}>
          <Star className={`${styles.star} ${styles.star1}`} fill="white" stroke="none" />
          <Star className={`${styles.star} ${styles.star2}`} fill="white" stroke="none" />
          <Star className={`${styles.star} ${styles.star3}`} fill="white" stroke="none" />
          <Star className={`${styles.star} ${styles.star4}`} fill="white" stroke="none" />
          <Star className={`${styles.star} ${styles.star5}`} fill="white" stroke="none" />
          <Star className={`${styles.star} ${styles.star6}`} fill="white" stroke="none" />
          <Star className={`${styles.star} ${styles.star7}`} fill="white" stroke="none" />
          <Star className={`${styles.star} ${styles.star8}`} fill="white" stroke="none" />
        </div>

        {/* MODAL CONTENT */}
        <div className={styles.modalContent}>
          {/* Icon: Starburst Effect Target */}
          <div className={styles.iconWrapper}>
            <span className={styles.lightningIcon}>⚡</span>
          </div>

          <div>
            <h2 className={styles.title}>Level Up! 🚀</h2>
            <div className={styles.levelDisplay}>
              <span className={styles.levelNumber}>{level}</span>
              <span className={styles.levelName}>{levelName}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className={styles.progressSection}>
            <div className={styles.progressLabel}>
              <span>Level {level} Progress</span>
              <span>{progress}%</span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* CTA */}
          <button onClick={handleContinue} className={styles.continueButton}>
            Awesome! 🎉
          </button>
        </div>

        {/* Decorative Glow Background */}
        <div className={styles.glowTop} />
        <div className={styles.glowBottom} />
      </div>
    </div>
  );
};

export default LevelUppopup;
