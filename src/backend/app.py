from flask import Flask, request, jsonify
from flask_cors import CORS
import socket
from datetime import datetime

app = Flask(__name__)
CORS(app)

def portscan(target, start_port, end_port, timeout):
    print("Received:", target)
    socket.setdefaulttimeout(float(timeout))  # Set the socket timeout    
    ports = []
    try:
        t_ip = socket.gethostbyname(target)
        print("Resolved IP address:", t_ip)  
    except (UnboundLocalError, socket.gaierror):
        print("Failed to resolve IP address for:", target)  # Log if IP resolution fails
        return {"error": "Invalid format. Please use a correct IP or web address"}
    
    t1 = datetime.now()
    for port in range(int(start_port), int(end_port) + 1):  # Convert start_port and end_port to integers
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            portx = s.connect((t_ip, port))
            ports.append(str(port))
            s.close()
            print("Port", port, "is open")  # Log if a port is open
        except (ConnectionRefusedError, AttributeError, OSError):
            #print("Port", port, "is closed")  # Log if a port is closed
            pass

    t2 = datetime.now()
    total = t2 - t1
    return {
        "target IP": t_ip,
        "ports": ", ".join(ports),  # Join discovered ports into a comma-separated string
        "message": "Port scan completed",
        "duration": str(total)
    }


@app.route('/scan-ports', methods=['GET', 'POST'])
def scan_ports():
    data = request.get_json()
    print("Received data:", data)
    target = data.get('target')
    start_port = data.get('start_port', 1)  # Default start port is 1
    end_port = data.get('end_port', 65535)  # Default end port is 65535
    print("Start port:", start_port)
    print("End port:", end_port)
    
    if not target:
        return jsonify({"error": "Target IP address not provided"}), 400
    
    result = portscan(target, start_port, end_port, data.get('timeout'))
    print("Sending response:", result)  # Log the response being sent
    return jsonify(result)

    
if __name__ == '__main__':
    app.run(debug=True)
