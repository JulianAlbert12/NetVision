import React from 'react';
import './ScanImg.css'; // Add CSS file for styling
import Result from '../images/WHOISresult.png';

const CenteredImage = () => {
  return (
    <div className="centered-image-container">
      <img src={Result} alt="Centered" className="centered-image2" />
    </div>
  );
};

export default CenteredImage;
