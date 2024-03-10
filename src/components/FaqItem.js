// FaqItem.js
import React, { useState } from 'react';
import './FaqItem.css'; 

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="faq-item">
            <button className="faq-question" onClick={toggleOpen}>
                {question}
            </button>
            <div className={`faq-answer ${isOpen ? 'open' : ''}`}>{answer}</div>
        </div>
    );
};

export default FaqItem;
