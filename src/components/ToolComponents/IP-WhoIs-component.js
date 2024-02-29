import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IP-WhoIs-component.css';
import LoaderComp from '../../loader';

const IPInfoComponent = () => {
    const [ipInfo, setIpInfo] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [userAgent, setUserAgent] = useState('');
    const [operatingSystem, setOperatingSystem] = useState('');
    const [browser, setBrowser] = useState('');

    useEffect(() => {
        const fetchIPInfo = async () => {
            try {
                const response = await axios.get('https://api.ipify.org?format=json');
                const clientIP = response.data.ip;
                // Now you have the client's IP address, you can use it to fetch more information
                const infoResponse = await axios.get(`http://free.ipwhois.io/json/${clientIP}`);
                setIpInfo(infoResponse.data);
                setLoading(false); // Set loading to false when data is fetched
            } catch (error) {
                console.error('Error fetching IP info:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchIPInfo();

        // Get user agent when component mounts
        setUserAgent(navigator.userAgent);
    }, []);

    useEffect(() => {
        // Extract operating system from user agent string
        const osRegex = /(Windows|Macintosh|Linux)/i; // Regular expression to match common operating systems
        const osMatch = userAgent.match(osRegex);
        if (osMatch) {
            setOperatingSystem(osMatch[0]);
        }

        // Extract browser from user agent string
        const browserRegex = /(Chrome|Firefox|Safari|Edge|Opera)/i; // Regular expression to match common browsers
        const browserMatch = userAgent.match(browserRegex);
        if (browserMatch) {
            setBrowser(browserMatch[0]);
        }
    }, [userAgent]);

    return (
        <div className="ip-info-container">
            {loading ? (
                <LoaderComp /> // Render LoaderComp while loading
            ) : (
                <>
                    <div className="ip-info-column">
                        <ul className="ip-info-chart">
                            <li className="ip-info-layer">
                                <span>IP:</span>
                                <span>{ipInfo.ip}</span>
                            </li>
                            <li className="ip-info-layer">
                                <span>Type:</span>
                                <span>{ipInfo.type}</span>
                            </li>
                            <li className="ip-info-layer">
                                <span>ISP:</span>
                                <span>{ipInfo.isp}</span>
                            </li>
                            <li className="ip-info-layer">
                                <span>User Agent:</span>
                                <span>{userAgent}</span>
                            </li>
                            <li className="ip-info-layer">
                                <span>Operating System:</span>
                                <span>{operatingSystem}</span>
                            </li>
                            <li className="ip-info-layer">
                                <span>Browser:</span>
                                <span>{browser}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="ip-info-column">
                        <ul className="ip-info-chart">
                            <li className="ip-info-layer">
                                <span>Country:</span>
                                <span>{ipInfo.country}</span>
                            </li>
                            <li className="ip-info-layer">
                                <span>Region:</span>
                                <span>{ipInfo.region}</span>
                            </li>
                            <li className="ip-info-layer">
                                <span>City:</span>
                                <span>{ipInfo.city}</span>
                            </li>
                            <li className="ip-info-layer">
                                <span>Latitude:</span>
                                <span>{ipInfo.latitude}</span>
                            </li>
                            <li className="ip-info-layer">
                                <span>Longitude:</span>
                                <span>{ipInfo.longitude}</span>
                            </li>
                            <li className="ip-info-layer">
                                <span>Timezone:</span>
                                <span>{ipInfo.timezone}</span>
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default IPInfoComponent;
