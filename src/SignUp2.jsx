import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './SignUp2.module.css';
import LoginSignupLeftSide from './components/LoginSignupLeftSide';
import BackIcon from './assets/Backicon.svg';

const SignUp2 = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  // Get email from localStorage or props (passed from SignUp1)
  const email = localStorage.getItem('signupEmail') || 'name@company.com';

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    console.log('OTP submitted:', otpValue);
    // Navigate to next step (SignUp3)
    navigate('/signup3');
  };

  const handleResend = () => {
    console.log('Resend OTP clicked');
  };

  return (
    <div className={styles.container}>
      {/* Left Side - Reusable Component */}
      <LoginSignupLeftSide />

      {/* Right Side - OTP Verification Form */}
      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          {/* Step & Back Header */}
          <div className={styles.header}>
            <span className={styles.stepBadge}>Step 2 of 3</span>
            <button 
              className={styles.backBtn}
              onClick={() => navigate('/signup')}
            >
              Back <img src={BackIcon} alt="Back" className={styles.backIconImg} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '66.6%' }}></div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Email Field (Read Only) */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address</label>
              <input
                type="email"
                value={email}
                readOnly
                className={`${styles.input} ${styles.inputReadonly}`}
              />
            </div>

            {/* OTP Input Section */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>OTP Verification</label>
              <div className={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <React.Fragment key={index}>
                    <input
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={styles.otpInput}
                    />
                    {index < 3 && <div className={styles.otpDivider}></div>}
                  </React.Fragment>
                ))}
              </div>
              {/* Resend Link */}
              <p className={styles.resendText}>
                can't receive mail?{' '}
                <button type="button" onClick={handleResend} className={styles.resendLink}>
                  resend OTP
                </button>
              </p>
            </div>

            {/* Next Button */}
            <button type="submit" className={styles.nextBtn}>
              <span>Next Step</span>
              <span className={styles.arrowIcon}>→</span>
            </button>
          </form>

          {/* Form Footer */}
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

export default SignUp2;
