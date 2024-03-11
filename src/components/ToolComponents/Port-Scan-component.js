import React, { useState } from 'react';
import LoaderComp from '../../loader'; 
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './Port-Scan-component.css'; 

const portInfo = [
  { port: 21, protocol: 'FTP', description: 'File Transfer Protocol', risk: 'High',
    attacks: 'brute-force, anonymous authentication, cross-site scripting, directory traversal attacks', recomendation: 'Disable always. Use SSHv2 or deploy the O&M audit system.' },
  { port: 22, protocol: 'SSH', description: 'Secure Shell', risk: 'Medium', 
    attacks: 'brute-force, leaked SSH keys', recomendation: 'Disable recommended. If the port must be used, use SSHv2 and strong authentication.' },
  { port: 23, protocol: 'Telnet', description: 'Telnet', risk: 'High', 
    attacks: 'credential brute-forcing, spoofing and credential sniffing, etc.', recomendation: 'Disable always. Use SSHv2 or deploy the O&M audit system.' },
  { port: 25, protocol: 'SMTP', description: 'Simple Mail Transfer Protocol', risk: 'High',
    attacks: 'spoofing, spamming', recomendation: 'Disable always. Use SMTPS instead.' },
  { port: 53, protocol: 'DNS', description: 'Domain Name System', risk: 'Medium',
    attacks: 'DDoS attack', recomendation: 'Disable always.' },
  { port: 80, protocol: 'HTTP', description: 'Hypertext Transfer Protocol', risk: 'High',
    attacks: 'cross-site scripting, SQL injections, cross-site request forgeries and DDoS attacks', recomendation: 'Disable recommended. Use HTTPS instead.' },
  { port: 110, protocol: 'POP3', description: 'Post Office Protocol version 3', risk: 'High',
    attacks: 'MitM, spoofing attacksw', recomendation: 'Disable always. Use POP3S instead.' },
  { port: 143, protocol: 'IMAP', description: 'Internet Message Access Protocol', risk: 'High',
    attacks: 'sniffing, spam/phishing, MitM, brute force, DoS', recomendation: 'Disable always. Use IMAPS instead.' },
  { port: 443, protocol: 'HTTPS', description: 'HTTP Secure', risk: 'Low',
    attacks: 'MitM, SQL injections, DDoS, cross-site forgery', recomendation: 'Disable recommended if unused, considered a secure port.' },
  { port: 465, protocol: 'SMTP', description: 'SMTP over SSL', risk: 'Medium',
    attacks: 'spoofed attack, DoS', recomendation: 'Disable recommended. Use startTLS instead' },
  { port: 587, protocol: 'SMTPS', description: 'SMTP with TLS and STARTTLS', risk: 'Low',
    attacks: 'DDoS', recomendation: 'Considered to be a secure port.' },
  { port: 1723, protocol: 'PPTP', description: 'Point-to-Point Tunneling Protocol', risk: 'High',
    attacks: 'MitM, bit-flipping, DoS, PoC exploit', recomendation: 'Disable recomended.' },
  { port: 2000, protocol: 'CISCO-SRVS', description: 'Cisco SCCP (Skinny) Server', risk: 'Medium',
    attacks: 'DoS', recomendation: 'Use with caution and secure properly.' },
  { port: 3389, protocol: 'RDP', description: 'Remote Desktop Protocol', risk: 'High',
    attacks: 'session hijacking, on-path attacks, install malware', recomendation: 'Disable always. RDP majority of cyber attacks.' },
  { port: 8291, protocol: 'Winbox', description: 'Administer MikroTik RouterOS devices.', risk: 'High',
    attacks: 'unauthenticated remote attacker', recomendation: 'Disable recommended if unused.'}
];


