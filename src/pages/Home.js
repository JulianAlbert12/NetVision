import React, { useEffect, useState } from 'react';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  const [headerFontSize, setHeaderFontSize] = useState('50px'); // Start at 80px
  const [subTextFontSize, setSubTextFontSize] = useState('25px'); // Start at 30px
  const [containerHeight, setContainerHeight] = useState('50vh');
  const [isBackgroundHidden, setIsBackgroundHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
  
      if (scrollTop > 0) {
        setHeaderFontSize('30px');
        setSubTextFontSize('0px');
        setContainerHeight('15vh');
        setIsBackgroundHidden(true);
      } else {
        setHeaderFontSize('50px');
        setSubTextFontSize('30px');
        setContainerHeight('35vh');
        setIsBackgroundHidden(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  return (
    <div className="home-container" style={{ height: containerHeight }}>
      <div className={`background-container ${isBackgroundHidden ? 'background-hidden' : ''}`}></div>
      <div className="text-container">
      </div>
      <h1 className="home-text" style={{ fontSize: headerFontSize }}>
          NetVision
        </h1>
        <h1 className="sub-text" style={{ fontSize: subTextFontSize }}>
          Toolbox for Network and IP Managing
        </h1>
      </div>
  );  
};

export default Home;
