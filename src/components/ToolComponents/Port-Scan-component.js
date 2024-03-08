import React, { useState } from 'react';
import LoaderComp from '../../loader'; 
import './Port-Scan-component.css'; 

const portInfo = [
  { port: 21, protocol: 'FTP', description: 'File Transfer Protocol' },
  { port: 22, protocol: 'SSH', description: 'Secure Shell' },
  { port: 23, protocol: 'Telnet', description: 'Telnet' },
  { port: 25, protocol: 'SMTP', description: 'Simple Mail Transfer Protocol' },
  { port: 53, protocol: 'DNS', description: 'Domain Name System' },
  { port: 80, protocol: 'HTTP', description: 'Hypertext Transfer Protocol' },
  { port: 110, protocol: 'POP3', description: 'Post Office Protocol version 3' },
  { port: 143, protocol: 'IMAP', description: 'Internet Message Access Protocol' },
  { port: 443, protocol: 'HTTPS', description: 'HTTP Secure' },
  { port: 3389, protocol: 'RDP', description: 'Remote Desktop Protocol' },
  // Add more ports and their details here...
];


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

  const getPortDetails = (portNumber) => {
    return portInfo.find((port) => port.port === parseInt(portNumber));
  };

  // Helper function to process discovered ports and fetch their details
  const processDiscoveredPorts = () => {
    if (scanResults && scanResults.discovered_ports) {
      // Split the discovered_ports string into an array of numbers
      const portsArray = scanResults.discovered_ports.split(',').map(Number);
      return portsArray.map((portNumber) => getPortDetails(portNumber)).filter(Boolean);
    }
    return [];
  };

  const openPortsDetails = processDiscoveredPorts();

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
        <>
          <div className="scan-results">
            <h3>Scan Summary:</h3>
            <ul>
              {Object.entries(scanResults).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}: </strong> {value}
                </li>
              ))}
            </ul>
          </div>

          {openPortsDetails.length > 0 && (
            <div className="port-details">
              <h3>Open Ports Details:</h3>
              <table>
                <thead>
                  <tr>
                    <th>Port #</th>
                    <th>Application Layer Protocol</th>
                    <th>Description</th>
                    <th>State</th>
                  </tr>
                </thead>
                <tbody>
                  {openPortsDetails.map((details) => (
                    <tr key={details.port}>
                      <td>{details.port}</td>
                      <td>{details.protocol}</td>
                      <td>{details.description}</td>
                      <td><img src={`${process.env.PUBLIC_URL}/check.png`} alt="Open" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PortScanner;
