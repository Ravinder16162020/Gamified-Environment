import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import LoginSignupLeftSide from './components/LoginSignupLeftSide';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });
    
    // EcoSprint credentials: student@ecosprint.com / sprint123
    if (email === 'student@ecosprint.com' && password === 'sprint123') {
      navigate('/dashboard');
    }
    // CodeSprint credentials: college@codesprint.com / code123
    else if (email === 'college@codesprint.com' && password === 'code123') {
      navigate('/onboarding1');
    }
    else {
      alert('Invalid credentials. Try: student@ecosprint.com / sprint123 OR college@codesprint.com / code123');
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log('Google login success:', tokenResponse);
      navigate('/dashboard');
    },
    onError: () => console.log('Google login failed'),
  });

  return (
    <div className={styles.container}>
      {/* Left Side - Reusable Component */}
      <LoginSignupLeftSide />

      {/* Right Side - Login Form */}
      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          <h1 className={styles.welcomeBack}>Welcome Back!</h1>
          <p className={styles.subtitle}>
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@school.edu"
                />
              </div>

              <div className={styles.inputWrapper}>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className={styles.forgotPasswordLink}>
              <a href="#" className={styles.forgotPassword}>
                Forgot password?
              </a>
            </div>

            <button type="submit" className={styles.loginBtn}>
              Start Sprinting ⚡
            </button>
          </form>

          <div className={styles.divider}>
            <span className={styles.dividerText}>OR CONTINUE WITH</span>
          </div>

          <button onClick={handleGoogleLogin} className={styles.googleBtn}>
            <svg className={styles.googleIcon} viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className={styles.signupText}>
            <p>
              New to the race?{' '}
              <a href="#">Create an account</a>
            </p>
          </div>

          <p className={styles.terms}>
            By continuing, you agree to our{' '}
            <a href="#">Terms of Use</a> and{' '}
            <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