const PortScanner = () => {
  const [ipAddress, setIPAddress] = useState('');
  const [startPort, setStartPort] = useState();
  const [endPort, setEndPort] = useState();
  const [timeout, setTimeout] = useState('');
  const [scanResults, setScanResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleIPSubmit = async () => {
    console.log("handleIPSubmit called");
    console.log("IP Address:", ipAddress); // Log the IP address
  
    setScanResults(null);
    setError(null);
  
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:5000/scan-ports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target: ipAddress, start_port: startPort, end_port: endPort, timeout: timeout}),
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
    if (scanResults && scanResults.ports) {
      // Split the ports string into an array of numbers
      const portsArray = scanResults.ports.split(',').map(Number);
      return portsArray.map((portNumber) => getPortDetails(portNumber)).filter(Boolean);
    }
    return [];
  };

  const openPortsDetails = processDiscoveredPorts();

  const riskDistribution = { High: 0, Medium: 0, Low: 0 };
  openPortsDetails.forEach(port => {
    if (port.risk) {
      riskDistribution[port.risk]++;
    }
  });

  const COLORS = { High: '#ff4949', Medium: '#ffbb28', Low: '#00C49F' };
  const data = [
    { name: 'High Risk', value: riskDistribution.High },
    { name: 'Medium Risk', value: riskDistribution.Medium },
    { name: 'Low Risk', value: riskDistribution.Low },
  ];

  return (
      <div className="port-scanner">
        <p>Fill out all sections. Click <span onClick={() => document.getElementById('end-of-page').scrollIntoView({ behavior: 'smooth' })}><u>here</u></span> for help.</p>
        <div className="input-section">
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => {
              console.log(e.target.value); // Log the input value
              setIPAddress(e.target.value);
            }}
            placeholder="Enter IP address or URL"
            className="input-field input-ip-url" // Apply CSS class for styling
          />
          <div className="port-range-inputs"> {/* New wrapper for port inputs */}
            <input
              type="number"
              value={startPort}
              onChange={(e) => {
                console.log(e.target.value); // Log the input value
                setStartPort(e.target.value);
              }}
              placeholder="Start Port"
              className="input-field port-input" // Apply CSS class for styling
            />
            <input
              type="number"
              value={endPort}
              onChange={(e) => {
                console.log(e.target.value); // Log the input value
                setEndPort(e.target.value);
              }}
              placeholder="End Port"
              className="input-field port-input" // Apply CSS class for styling
            />
          </div>
          <input
            type="number"
            value={timeout}
            onChange={(e) => {
              console.log(e.target.value); // Log the input value
              setTimeout(e.target.value);
            }}
            placeholder="Timeout (in seconds)"
            className="input-field" // Apply CSS class for styling
          />

          <button onClick={handleIPSubmit} disabled={loading} className="scan-button">
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
                    <th>Port</th>
                    <th>State</th>
                    <th>Application Layer Protocol</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {openPortsDetails.map((details) => (
                    <tr key={details.port}>
                      <td>{details.port}</td>
                      <td><img src={`${process.env.PUBLIC_URL}/check.png`} alt="Open" /></td>
                      <td>{details.protocol}</td>
                      <td>{details.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {openPortsDetails.length > 0 && (
        <div className="port-details">
          <hr style={{ margin: '30px auto', width: '100%' }} />
          <h3>Vulnerability Recommendations:</h3>
          <table>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#fa060699' }}>Port </th>
                <th style={{ backgroundColor: '#fa060699' }}>Prone Attacks</th>
                <th style={{ backgroundColor: '#fa060699' }}>Risk</th>
                <th style={{ backgroundColor: '#fa060699' }}>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {openPortsDetails.map((details) => (
                <tr key={details.port}>
                  <td>{details.port}</td>
                  <td>{details.attacks}</td>
                  <td>{details.risk}</td>
                  <td>{details.recomendation}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <PieChart width={400} height={400}>
              <Pie data={data} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name.split(' ')[0]]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      )}



      <div id="end-of-page" /> 
    </div>

  );
};

export default PortScanner;
