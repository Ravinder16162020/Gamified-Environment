import React from 'react';
import { CheckCircle, ChevronRight, Leaf } from 'lucide-react';
import styles from './ModuleCompletepopup.module.css';

const ModuleCompletepopup = ({ onClose, onContinue, moduleName = 'Renewable Energy', score = 80, attempt = 1, ecoPoints = 40, nextModule = { name: 'Sustainable Living', lessons: 8, duration: '15 Mins' } }) => {

  const handleContinue = () => {
    // Call the parent callback to show LevelUp popup
    onContinue();
  };

  return (
    <div className={styles.modalOverlay}>
      {/* Modal Card */}
      <div className={styles.modalCard}>
        {/* Confetti Container */}
        <div className={styles.confettiContainer}>
          <div className={`${styles.confetti} ${styles.confettiGreen}`} style={{ top: '10%', left: '10%', transform: 'rotate(12deg)' }}></div>
          <div className={`${styles.confetti} ${styles.confettiYellow}`} style={{ top: '20%', right: '12%', transform: 'rotate(-45deg)' }}></div>
          <div className={`${styles.confetti} ${styles.confettiOrange}`} style={{ bottom: '32%', left: '8%', transform: 'rotate(90deg)' }}></div>
          <div className={`${styles.confetti} ${styles.confettiBlue}`} style={{ top: '50%', right: '10%', transform: 'rotate(12deg)' }}></div>
          <div className={`${styles.confetti} ${styles.confettiGreen}`} style={{ bottom: '10%', right: '20%', transform: 'rotate(-12deg)' }}></div>
          <div className={`${styles.confetti} ${styles.confettiYellow}`} style={{ top: '4%', left: '50%', transform: 'translateX(-50%)' }}></div>
          <div className={`${styles.confetti} ${styles.confettiOrange}`} style={{ top: '40%', left: '16%', transform: 'rotate(30deg)' }}></div>
          <div className={`${styles.confetti} ${styles.confettiBlue}`} style={{ bottom: '20%', left: '25%' }}></div>
          <div className={`${styles.confetti} ${styles.confettiGreen}`} style={{ top: '25%', right: '4%', transform: 'rotate(60deg)' }}></div>
          <div className={`${styles.confetti} ${styles.confettiYellow}`} style={{ bottom: '4%', right: '50%', transform: 'rotate(12deg)' }}></div>
          <div className={`${styles.confetti} ${styles.confettiOrange}`} style={{ top: '12%', left: '33%' }}></div>
          <div className={`${styles.confetti} ${styles.confettiBlue}`} style={{ bottom: '12%', left: '12%', transform: 'rotate(-12deg)' }}></div>
          <div className={`${styles.confetti} ${styles.confettiGreen}`} style={{ top: '75%', right: '8%' }}></div>
          <div className={`${styles.confetti} ${styles.confettiYellow}`} style={{ top: '66%', left: '4%', transform: 'rotate(45deg)' }}></div>
          <div className={`${styles.confetti} ${styles.confettiOrange}`} style={{ top: '10%', right: '25%' }}></div>
          <div className={`${styles.confetti} ${styles.confettiBlue}`} style={{ bottom: '25%', left: '10%', transform: 'rotate(15deg)' }}></div>
        </div>

        {/* Success Icon */}
        <div className={styles.iconWrapper}>
          <CheckCircle className={styles.successIcon} />
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div>
            <h2 className={styles.title}>Module Complete! 🎉</h2>
            <div className={styles.moduleTag}>
              {moduleName}
            </div>
          </div>

          <div className={styles.rewardSection}>
            <p className={styles.rewardLabel}>REWARD EARNED</p>
            <div className={styles.rewardPoints}>
              +{ecoPoints} Eco-Points
            </div>
          </div>

          <div className={styles.scoreBox}>
            <p className={styles.scoreText}>Passed with <span className={styles.scoreHighlight}>{score}%</span> on attempt {attempt}.</p>
          </div>

          {/* Next Module Preview */}
          <div className={styles.nextModuleSection}>
            <p className={styles.nextModuleLabel}>Up Next</p>
            <button className={styles.nextModuleButton}>
              <div className={styles.nextModuleContent}>
                <div className={styles.nextModuleIcon}>
                  <Leaf className={styles.ecoIcon} />
                </div>
                <div className={styles.nextModuleInfo}>
                  <p className={styles.nextModuleName}>{nextModule.name}</p>
                  <p className={styles.nextModuleMeta}>{nextModule.lessons} Lessons • {nextModule.duration}</p>
                </div>
              </div>
              <ChevronRight className={styles.chevronIcon} />
            </button>
          </div>

          {/* CTA */}
          <button onClick={handleContinue} className={styles.continueButton}>
            Awesome! 🎉
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleCompletepopup;
