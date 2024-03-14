import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home'; 
import About from './components/About';
import IPToolsBox from './components/IPTools';
import IPInfoPage from './pages/IP-info-page';
import IPdecimalPage from './pages/IP-decimal-page';
import PortScan from './pages/port-scan-page';
import PortInfo from './components/PortInfo';
import WHOISinfo from './components/WHOISinfo';
import ScanImg from './components/ScanImg';
import WHoImg from './components/WhoImg';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="App-header">
          <Routes>
            <Route path="/" element={
            <>
            <Home />
            <About />
            <IPToolsBox />
            <PortInfo />
            <ScanImg />
            <WHOISinfo />
            <WHoImg />
            </>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/ip-info-page" element={<IPInfoPage />} />
            <Route path="/ip-decimal-page" element={<IPdecimalPage />} />
            <Route path="/port-scan-page" element={<PortScan />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
