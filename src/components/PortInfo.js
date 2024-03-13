import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import inspectImage from '../images/search.png';
import './PortInfo.css';

const PortInfo = () => {
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [isBoxVisible, setIsBoxVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.target.classList.contains('inspect-image') && entry.isIntersecting) {
                setIsImageVisible(true);
              } else if (entry.target.classList.contains('port-box') && entry.isIntersecting) {
                setIsBoxVisible(true);
              }
            });
          },
          {
            threshold: 0.4,
          }
        );

        const img = document.querySelector('.inspect-image');
        if (img) observer.observe(img);

        const portBox = document.querySelector('.port-box');
        if (portBox) observer.observe(portBox);

        return () => {
          if (img) observer.unobserve(img);
          if (portBox) observer.unobserve(portBox);
        };
      }, []);

  return (
    <Link to="/port-scan-page" className={`port-box ${isBoxVisible ? 'visible' : ''}`}>
        <div className="Port-item">
          <img src={inspectImage} alt="Inspect" className={`inspect-image ${isImageVisible ? 'visible' : ''}`} />
        </div>
        <div className="port-content">
            <span className={`tool-link ${isBoxVisible ? 'large' : ''}`}>
              Port
            </span>
            <span className="tool-link2">
              Scanner
            </span>
        </div>
        <p className="tool-description">
          <span className="first-words">Discover open ports on a system.</span>
          <p>Assess its security posture with our Port Scanner tool. Gain insights into your network's vulnerabilities and ensure your defenses are up to date with this essential cybersecurity resource.</p>
        </p>
    </Link>
  );
};

export default PortInfo;
