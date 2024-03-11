import React from 'react';
import PortScanner from '../components/ToolComponents/Port-Scan-component';
import FaqItem from '../components/FaqItem';
import '../components/FaqItem.css';
import './pages.css';
import TimeoutImage from '../images/timeout.jpg';


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
            question: 'What are common high-risk ports?',
            answer: 'Commonly used ports are typically highly secure, while other ports may be overlooked and vulnerable to hackers. Commonly hacked TCP port numbers include port 21 (FTP), port 22 (SSH), port 23 (Telnet), port 25 (Simple Mail Transfer Protocol or SMTP), port 110 (POP3), and port 443 (HTTP and Hypertext Transfer Protocol Secure or HTTPS). Commonly targeted TCP and UDP ports include port 53 (DNS), ports 137 to 139 (Windows NetBIOS over TCP/IP), and 1433 and 1434 (Microsoft SQL Server).'
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
            <h5 className='FAQ'>Instructions</h5>
            <div className="summary">
                <p>Fill out all the input boxes with the required information.</p>
                <p><strong>1.</strong> Make sure to enter a valid IP address or URL. Here are some public IPs that can be used for testing purposes:</p>
                <ul>
                    <li><span className="highlighted-ip">45.33.32.156</span> which is belong to <a href="http://scanme.nmap.org/">http://scanme.nmap.org/</a></li>
                    <li><span className="highlighted-ip">176.28.50.165</span> for <a href="http://testphp.vulnweb.com/">http://testphp.vulnweb.com/</a></li>
                </ul>
                <p><strong>2.</strong> Select the range of ports from the starting point to the endpoint.</p>
                <ul>
                    <li>Well-known ports (0-1023): These ports are reserved for system services and applications considered essential for network operation. Examples include port 80 for HTTP, port 443 for HTTPS, and port 22 for SSH.</li>
                    <li>Registered ports (1024-49151): These ports are assigned by the Internet Assigned Numbers Authority (IANA) for specific purposes but are available for general use by applications. Many commonly used services, such as FTP (port 21) and SMTP (port 25), utilize registered ports.</li>
                    <li>Dynamic or private ports (49152-65535): These ports are available for use by client applications and are typically assigned dynamically by the operating system. They are used for temporary communication sessions between client and server applications.</li>
                </ul>

                <p><strong>3.</strong> Specify the timeout duration, in seconds, for each port check.</p>
                <img src={TimeoutImage} alt="Timeout" style={{ width: '45%', marginLeft: '50px', }} />
                <ul>
                    <li>Port Scan Timeout: How long (in seconds) the port scan will try before giving up. </li>
                    <li>A high timeout can prevent the scanner from giving up too quickly.</li>
                    <li>A "Connection timed out" error indicates that the server didn't respond to the client and the client program gave up.</li>
                </ul>


            </div>

            <h5 className='FAQ'>Frequently Asked Questions</h5>
            {faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
        </div>
    );
};

export default PortScanPage;
