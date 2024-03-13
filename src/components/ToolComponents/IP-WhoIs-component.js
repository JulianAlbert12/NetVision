import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IP-WhoIs-component.css';
import LoaderComp from '../../loader';

const IPInfoComponent = () => {
    const [ipInfo, setIpInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userAgent, setUserAgent] = useState('');
    const [operatingSystem, setOperatingSystem] = useState('');
    const [browser, setBrowser] = useState('');
    const [userInputIP, setUserInputIP] = useState('');
    const [userIP, setUserIP] = useState('');

    useEffect(() => {
        const fetchUserIP = async () => {
            try {
                const response = await axios.get('https://api.ipify.org?format=json');
                setUserIP(response.data.ip);
            } catch (error) {
                console.error('Error fetching user IP:', error);
            }
        };

        fetchUserIP();
        setUserAgent(navigator.userAgent);
    }, []);

    useEffect(() => {
        const osRegex = /(Windows|Macintosh|Linux)/i; 
        const osMatch = userAgent.match(osRegex);
        if (osMatch) {
            setOperatingSystem(osMatch[0]);
        }

        const browserRegex = /(Chrome|Firefox|Safari|Edge|Opera)/i; 
        const browserMatch = userAgent.match(browserRegex);
        if (browserMatch) {
            setBrowser(browserMatch[0]);
        }
    }, [userAgent]);

    const handleInputChange = (event) => {
        setUserInputIP(event.target.value);
    };

    const handleUseMyIP = () => {
        setUserInputIP(userIP);
    };

    const handleSearch = async () => {
        if (userInputIP) {
            setLoading(true);
            try {
                const infoResponse = await axios.get(`http://free.ipwhois.io/json/${userInputIP}`);
                setIpInfo(infoResponse.data);
            } catch (error) {
                console.error('Error fetching IP info:', error);
            }
            setLoading(false);
        }
    };

    
    return (
        <div className="ip-info-container">
        <div className="input-container">
            <input
                type="text"
                value={userInputIP}
                onChange={handleInputChange}
                placeholder="Enter IP address..."
            />
            <button className="button1" onClick={handleUseMyIP}>Use My IP</button>
            <button className="button" onClick={handleSearch}>Search</button>
        </div>

            {loading ? (
                <LoaderComp /> 
            ) : (
                <>
                    {/* Display IP info only if available */}
                    {ipInfo && (
                        <>
                            <div className="ip-info-column">
                                <ul className="ip-info-chart">
                                    <li className="ip-info-layer">
                                        <span>IP:</span>
                                        <div className='IP'><span>{ipInfo.ip}</span> </div>
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
                                        <span>Region:</span>
                                        <span>{ipInfo.region}</span>
                                    </li>
                                    <li className="ip-info-layer">
                                        <span>City:</span>
                                        <span>{ipInfo.city}</span>
                                    </li>
                                    <li className="ip-info-layer">
                                        <span>Organization:</span>
                                        <span>{ipInfo.org}</span>
                                    </li>
                                    <li className="ip-info-layer">
                                        <span>ASN:</span>
                                        <span>{ipInfo.asn}</span>
                                    </li>
                                    <li className="ip-info-layer">
                                        <span>Country:</span>
                                        <span>{ipInfo.country}</span>
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
                </>
            )}
        </div>
    );
};

export default IPInfoComponent;
