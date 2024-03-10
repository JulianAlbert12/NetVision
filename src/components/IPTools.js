import React from 'react';
import { Link } from 'react-router-dom';
import InformationIcon from '../images/information.png';
import DecimalIcon from '../images/123.png';

import './IPTools.css';

const IPToolsBox = () => {
  return (
    <div className="ip-tools-box">
      <h4>IP Tools</h4>
      <p>This section provides various tools for analyzing and managing IP addresses.</p>
      <div className="tool-container">
        <Link to="/ip-info-page" className="tool-item">
          <div className="tool-content">
            <img src={InformationIcon} alt="Information Icon" className="icon" /> 
            <span className="text">WHOIS Search</span>
          </div>
        </Link>
        <Link to="/IP-decimal-page" className="tool-item">
        <div className="tool-content">
            <img src={DecimalIcon} alt="Information Icon" className="icon" /> 
            <span className="text">IP to Decimal</span>
          </div>
        </Link>
        <Link to="/port-scan-page" className="tool-item">
          <div className="tool-content">
            Port Scanner
          </div>
        </Link>
        <Link to="/" className="tool-item">
          <div className="tool-content">
            IP tool
          </div>
        </Link>
      </div>
    </div>
  );
};

export default IPToolsBox;
