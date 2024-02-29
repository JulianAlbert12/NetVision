import React, { useState } from 'react';
import './pages.css'; // Import CSS file for styling
import PortScannerComponent from '../components/ToolComponents/PortScan-component'; // Import the PortScannerComponent

const PortScannerPage = () => {
  return (
    <div className="port-scanner-page">
      <h2>Port Scanner</h2>
      <PortScannerComponent />
    </div>
  );
};

export default PortScannerPage;
