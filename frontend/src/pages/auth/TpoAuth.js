import React, { useState } from 'react';
import '../../styles/components/auth.css';
import { StudentIcon, TrainerIcon, TpoIcon,AdminIcon } from '../../assets/icons/Icons';
import { useLocation } from 'react-router-dom'; 


const TpoAuth = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const main_logo= require('../../assets/images/download.png')
  const location = useLocation();
  const isActive = (path) => location.pathname === path;


  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  return (
    <div>
        <img src={main_logo} className='main_logo' alt='main_logo'></img>
        <div className='auth-container'>
        <div className="login-btn">
            <a
                href="/"
                className={isActive('/') ? 'active' : ''}
            >
                <StudentIcon />
                <p >STUDENT</p>
            </a>
            <a
                href="/TrainerAuth"
                className={isActive('/TrainerAuth') ? 'active' : ''}
            >
                <TrainerIcon />
                <p  >TRAINER</p>
            </a>
            <a
                href="/TpoAuth"
                className={isActive('/TpoAuth') ? 'active' : ''}
            >
                <TpoIcon fill='rgb(255, 255, 255)'/>
                <p className={isActive('/TpoAuth') ? 'active' : ''} >TPO</p>
            </a>
            <a
                href="/AdminAuth"
                className={isActive('/AdminAuth') ? 'active' : ''}
            >
                <AdminIcon />
                <p >ADMIN</p>
            </a>
        </div>
    <div className={`container-authentication ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Sign in</h1>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot your password?</a>
          <button >Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
          <h1>Welcome Back Tpo!</h1>
          <p>Log in with your credentials to efficiently manage and oversee the LMS platform.</p>
            <button className="ghost" onClick={handleSignInClick}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
          <h1>Welcome, New User!</h1>
          <p>Create an account to start your learning journey with our LMS.</p>
            <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default TpoAuth;
