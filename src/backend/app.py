from flask import Flask, request, jsonify
from flask_cors import CORS
import socket
from datetime import datetime

app = Flask(__name__)
CORS(app)

def portscan(target):
    print("Received:", target)
    socket.setdefaulttimeout(0.10)
    discovered_ports = []
    try:
        t_ip = socket.gethostbyname(target)
        print("Resolved IP address:", t_ip)  
    except (UnboundLocalError, socket.gaierror):
        print("Failed to resolve IP address for:", target)  # Log if IP resolution fails
        return {"error": "Invalid format. Please use a correct IP or web address"}
    
    t1 = datetime.now()
    for port in range(1, 250):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            portx = s.connect((t_ip, port))
            discovered_ports.append(str(port))
            s.close()
            print("Port", port, "is open")  # Log if a port is open
        except (ConnectionRefusedError, AttributeError, OSError):
            #print("Port", port, "is closed")  # Log if a port is closed
            pass

    t2 = datetime.now()
    total = t2 - t1
    return {
        "message": "Port scan completed",
        "target": t_ip,
        "discovered_ports": discovered_ports,
        "duration": str(total)
    }

@app.route('/scan-ports', methods=['GET', 'POST'])
def scan_ports():
    data = request.get_json()
    print("Received data:", data)
    target = data.get('target')
    if not target:
        return jsonify({"error": "Target IP address not provided"}), 400
    
    result = portscan(target)
    print("Sending response:", result)  # Log the response being sent
    return jsonify(result)
    print("done")
    
if __name__ == '__main__':
    app.run(debug=True)
