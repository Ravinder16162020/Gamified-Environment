import React, { useState, useRef, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate, Link } from 'react-router-dom';
import styles from './SignUp2.module.css';
import LoginSignupLeftSide from './components/LoginSignupLeftSide';
import BackIcon from './assets/Backicon.svg';
import { apiFetch } from './api';

const SignUp2 = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isCompletingRegistration, setIsCompletingRegistration] = useState(false);
  const inputRefs = useRef([]);

  const signupData = JSON.parse(localStorage.getItem('signupData') || '{}');
  const email = signupData.email || 'name@company.com';

  useEffect(() => {
    if (!signupData.email) {
      navigate('/signup');
    }
  }, [navigate, signupData.email]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 4) {
      alert('Please enter 4-digit OTP');
      return;
    }

    setIsVerifying(true);
    try {
      const response = await apiFetch('/api/signup/verify-otp', {
        method: 'POST',
        body: JSON.stringify({
          email,
          otp: otpValue
        })
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || 'OTP verification failed');
        return;
      }

      localStorage.setItem('signupOtp', otpValue);
      setIsOtpVerified(true);
      alert('OTP verified successfully');
    } catch (error) {
      alert('Unable to connect to backend server');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    try {
      const response = await apiFetch('/api/signup/send-otp', {
        method: 'POST',
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || 'Failed to resend OTP');
        return;
      }
      alert('OTP resent successfully');
    } catch (error) {
      alert('Unable to connect to backend server');
    }
  };

  const handleGoogleSignup = useGoogleLogin({
    flow: 'implicit',
    ux_mode: 'popup',
    prompt: 'select_account',
    scope: 'openid email profile',
    onSuccess: async (tokenResponse) => {
      try {
        const response = await apiFetch('/api/auth/google', {
          method: 'POST',
          body: JSON.stringify({
            accessToken: tokenResponse.access_token
          })
        });

        const data = await response.json();
        if (!response.ok) {
          alert(data.message || 'Google login failed');
          return;
        }

        localStorage.setItem('userRole', data.user.role);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('xp', String(data.user.xp));
        localStorage.setItem('level', String(data.user.level));

        navigate('/role-selection');
      } catch (error) {
        alert('Unable to connect to backend server');
      }
    },
    onError: () => {
      alert('Google login failed');
    }
  });

  const handleCompleteRegistration = async () => {
    if (!isOtpVerified) {
      alert('Please verify OTP first');
      return;
    }

    const signupPayload = JSON.parse(localStorage.getItem('signupData') || '{}');
    const savedOtp = localStorage.getItem('signupOtp') || otp.join('');

    if (!signupPayload.fullName || !signupPayload.email || !signupPayload.password || !signupPayload.confirmPassword) {
      alert('Signup session expired. Please start again.');
      navigate('/signup');
      return;
    }

    setIsCompletingRegistration(true);
    try {
      const response = await apiFetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({
          ...signupPayload,
          otp: savedOtp,
          // Path is selected after login on RoleSelection page.
          pathType: 'foundation'
        })
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || 'Signup failed');
        return;
      }

      localStorage.removeItem('signupData');
      localStorage.removeItem('signupOtp');
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      alert('Unable to connect to backend server');
    } finally {
      setIsCompletingRegistration(false);
    }
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
            <span className={styles.stepBadge}>Step 2 of 2</span>
            <button 
              className={styles.backBtn}
              onClick={() => navigate('/signup')}
            >
              Back <img src={BackIcon} alt="Back" className={styles.backIconImg} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '100%' }}></div>
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
              <div className={styles.otpRow}>
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
                <button type="submit" className={styles.verifyBtn} disabled={isVerifying}>
                  {isVerifying ? 'Verifying...' : (isOtpVerified ? 'Verified' : 'Verify')}
                </button>
              </div>
              {/* Resend Link */}
              <p className={styles.resendText}>
                can't receive mail?{' '}
                <button type="button" onClick={handleResend} className={styles.resendLink}>
                  resend OTP
                </button>
              </p>
            </div>

          </form>

          <button
            type="button"
            onClick={handleCompleteRegistration}
            className={styles.completeBtn}
            disabled={!isOtpVerified || isCompletingRegistration}
          >
            {isCompletingRegistration ? 'Completing Registration...' : 'Complete Registration'}
            <span className={styles.checkIcon}>◯</span>
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
