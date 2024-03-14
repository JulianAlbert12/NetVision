import React from 'react';
import FaqItem from '../components/FaqItem';
import '../components/FaqItem.css';
import IPToolsBox from '../components/IPTools'
import IPInfoComponent from '../components/ToolComponents/IP-WhoIs-component';
import './pages.css'

const IPInfoPage = () => {
    const faqs = [
        {
            question: 'What is a WHOIS search?',
            answer: 'A WHOIS search is a query performed to retrieve information about the owner of a domain name, IP address, or autonomous system number (ASN). It provides details such as registration and expiration dates, contact information, and domain name server (DNS) details.'
        },
        {
            question: 'How does a WHOIS search work?',
            answer: 'A WHOIS search queries a WHOIS database maintained by domain registrars, internet service providers (ISPs), and regional internet registries (RIRs). When you perform a WHOIS search, the database is queried based on the domain name, IP address, or ASN you provide, and the relevant registration information is returned.'
        },
        {
            question: 'Why are WHOIS searches used?',
            answer: 'WHOIS searches are used for various purposes, including domain name registration verification, identifying domain ownership, investigating network abuse, and gathering contact information for legal or administrative purposes. They are valuable tools for cybersecurity professionals, law enforcement agencies, domain registrars, and internet users.'
        },
        {
            question: 'What information can I find in a WHOIS search?',
            answer: 'In a WHOIS search, you can find information such as the domain owner\'s name, organization, email address, physical address, phone number, registration and expiration dates, domain name server (DNS) details, and sometimes administrative and technical contact information.'
        },
        {
            question: 'Are there any limitations to WHOIS searches?',
            answer: 'While WHOIS searches provide valuable information, there are limitations to consider. Some domain registrars and registrants may choose to mask or hide certain contact details for privacy reasons. Additionally, some country-code top-level domains (ccTLDs) may have different WHOIS policies and may not provide as much information as generic top-level domains (gTLDs). Furthermore, WHOIS databases may not always be up-to-date or accurate.'
        },
    ];
    

    return (
        <div className="components">
        <h4 className="page-title">WHOIS Search</h4>

        <IPInfoComponent />
            <div className="summary">
                <p>
                    This feature provides comprehensive information about your IP address, giving you insights into various aspects of your online presence. Understanding this information is crucial for several reasons:
                </p>
                <ul>
                    <li>
                        <strong>IP:</strong> [IP address]
                    </li>
                    <li>
                        <strong>Type:</strong> [Type of IP address (e.g., IPv4 or IPv6)]
                    </li>
                    <li>
                        <strong>ISP:</strong> [Internet Service Provider]
                    </li>
                    <li>
                        <strong>Region:</strong> [Region where the IP is located]
                    </li>
                    <li>
                        <strong>City:</strong> [City where the IP is located]
                    </li>
                    <li>
                        <strong>Organization:</strong> [Organization associated with the IP]
                    </li>
                    <li>
                        <strong>ASN:</strong> [Autonomous System Number]
                    </li>
                    <li>
                        <strong>Country:</strong> [Country where the IP is located]
                    </li>
                    <li>
                        <strong>Latitude:</strong> [Latitude coordinate of the IP location]
                    </li>
                    <li>
                        <strong>Longitude:</strong> [Longitude coordinate of the IP location]
                    </li>
                    <li>
                        <strong>Timezone:</strong> [Timezone of the IP location]
                    </li>
                </ul>

                <p>
                    By providing detailed insights into your online identity and presence, this feature empowers users to make informed decisions, enhance security measures, and optimize their online experiences.
                </p>
            </div>
            <h5 className='FAQ'>Frequently Asked Questions</h5>
            {faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
        <div className="ip-tools-box-center">
        <IPToolsBox />
        </div>
    </div>
    );
};

export default IPInfoPage;
