import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Copy } from 'lucide-react';
import styles from './QuizBadgeEarnedpopup.module.css';

const QuizBadgeEarnedpopup = ({ 
  badgeName = 'Pattern Pioneer',
  badgeDescription = "You've successfully identified complex environmental patterns in 5 consecutive modules.",
  totalBadges = 20,
  earnedBadges = 7,
  badgeType = 'Module Achievement',
  onClose
}) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Close popup and navigate to quiz result
    onClose();
    navigate('result');
  };

  const handleViewGallery = () => {
    // Close popup and navigate to badge gallery (optional route)
    onClose();
    navigate('/badges');
  };

  const progressPercentage = (earnedBadges / totalBadges) * 100;

  return (
    <div className={styles.modalOverlay}>
      {/* Modal Card */}
      <div className={styles.modalCard}>
        {/* Confetti Decorative Effect */}
        <div className={styles.confettiContainer}>
          <div className={`${styles.confetti} ${styles.confettiPrimary}`} style={{ top: '10%', left: '10%' }}></div>
          <div className={`${styles.confetti} ${styles.confettiSecondary}`} style={{ top: '20%', right: '12%' }}></div>
          <div className={`${styles.confetti} ${styles.confettiTertiary}`} style={{ bottom: '24%', left: '16%' }}></div>
          <div className={`${styles.confetti} ${styles.confettiPrimaryContainer}`} style={{ top: '50%', right: '4%' }}></div>
        </div>

        {/* Top Icon Area */}
        <div className={styles.iconWrapper}>
          <div className={styles.badgeIconContainer}>
            <Award className={styles.badgeIcon} />
          </div>
          {/* Animated Pulse Ring */}
          <div className={styles.pulseRing}></div>
        </div>

        {/* Typography */}
        <h2 className={styles.title}>Badge Earned! 🏅</h2>
        <h3 className={styles.badgeName}>{badgeName}</h3>
        <div className={styles.badgeType}>
          {badgeType}
        </div>
        <p className={styles.description}>
          {badgeDescription}
        </p>

        {/* Collection Progress */}
        <div className={styles.progressSection}>
          <div className={styles.progressLabel}>
            <span>Your Collection</span>
            <span>{earnedBadges} of {totalBadges} badges</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Interactive Row */}
        <button className={styles.copyLinkButton}>
          <Copy className={styles.copyIcon} />
          <span>Copy share link</span>
        </button>

        {/* Primary CTA */}
        <button onClick={handleContinue} className={styles.continueButton}>
          Awesome! 🎉
        </button>

        {/* Secondary Action */}
        <button onClick={handleViewGallery} className={styles.viewGalleryButton}>
          View Badge Gallery
        </button>
      </div>
    </div>
  );
};

export default QuizBadgeEarnedpopup;
