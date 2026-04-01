import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ContinueCard.module.css';

const ContinueCard = ({ node, onClose }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!node) return;
    
    // Route based on node type
    if (node.type === 'quiz' || node.type === 'theory') {
      // Go to Theory + Quiz page
      navigate('/quiztheory');
    } else {
      // Go to Code Editor page for lessons
      navigate('/codeeditor');
    }
    
    if (onClose) onClose();
  };

  if (!node) return null;

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.popupCard}>
        <div className={styles.cardContent}>
          <h3 className={styles.nodeName}>{node.name || 'Numbers'}</h3>
          <button 
            onClick={handleContinue}
            className={styles.continueButton}
          >
            CONTINUE
          </button>
        </div>
        {/* Triangle pointer */}
        <div className={styles.triangle} />
      </div>
    </div>
  );
};

export default ContinueCard;
