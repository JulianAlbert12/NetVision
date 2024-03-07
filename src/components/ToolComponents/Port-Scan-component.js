import React, { useState } from 'react';

const PortScanner = () => {
  const [ipAddress, setIPAddress] = useState('');
  const [startPort, setStartPort] = useState('1');
  const [endPort, setEndPort] = useState('65535');
  const [scanResults, setScanResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleIPSubmit = async () => {
    console.log("handleIPSubmit called");
    console.log("IP Address:", ipAddress); // Log the IP address
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:5000/scan-ports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target: ipAddress, start_port: startPort, end_port: endPort }),
        mode: 'cors', // Add this line to enable CORS
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
      <h2>Port Scanner</h2>
      <div className="input-section">
        <input
            type="text"
            value={ipAddress}
            onChange={(e) => {
                console.log(e.target.value); // Log the input value
                setIPAddress(e.target.value);
            }}
            placeholder="Enter IP address or URL"
        />
        <input
            type="number"
            value={startPort}
            onChange={(e) => {
                console.log(e.target.value); // Log the input value
                setStartPort(e.target.value);
            }}
            placeholder="Start Port"
        />
        <input
            type="number"
            value={endPort}
            onChange={(e) => {
                console.log(e.target.value); // Log the input value
                setEndPort(e.target.value);
            }}
            placeholder="End Port"
        />
        <button onClick={handleIPSubmit} disabled={loading}>
          {loading ? 'Scanning...' : 'Scan'}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {scanResults && (
        <div className="scan-results">
          <h3>Scan Results:</h3>
          <pre>{JSON.stringify(scanResults, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PortScanner;
