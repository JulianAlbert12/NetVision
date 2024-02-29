import React from 'react';
import IPInfoComponent from '../components/ToolComponents/IP-WhoIs-component';
import './pages.css'

const IPInfoPage = () => {
    return (
        <div>
            <h4 className="page-title">IP Information Page</h4>            
            <div>
                <IPInfoComponent />
            </div>
            
            <div className="summary">
                <p>
                    This feature provides comprehensive information about your IP address, giving you insights into various aspects of your online presence. Understanding this information is crucial for several reasons:
                </p>
                <ul>
                    <li><span><strong>IP Address Details:</strong></span> You can view your IP address and its type, providing essential information about your network connection.</li>
                    <li><span><strong>Internet Service Provider</strong> (ISP):</span> Knowing your ISP helps you understand the organization providing your internet service, which can be useful for troubleshooting connectivity issues or assessing service quality.</li>
                    <li><span><strong>User Agent:</strong></span> This feature displays your browser's user agent string, which contains information about your browser, operating system, and device. It's essential for web developers and support teams to diagnose compatibility issues or provide tailored support.</li>
                    <li><span><strong>Operating System and Browser:</strong></span> Identifying your operating system and browser version helps ensure compatibility with websites and applications and enables developers to optimize user experiences accordingly.</li>
                    <li><span><strong>Geolocation:</strong></span> You can access approximate details about your geographical location, including country, region, city, latitude, longitude, and timezone. This information is valuable for personalized services, content localization, and targeted advertising.</li>
                </ul>
                <p>
                    By providing detailed insights into your online identity and presence, this feature empowers users to make informed decisions, enhance security measures, and optimize their online experiences.
                </p>
            </div>
        </div>
    );
};

export default IPInfoPage;
