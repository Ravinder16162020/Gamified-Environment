import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './SignUp3.module.css';
import LoginSignupLeftSide from './components/LoginSignupLeftSide';
import BackIcon from './assets/Backicon.svg';
import FoundationIcon from './assets/Foundationicon.svg';
import SignUpSuccess from './popup/SignUpSuccess';

const SignUp3 = () => {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState('foundation');
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePathSelect = (path) => {
    setSelectedPath(path);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected path:', selectedPath);
    // Show success popup instead of navigating
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    navigate('/login');
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
  };

  return (
    <>
      {/* Success Popup - Outside dimmed container */}
      {showSuccess && <SignUpSuccess onClose={handleCloseSuccess} />}
      
      <div className={`${styles.container} ${showSuccess ? styles.containerDimmed : ''}`}>
        {/* Left Side - Reusable Component */}
        <LoginSignupLeftSide />

      {/* Right Side - Path Selection Form */}
      <div className={styles.rightSide}>
        <div className={styles.formCard}>
          {/* Form Header */}
          <div className={styles.header}>
            <span className={styles.stepBadge}>Step 3 of 3</span>
            <button 
              className={styles.backBtn}
              onClick={() => navigate('/signup2')}
            >
              Back <img src={BackIcon} alt="Back" className={styles.backIconImg} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '100%' }}></div>
          </div>

          {/* Title */}
          <div className={styles.titleSection}>
            <h2 className={styles.title}>Choose Your Mastery Path</h2>
            <p className={styles.subtitle}>Tell us about your learning journey</p>
          </div>

          {/* Path Options */}
          <div className={styles.pathOptions}>
            {/* Foundation Card */}
            <div 
              className={`${styles.pathCard} ${selectedPath === 'foundation' ? styles.pathCardActive : styles.pathCardInactive}`}
              onClick={() => handlePathSelect('foundation')}
            >
              <div className={styles.pathIcon}>
                <img src={FoundationIcon} alt="Foundation" className={styles.foundationIconImg} />
              </div>
              <div className={styles.pathInfo}>
                <div className={styles.pathHeader}>
                  <h3 className={styles.pathName}>Foundation</h3>
                  <span className={styles.schoolBadge}>School</span>
                </div>
                <p className={styles.pathDesc}>Normal Quizzes and Puzzles</p>
              </div>
            </div>

            {/* Pro Card */}
            <div 
              className={`${styles.pathCard} ${selectedPath === 'pro' ? styles.pathCardActive : styles.pathCardInactive}`}
              onClick={() => handlePathSelect('pro')}
            >
              <div className={styles.pathIconPro}>
                <svg className={styles.proIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className={styles.pathInfo}>
                <div className={styles.pathHeader}>
                  <div className={styles.pathNameWrapper}>
                    <h3 className={styles.pathName}>Pro</h3>
                    <span className={styles.codeBadge}>Code</span>
                  </div>
                  <span className={styles.collegeBadge}>College</span>
                </div>
                <p className={styles.pathDesc}>Coding-based Quizzes and coding Rounds</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actions}>
            <button onClick={handleSubmit} className={styles.completeBtn}>
              <span>Complete Registration</span>
              <svg className={styles.checkIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </button>

            <div className={styles.divider}>
              <div className={styles.dividerLine}></div>
              <span className={styles.dividerText}>Or continue with</span>
              <div className={styles.dividerLine}></div>
            </div>

            <button onClick={handleGoogleSignup} className={styles.googleBtn}>
              <svg className={styles.googleIcon} viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <p className={styles.loginText}>
              Already have an account?{' '}
              <Link to="/login" className={styles.loginLink}>Log in</Link>
            </p>
            <p className={styles.terms}>
              By continuing you agree to our{' '}
              <a href="#" className={styles.termsLink}>Terms of Use</a> and{' '}
              <a href="#" className={styles.termsLink}>Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignUp3;
