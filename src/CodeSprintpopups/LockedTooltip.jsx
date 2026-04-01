import React, { useState } from 'react';
import styles from './LockedTooltip.module.css';

const LockedTooltip = () => {
  return (
    <div className={styles.tooltipWrapper}>
      <div className={styles.tooltipCard}>
        <p className={styles.tooltipText}>Complete previous lessons to unlock</p>
      </div>
      <div className={styles.triangle} />
    </div>
  );
};

export default LockedTooltip;
