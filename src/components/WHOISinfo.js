import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import inspectImage from '../images/information.png';
import './PortInfo.css';

const WHOISinfo = () => {
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [isBoxVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.target.classList.contains('inspect-image2') && entry.isIntersecting) {
                setIsImageVisible(true);
              }
            });
          },
          {
            threshold: 0.4,
          }
        );

        const img = document.querySelector('.inspect-image2');
        if (img) observer.observe(img);


        return () => {
          if (img) observer.unobserve(img);
        };
      }, []);

  return (
    <Link to="/ip-info-page" className={`port-box ${isBoxVisible ? 'visible' : ''}`}>
        <div className="Port-item">
          <img src={inspectImage} alt="Inspect" className={`inspect-image2 ${isImageVisible ? 'visible' : ''}`} />
        </div>
        <div className="port-content2">
            <span className={`tool-link3 ${isBoxVisible ? 'large' : ''}`}>
              WHOIS Search
            </span>
        </div>
        <p className="tool-description">
            <span className="first-words">Uncover secrets behind IPs.</span>
            <p>Reveal digital footprints and unlock valuable insights at your fingertips.
            Learn more about the infrastructure and ownership details with just a few clicks.</p>
        </p>
    </Link>
  );
};

export default WHOISinfo;
