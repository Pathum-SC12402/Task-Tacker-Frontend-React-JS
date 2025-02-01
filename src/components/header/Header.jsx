import React from 'react';
import './Header.css';
import appLogo from '../../assets/images/logo.jpeg';
import userIcon from '../../assets/images/userIcon.png';

function Header() {
  return (
    <div className="header">
        <div className="left-icon">
            <img src={appLogo} alt="Left Icon" />
        </div>
        <div className="spacer"></div>
        <div className="right-icon">
            <img src={userIcon} alt="Right Icon" />
        </div>
    </div>
  );
}

export default Header;
