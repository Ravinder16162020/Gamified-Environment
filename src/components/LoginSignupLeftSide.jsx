import React from 'react';
import styles from './LoginSignupLeftSide.module.css';
import earningIcon from '../assets/earningicon.svg';
import statusIcon from '../assets/statusicon.svg';
import sprintIcon from '../assets/sprinticon.svg';
import imageIcon from '../assets/imageicon.svg';

const LoginSignupLeftSide = () => {
  return (
    <div className={styles.leftSide}>
      <div className={styles.leftContent}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <img src={sprintIcon} alt="EcoSprint" style={{ width: '1.75rem', height: '1.75rem' }} />
          </div>
          <span className={styles.logoText}>EcoSprint</span>
        </div>

        {/* Headline */}
        <h1 className={styles.headline}>
          Race to Save the<br />
          Planet,<br />
          <span className={styles.highlightText}>One Sprint at a</span><br />
          Time!
        </h1>

        {/* Stats Cards */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.statIconGreen}`}>
              <img src={earningIcon} alt="Earnings" style={{ width: '1.35rem', height: '1.35rem' }} />
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Earnings</p>
              <p className={styles.statValue}>850 Sprint Points</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.statIconYellow}`}>
              <img src={statusIcon} alt="Status" style={{ width: '1.35rem', height: '1.35rem' }} />
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Player Status</p>
              <p className={styles.statValue}>Level 5</p>
            </div>
          </div>
        </div>

        {/* Illustration - Image */}
        <div className={styles.illustration}>
          <img src={imageIcon} alt="Eco Illustration" className={styles.illustrationImg} />
        </div>

        {/* Footer Text */}
        <p className={styles.footerText}>
          Join over 50,000+ eco-warriors making a difference.
        </p>
      </div>
    </div>
  );
};

export default LoginSignupLeftSide;
