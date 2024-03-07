import React, { useState } from 'react';
import './IP-to-decimal.css';


const IPConverterComponent = () => {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');

    const handleConvert = () => {
        if (inputValue.trim() === '') {
            setResult('Please enter an IP address or decimal value.');
            return;
        }

        const isValidIp = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(inputValue);
        const isValidDecimal = /^\d+$/.test(inputValue);

        if (!isValidIp && !isValidDecimal) {
            setResult('Invalid input. Please enter a valid IP address in dotted-quad format or a decimal.');
            return;
        }

        try {
            if (isValidIp) {
                const decimal = ipToDecimal(inputValue);
                setResult(`Decimal representation of ${inputValue}: ${decimal}`);
            } else {
                const ip = decimalToIp(parseInt(inputValue, 10));
                setResult(`IP address of ${inputValue}: ${ip}`);
            }
        } catch (error) {
            setResult('An error occurred. Please try again.');
        }
    };

    const ipToDecimal = (ip) => {
        const octets = ip.split('.');
        let decimal = 0;
        for (let i = 0; i < 4; i++) {
            decimal += parseInt(octets[i]) << (24 - 8 * i);
        }
        return decimal;
    };

    const decimalToIp = (decimal) => {
        return ((decimal >> 24) & 255) + '.' + ((decimal >> 16) & 255) + '.' + ((decimal >> 8) & 255) + '.' + (decimal & 255);
    };

    return (
        <div className="input-container">
            <input
<<<<<<< HEAD
                className="input-field"
=======
                className="IP-input-field"
>>>>>>> 86dd72b (Port styling added)
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter an IP address or decimal"
            />
            <button className="convert-button" onClick={handleConvert}>Convert</button>
            <p>{result}</p>
        </div>
    );
};

export default IPConverterComponent;
