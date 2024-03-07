import React, { useState } from 'react';
import LoaderComp from '../../loader'; // Import the LoaderComp component
import './Port-Scan-component.css'; // Import CSS file for styling

const PortScanner = () => {
  const [ipAddress, setIPAddress] = useState('');
  const [startPort, setStartPort] = useState(1);
  const [endPort, setEndPort] = useState(65535);
  const [scanResults, setScanResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleIPSubmit = async () => {
    console.log("handleIPSubmit called");
    console.log("IP Address:", ipAddress); // Log the IP address
  
    // Clear previous scan results
    setScanResults(null);
    setError(null);
  
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:5000/scan-ports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target: ipAddress, start_port: startPort, end_port: endPort }),
      });
      const data = await response.json();
      setScanResults(data);
      setLoading(false);
    } catch (error) {
      console.error('Error scanning ports:', error);
      setError('Failed to scan ports. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="port-scanner">
      <div className="input-section">
        <input
            type="text"
            value={ipAddress}
            onChange={(e) => {
                console.log(e.target.value); // Log the input value
                setIPAddress(e.target.value);
            }}
            placeholder="Enter IP address or URL"
            className="input-field" // Apply CSS class for styling
        />
        <input
            type="number"
            value={startPort}
            onChange={(e) => {
                console.log(e.target.value); // Log the input value
                setStartPort(e.target.value);
            }}
            placeholder="Start Port"
            className="input-field" // Apply CSS class for styling
        />
        <input
            type="number"
            value={endPort}
            onChange={(e) => {
                console.log(e.target.value); // Log the input value
                setEndPort(e.target.value);
            }}
            placeholder="End Port"
            className="input-field" // Apply CSS class for styling
        />
        <button onClick={handleIPSubmit} disabled={loading} className="scan-button"> {/* Apply CSS class for styling */}
          {loading ? 'Scanning...' : 'Scan'}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {loading && <LoaderComp />} {/* Render the LoaderComp when loading is true */}
      {scanResults && (
        <div className="scan-results">
          <h3>Scan Results:</h3>
          <ul>
            {Object.entries(scanResults).map(([key, value]) => (
              <li key={key}>
                <strong>{key}: </strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PortScanner;
