# MyProject

Welcome to MyProject! This project is aimed at [briefly describe the purpose or goal of your project].

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [FAQ](#faq)

## Introduction

This project’s main goal is to create a web-based interface for conducting port scans on target IP addresses, using both a frontend developed using React.js and a backend API built with Flask. Our implementation utilizes Flask to create a web application that enables users to perform port scans through a simple HTTP API. The core of the application is a port scanning function written in Python, which leverages the socket module to establish connections to target ports. The Flask app exposes an endpoint /scan-ports, which accepts POST requests containing JSON data specifying the target IP address, port range, and timeout. Upon receiving a request, the app invokes the port scanning function, performs the scan, and returns the results as JSON.

## Features

#### Port Scanner
- Quickly identifies open ports on a target system.
- Essential for network security assessment.
- Helps in identifying potential vulnerabilities.

#### WHOIS Search
- Retrieves domain registration and availability information.
- Provides details on domain ownership and registrar.
- Useful for cybersecurity analysis and intellectual property management.

## Installation
1. Clone the repository to your local machine:
```
git clone https://github.com/JulianAlbert12/NetVision
```
2. Navigate to the project directory:
```
cd NetVision
```
3. Install dependencies:
```
npm install react-scripts
```
4. Run the flask server:
```
cd src/backend/
```
```
python3 app.py
```
3. On a separate terminal, run project:
```
npm start
```

## Usage
The tools provided in this project comes with detailed instructions on its page to help you run the tool effectively. Simply navigate to the respective tool's page to find step-by-step guidance on how to use it.\

**TCP Scanner**\
When following the instructions your input should look like this image below. If you get a red text error, restart the flask server. Any incorrect IP or URL will have a dedicated error message on the screen.
Once you fill out the inputs you should see a loading icon like this:
![Screenshot](https://github.com/JulianAlbert12/NetVision/blob/main/src/images/TCPinputSS.png)

Here is an output of the findings:\
![Screenshot](https://github.com/JulianAlbert12/NetVision/blob/main/src/images/TCPoutput.png)

## FAQ 
**Can I utilize this tool to scan websites like Google or others without proper authorization?**\
_No, using this tool to scan websites without proper authorization is illegal and unethical. The tool is provided under a free license, but it's imperative for users to comply with all applicable laws and ethical standards. The creator strongly advises against any unauthorized or unethical use of the tool. Users are responsible for ensuring they have the necessary permissions to conduct scans. Unauthorized use may result in legal consequences and is contrary to the intended use of the tool._

**Is this tool compatible with all operating systems?**\
_Yes, this tool is designed to be compatible with most operating systems. It is built using technologies that are platform-independent, allowing it to run on Windows, macOS, and Linux-based systems. However, please note that certain features or functionalities may vary depending on the operating system environment._


