import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RoleSelection.module.css';
import { apiFetch } from './api';

const RoleSelection = () => {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectPath = (path) => {
    setSelectedPath(path);
  };

  const handleContinue = async () => {
    if (!selectedPath) {
      alert('Please select a path to continue');
      return;
    }

    setIsSubmitting(true);
    try {
      const userEmail = localStorage.getItem('userEmail');
      
      // Update user role in backend
      const response = await apiFetch('/api/user/update-role', {
        method: 'POST',
        body: JSON.stringify({
          email: userEmail,
          role: selectedPath === 'school' ? 'ecosprint' : 'codesprint'
        })
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || 'Failed to update role');
        return;
      }

      // Update local storage
      localStorage.setItem('userRole', selectedPath === 'school' ? 'ecosprint' : 'codesprint');

      // Navigate to appropriate onboarding
      if (selectedPath === 'school') {
        navigate('/ecosprint-onboarding');
      } else {
        navigate('/onboarding1');
      }
    } catch (error) {
      alert('Unable to connect to backend server');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      {/* Background Bloom Decoration */}
      <div className={styles.bloomEffect}></div>
      <div className={styles.bloomBlur1}></div>
      <div className={styles.bloomBlur2}></div>

      <main className={styles.main}>
        {/* Header Section */}
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.logoWrapper}>
              <div className={styles.logoIcon}>
                <span className={styles.ecoIcon}>🌿</span>
              </div>
              <span className={styles.logoText}>The Digital Synthesis</span>
            </div>
            <button className={styles.backButton} onClick={handleBack}>
              Back <span className={styles.backArrow}>→</span>
            </button>
          </div>

          <h1 className={styles.title}>Welcome, Alex! 👋</h1>
          <p className={styles.subtitle}>
            Tell us about yourself so we can personalise your learning experience.
          </p>
          <div className={styles.stepIndicator}>
            <span className={styles.personIcon}>👤</span>
            <span className={styles.stepText}>Step 1 of 1 · Choose your path</span>
          </div>
        </header>

        {/* Selection Grid */}
        <div className={styles.selectionGrid}>
          {/* School Card (EcoSprint) */}
          <div
            className={`${styles.card} ${selectedPath === 'school' ? styles.cardSelected : ''} ${
              selectedPath && selectedPath !== 'school' ? styles.cardNotSelected : ''
            }`}
            onClick={() => handleSelectPath('school')}
            style={
              selectedPath === 'school'
                ? {
                    '--border-color': '#9ff798',
                    '--shadow-color': 'rgba(159, 247, 152, 0.15)'
                  }
                : {}
            }
            id="school-card"
          >
            <div className={styles.cardIcon}>🌿</div>
            <h2 className={styles.cardTitle}>School</h2>
            <span className={styles.cardBadge}>Class 8 to 12</span>
            <div className={styles.dividerLine}></div>
            <div className={styles.cardLabel}>
              <span className={styles.leafIcon}>🍃</span>
              <span className={styles.labelText}>EcoSprint</span>
            </div>
            <ul className={styles.featuresList}>
              <li>
                <span className={styles.checkIcon}>✓</span>
                <span>Environmental learning modules</span>
              </li>
              <li>
                <span className={styles.checkIcon}>✓</span>
                <span>Gamified quiz challenges</span>
              </li>
              <li>
                <span className={styles.checkIcon}>✓</span>
                <span>Eco-points and digital badges</span>
              </li>
              <li>
                <span className={styles.checkIcon}>✓</span>
                <span>Daily sustainability tasks</span>
              </li>
            </ul>
          </div>

          {/* College Card (CodeSprint) */}
          <div
            className={`${styles.card} ${selectedPath === 'college' ? styles.cardSelected : ''} ${
              selectedPath && selectedPath !== 'college' ? styles.cardNotSelected : ''
            }`}
            onClick={() => handleSelectPath('college')}
            style={
              selectedPath === 'college'
                ? {
                    '--border-color': '#65bdec',
                    '--shadow-color': 'rgba(101, 189, 236, 0.15)'
                  }
                : {}
            }
            id="college-card"
          >
            <div className={styles.cardIcon}>💻</div>
            <h2 className={styles.cardTitle}>College</h2>
            <span className={styles.cardBadge}>Engineering / Degree</span>
            <div className={styles.dividerLine}></div>
            <div className={styles.cardLabel}>
              <span className={styles.codeIcon}>💻</span>
              <span className={styles.labelText}>CodeSprint</span>
            </div>
            <ul className={styles.featuresList}>
              <li>
                <span className={styles.checkIcon}>✓</span>
                <span>Advanced Java and Python tracks</span>
              </li>
              <li>
                <span className={styles.checkIcon}>✓</span>
                <span>Live browser-based code editor</span>
              </li>
              <li>
                <span className={styles.checkIcon}>✓</span>
                <span>Algorithmic daily challenges</span>
              </li>
              <li>
                <span className={styles.checkIcon}>✓</span>
                <span>Global engineering leaderboard</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Continue Button */}
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.continueButton} ${!selectedPath ? styles.buttonDisabled : ''}`}
            onClick={handleContinue}
            disabled={!selectedPath || isSubmitting}
          >
            {selectedPath === 'school' && !isSubmitting && (
              <>
                Continue with EcoSprint <span className={styles.buttonIcon}>🌿</span>
              </>
            )}
            {selectedPath === 'college' && !isSubmitting && (
              <>
                Continue with CodeSprint <span className={styles.buttonIcon}>💻</span>
              </>
            )}
            {isSubmitting && 'Processing...'}
            {!selectedPath && !isSubmitting && 'SELECT YOUR PATH TO CONTINUE'}
          </button>
        </div>

        {/* Footer Note */}
        <footer className={styles.footer}>
          <span className={styles.infoIcon}>ℹ️</span>
          <span>You can change your selection later in Profile → Settings.</span>
        </footer>
      </main>

      {/* Decorative Assets */}
      <div className={styles.decorativeBottom}>
        <div className={styles.decorativeLeft}>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2IvqzI5ua35Uj-RgsuzJ4BOOraC3LONYoqDju5h1DMjXODCM9gdOg-W0mGW8OSeNKhiR5CE5BMtEipZyWji3i9IRcw8qznTncPX4xkiSLKLPOjTovBGxfHs4tWtu2G7JxNPteI0ltesW-5aNVNet2w0UFaWBt9L4LqkfHVgPhHUXNUvzlo5q1jRNqVfs4FwCGWSJCXLR_KPAm3a_hVVV0E2kDrEWaj9YGsuOinabkQkGOIrGAie8ESeLQT8xsdmag-WAWajzG0w"
            alt="circuit board"
          />
        </div>
        <div className={styles.decorativeRight}>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0G15Aj7Lkxe-lyGk5OEW6bniFKElHxH9qDrxUiFgVDBgbzn1xS9SdvuFTIX3IG79UDCDp9Fm6-GaNJ77aDxiRZIVaRUVEyZGCGrIR0gaQtIqNrhBdFKokyzzevUwGouJ2fT_Iro1zxu7Wmqcrvhpiyt4jm2q86J0uLtRbaA16LOFfgXYipuRv9LNG3Fd4EXclnR6ri7wdRHjjUU25qP4orbU38i5FZWUA7M9n_GhTeCzljZMzrKUJ7HkmVMfEVz9YAfrknBSLZw"
            alt="green leaf"
          />
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
