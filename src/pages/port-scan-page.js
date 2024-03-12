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


            <h5 className='FAQ'>Results</h5>
            <div className="summary">
                <p>The risk levels for these ports were determined based on several factors that include the protocol's security features, common vulnerabilities, the frequency and impact of known attacks, and the best practices for their use and management. Here's a breakdown of the rationale:</p>
                <p><strong>Common Vulnerabilities and Exploits (CVEs):</strong> Ports and protocols with a high number of CVEs, particularly those that allow remote code execution or unauthorized access, are rated higher in risk.</p>
                <p><strong>Protocol Security Features:</strong> Protocols lacking encryption or those that transmit data in clear text (e.g., FTP, Telnet) are considered high risk due to the ease of interception and manipulation of the data they transmit.</p>
                <p><strong>Frequency of Attacks:</strong> Some protocols are more commonly targeted by attackers due to their widespread use and the valuable data they can provide access to. For example, RDP (Remote Desktop Protocol) has been a popular target for ransomware attacks.</p>
                <p><strong>Impact of Exploitation:</strong> The potential damage or impact of an attack can elevate the risk level. For example, exploits that allow an attacker to gain control of an email server (via SMTP) can lead to significant breaches of confidentiality and integrity.</p>
                <p><strong>Best Practices and Recommendations:</strong>  Security best practices and industry recommendations often suggest disabling or replacing protocols known to be insecure (e.g., replacing HTTP with HTTPS).</p>
                <p><strong>Default Configuration and Authentication Strength:</strong>  Services that by default have weak authentication mechanisms or are commonly left in a poorly secured state increase the risk level due to the higher likelihood of successful exploitation.</p>
                <p>Given these considerations:</p>
                <ul>
                    <li><strong>High Risk: </strong>Ports associated with protocols that are outdated, lack encryption, or are frequently targeted by attackers due to widespread use and critical vulnerabilities.</li>
                    <li><strong>Medium Risk: </strong>Ports for protocols that have some form of security but still have known vulnerabilities or weaker forms of authentication, making them somewhat easier targets.</li>
                    <li><strong>Low Risk: </strong> Ports associated with protocols that implement strong security measures by default, including encryption and secure authentication methods, and have fewer known vulnerabilities.</li>
                </ul>
                <p>It's important to note that this assessment can evolve over time as new vulnerabilities are discovered, patches are released, and security practices are updated. Also, the context in which a service is deployed (such as its exposure to the internet, internal network segmentation, and other mitigating controls) can significantly affect the actual risk level.</p>
            </div>

            
            <h5 className='FAQ'>Steps to Mitigate Risks from Open Ports</h5>
            <div className="summary">
            <ol>
                <li><strong>Close Unnecessary Ports:</strong> If possible, close any open ports that are not essential for the operation of the system or service. This reduces the attack surface and limits potential entry points for attackers.</li>
                <li><strong>Patch and Update:</strong> Ensure that all software, operating systems, and services running on the system are up to date with the latest security patches and updates. Vulnerabilities in outdated software can be exploited by attackers.</li>
                <li><strong>Implement Access Controls:</strong> Restrict access to open ports by implementing appropriate access controls such as firewalls, network segmentation, and strong authentication mechanisms. Only allow traffic to open ports from trusted sources.</li>
                <li><strong>Harden Configuration:</strong> Configure services running on open ports securely by following best practices and security guidelines. This may involve disabling unnecessary features, using secure encryption protocols, and enabling logging and monitoring.</li>
                <li><strong>Monitor and Audit:</strong> Implement continuous monitoring and auditing of network traffic, system logs, and security events to detect and respond to any suspicious activity or attempted attacks targeting open ports.</li>
                <li><strong>Implement Intrusion Detection and Prevention Systems (IDPS):</strong> Deploy IDPS solutions to detect and block malicious network traffic targeting open ports in real-time. These systems can help identify and mitigate attacks more effectively.</li>                
                <li><strong>Regularly Conduct Security Assessments:</strong> Perform regular security assessments, including vulnerability scanning and penetration testing, to identify and address any new vulnerabilities or misconfigurations that may arise over time.</li>                
                <li><strong>Educate Users:</strong> Educate users and administrators about the risks associated with open ports and provide training on security best practices, such as avoiding opening unnecessary ports and recognizing potential security threats.</li>
            </ol>

            </div>

            <h5 className='FAQ'>Frequently Asked Questions</h5>
            {faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
        </div>
    );
};

export default PortScanPage;
