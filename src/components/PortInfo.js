import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import inspectImage from '../images/search.png';
import './PortInfo.css';

const PortInfo = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
              }
            });
          },
          {
            threshold: 0.3,
            rootMargin: '-100px',
          }
        );
    
        const img = document.querySelector('.inspect-image');
        if (img) observer.observe(img);
    
        return () => {
          if (img) observer.unobserve(img);
        };
      }, []);

  return (
    <div className="port-box">
      <div className= "Port-item">
        <img src={inspectImage} alt="Inspect" className="inspect-image" />
      </div>
      <div className= "port-content">
          <Link to="/port-scan-page" className="tool-link">
            Port Scanner
          </Link>
        </div>
      <p className="tool-description">
        
Discover open ports on a target system and assess its security posture with our Port Scanner tool. Gain insights into your network's vulnerabilities and ensure your defenses are up to date with this essential cybersecurity resource.
      </p>
    </div>
  );
};

export default PortInfo;
