import React, { useState } from 'react';
import { Nmap } from 'node-nmap';

const PortScannerComponent = () => {
  const [ipAddress, setIPAddress] = useState('');
  const [scanResults, setScanResults] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = async () => {
    try {
      const nmap = new Nmap();
      const { openPorts } = await nmap.scan({ host: ipAddress });
      setScanResults(openPorts);
      setError(null);
    } catch (error) {
      setScanResults(null);
      setError('Error scanning ports: ' + error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={ipAddress}
        onChange={(e) => setIPAddress(e.target.value)}
        placeholder="Enter IP address"
      />
      <button onClick={handleScan}>Scan Ports</button>
      {error && <p>{error}</p>}
      {scanResults && (
        <ul>
          {scanResults.map((port) => (
            <li key={port}>{port}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PortScannerComponent;
