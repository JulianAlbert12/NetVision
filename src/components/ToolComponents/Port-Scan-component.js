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
  { port: 587, protocol: 'SMTPS', description: 'SMTP with TLS and STARTTLS', risk: 'Low',
    attacks: 'DDoS', recomendation: 'Considered to be a secure port.' },
  { port: 993, protocol: "IMAPS", description: "IMAP over SSL/TLS for secure email retrieval", risk: "Low",
    attacks: "Eavesdropping on insecure connections", recommendation: "Ensure SSL/TLS is properly configured and up to date." },
  { port: 995, protocol: "POP3S", description: "POP3 over SSL/TLS for secure email retrieval", risk: "Low",
    attacks: "Eavesdropping on insecure connections", recommendation: "Ensure SSL/TLS is properly configured and up to date." },
  { port: 1723, protocol: 'PPTP', description: 'Point-to-Point Tunneling Protocol', risk: 'High',
    attacks: 'MitM, bit-flipping, DoS, PoC exploit', recomendation: 'Disable recomended.' },
  { port: 2000, protocol: 'CISCO-SRVS', description: 'Cisco SCCP (Skinny) Server', risk: 'Medium',
    attacks: 'DoS', recomendation: 'Use with caution and secure properly.' },
  { port: 2082, protocol: "cPanel default", description: "cPanel's default port for unsecured web management interface", risk: "Medium",
    attacks: "Unauthorized access, Brute-force", recommendation: "Use HTTPS version if possible, secure with strong passwords and firewall rules." },
  { port: 2083, protocol: "cPanel SSL", description: "cPanel's default port for secured web management interface", risk: "Low",
    attacks: "Brute-force attacks on weak credentials", recommendation: "Use strong, unique passwords and consider two-factor authentication." },
  { port: 2086, protocol: "WHM unsecured", description: "WebHost Manager (WHM) default port for unsecured access", risk: "Medium",
    attacks: "Unauthorized access, Brute-force", recommendation: "Prefer secure port 2087 with SSL, enforce strong authentication practices." },
  { port: 2087, protocol: "WHM SSL", description: "WebHost Manager (WHM) secured access over SSL", risk: "Low",
    attacks: "Brute-force attacks on weak credentials", recommendation: "Use strong passwords and consider two-factor authentication." },
  { port: 2095, protocol: "Webmail HTTP", description: "Web-based email access over unsecured HTTP", risk: "Medium",
    attacks: "Eavesdropping, Session hijacking", recommendation: "Prefer HTTPS webmail access to protect data in transit." },
  { port: 2096, protocol: "Webmail HTTPS", description: "Web-based email access over secured HTTPS", risk: "Low",
    attacks: "Brute-force attacks on weak credentials", recommendation: "Use strong passwords and secure the email server configuration." },
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

  const handleNewScan = () => {
    setIPAddress('');
    setStartPort('');
    setEndPort('');
    setTimeout('');
    setScanResults(null);
    setError(null);
    setLoading(false);
  };
  
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

  const COLORS = { High: '#C21807', Medium: '#ffbb28', Low: '#03C04A' };
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
                <th style={{ backgroundColor: '#C21807' }}>Port </th>
                <th style={{ backgroundColor: '#C21807' }}>Prone Attacks</th>
                <th style={{ backgroundColor: '#C21807' }}>Risk</th>
                <th style={{ backgroundColor: '#C21807' }}>Recommendation</th>
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
              <Tooltip/>
              <Legend />
            </PieChart>
          </div>
          <h3>Results:</h3>
          <p>The risk levels for these ports were determined based on several factors that include the protocol's security features, common vulnerabilities, the frequency and impact of known attacks, and the best practices for their use and management. </p>
          <p>Click <span onClick={() => document.getElementById('end-of-page').scrollIntoView({ behavior: 'smooth' })}><u>here</u></span> for more information.</p>              
          <button onClick={handleNewScan} className="reset-button">Reset</button>
        </div>
      )}


    <div id="end-of-page" /> 
  </div>
  );
};

export default PortScanner;
