import React from 'react';
import PortScanner from '../components/ToolComponents/Port-Scan-component';
import FaqItem from '../components/FaqItem';
import '../components/FaqItem.css';
import './pages.css';

const PortScanPage = () => {
    const faqs = [
        {
            question: 'What is a port scanner?',
            answer: 'Port scanners are tools used in networking and cybersecurity to discover which ports are open on a target system.'
        },
        {
            question: 'How do port scanners work?',
            answer: 'Port scanners work by sending packets to specific ports on a system and listening for responses, indicating whether the port is open, closed, or filtered.'
        },
        {
            question: 'Why are port scanners used in cybersecurity?',
            answer: 'Port scanners are used in cybersecurity to identify open ports on target systems. This information is crucial for assessing the security posture of a network or system. By discovering open ports, cybersecurity professionals can identify potential vulnerabilities that could be exploited by attackers. Port scanners help in proactive security measures by enabling the identification and mitigation of these vulnerabilities before they are exploited by malicious actors.'
        },
        {
            question: 'Are there any limitations or drawbacks to using port scanners?',
            answer: 'Port scanners are pivotal tools in cybersecurity for uncovering open ports on target systems, providing crucial insights into network security. While invaluable, they do have limitations. They may struggle with firewall restrictions, triggering intrusion detection systems, and occasionally yielding false positives. Moreover, port scanning can be resource-intensive, impacting network bandwidth and system performance. Despite these challenges, port scanners are essential for identifying vulnerabilities and evaluating network security.'
        },
    ];

    return (
        <div>
            <h4 className="page-title">TCP Connect Scan</h4>
           
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
                <h5 className='FAQ'>Frequently Asked Questions</h5>
                {faqs.map((faq, index) => (
                    <FaqItem key={index} question={faq.question} answer={faq.answer} />
                ))}
        </div>
    );
};

export default PortScanPage;
