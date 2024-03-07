import React from 'react';
import PortScanner from '../components/ToolComponents/Port-Scan-component';
import './pages.css';

const PortScanPage = () => {
    return (
        <div>
            <h4 className="page-title">Port Scanner</h4>
           
            <div className="summary">
                <p>
                    Port scanners are tools used in networking and cybersecurity to discover which ports are open on a target system. Ports are virtual endpoints for communication in networked environments, and understanding which ports are open can provide valuable insights into the security and accessibility of a system.
                </p>
                <h5>Uses of Port Scanners</h5>
                <ul>
                    <li>
                        <strong>Security Assessment:</strong> Port scanners are commonly used by cybersecurity professionals to assess the security posture of a network or system. By identifying open ports, security vulnerabilities can be uncovered and addressed proactively.
                    </li>
                    <li>
                        <strong>Network Administration:</strong> Network administrators use port scanners to monitor and manage network resources. They can detect unauthorized services running on network devices and ensure that only necessary ports are open.
                    </li>
                    <li>
                        <strong>Penetration Testing:</strong> Ethical hackers and penetration testers utilize port scanners to simulate cyber attacks and identify potential entry points into a system. By scanning for open ports, they can assess the effectiveness of security measures and recommend improvements.
                    </li>
                </ul>
            </div>
            <PortScanner />
        </div>
    );
};

export default PortScanPage;
