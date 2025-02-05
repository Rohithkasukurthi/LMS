import React, { useState } from 'react';
import '../../styles/components/auth.css';
import {registerAdmin,loginAdmin}from "../../utils/api"
import { useNavigate } from 'react-router-dom';
import { StudentIcon, TrainerIcon, TpoIcon,AdminIcon } from '../../assets/icons/Icons';
import { useLocation } from 'react-router-dom'; 

const AdminAuth = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const main_logo= require('../../assets/images/download.png')
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Signinemail, setSigninEmail] = useState("");
  const [Signinpassword, setSigninPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerAdmin(email, password);
      setMessage(data.message);
  
      
      nav('/Dashboard')

    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };
  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginAdmin(Signinemail, Signinpassword);
      setMessage(data.message);

      nav('/Dashboard')

    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };
  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

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
                <TpoIcon />
                <p  >TPO</p>
            </a>
            <a
                href="/AdminAuth"
                className={isActive('/AdminAuth') ? 'active' : ''}
            >
                <AdminIcon fill='#fff'/>
                <p  className={isActive('/AdminAuth') ? 'active' : ''}>ADMIN</p>
            </a>
        </div>
    <div className={`container-authentication ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
      <div className="form-container sign-up-container">
        <form  onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <input type="email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          required placeholder="Email" />
          <input type="password" placeholder="Password"  value={password}
          onChange={(e) => setPassword(e.target.value)}
          required/>
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form  onSubmit={handleSigninSubmit}>
          <h1>Sign in</h1>
          <input type="email" value={Signinemail}
          onChange={(e) => setSigninEmail(e.target.value)}
          required placeholder="Email" />
          <input type="password" placeholder="Password"  value={Signinpassword}
          onChange={(e) => setSigninPassword(e.target.value)}
          required />
          <a href="$">Forgot your password?</a>
          <button >Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back Admin!</h1>
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

export default AdminAuth;
