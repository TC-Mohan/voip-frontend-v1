// AuthContainer.js
import React, { useState, memo } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './AuthStyles.css';

const AuthContainer = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => setIsSignUp(!isSignUp);

  return (
    <div className="auth-page">
      <div className={`auth-container ${isSignUp ? 'right-panel-active' : ''}`}>
        <div className="forms-container">
          <SignIn />
          <SignUp />
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>Please login with your personal info</p>
              <button className="ghost-button" onClick={toggleForm}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your details and start your journey</p>
              <button className="ghost-button" onClick={toggleForm}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AuthContainer);