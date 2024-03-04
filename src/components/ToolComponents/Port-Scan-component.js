import React, { useState } from 'react';

const PortScanner = () => {
  const [ipAddress, setIPAddress] = useState('');
  const [scanResults, setScanResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleIPSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:5000/scan-ports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target: ipAddress }),
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
          onChange={(e) => setIPAddress(e.target.value)}
          placeholder="Enter IP address"
        />
        <button onClick={handleIPSubmit} disabled={loading}>
          {loading ? 'Scanning...' : 'Scan Ports'}
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
