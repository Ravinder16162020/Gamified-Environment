import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './SignUp1.module.css';
import LoginSignupLeftSide from './components/LoginSignupLeftSide';
import BackIcon from './assets/Backicon.svg';

const SignUp1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted:', formData);
    // Store email for SignUp2
    localStorage.setItem('signupEmail', formData.email);
    // Navigate to step 2
    navigate('/signup2');
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
  };

  return (
    <div className={styles.container}>
      {/* Left Side - Reusable Component */}
      <LoginSignupLeftSide />

      {/* Right Side - Signup Form */}
      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          {/* Step & Back Header */}
          <div className={styles.header}>
            <span className={styles.stepBadge}>Step 1 of 3</span>
            <button 
              className={styles.backBtn}
              onClick={() => navigate('/login')}
            >
              Back <img src={BackIcon} alt="Back" className={styles.backIconImg} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '33%' }}></div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="fullName" className={styles.label}>Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={styles.input}
                required
              />
            </div>

            <button type="submit" className={styles.nextBtn}>
              <span>Next Step</span>
              <span className={styles.arrowIcon}>→</span>
            </button>
          </form>

          {/* Social Divider */}
          <div className={styles.divider}>
            <div className={styles.dividerLine}></div>
            <span className={styles.dividerText}>Or continue with</span>
            <div className={styles.dividerLine}></div>
          </div>

          {/* Social Login */}
          <button onClick={handleGoogleSignup} className={styles.googleBtn}>
            <svg className={styles.googleIcon} viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className={styles.footer}>
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
  );
};

export default SignUp1;
