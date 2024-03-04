from flask import Flask, request, jsonify
import socket
from datetime import datetime

app = Flask(__name__)

def portscan(target):
    socket.setdefaulttimeout(0.30)
    discovered_ports = []
    try:
        t_ip = socket.gethostbyname(target)
    except (UnboundLocalError, socket.gaierror):
        return {"error": "Invalid format. Please use a correct IP or web address"}
    
    t1 = datetime.now()
    for port in range(1, 65536):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            portx = s.connect((t_ip, port))
            discovered_ports.append(str(port))
            portx.close()
        except (ConnectionRefusedError, AttributeError, OSError):
            pass

    t2 = datetime.now()
    total = t2 - t1
    return {
        "message": "Port scan completed",
        "target": t_ip,
        "discovered_ports": discovered_ports,
        "duration": str(total)
    }

@app.route('/scan-ports', methods=['POST'])
def scan_ports():
    data = request.get_json()
    target = data.get('target')
    if not target:
        return jsonify({"error": "Target IP address not provided"}), 400
    
    result = portscan(target)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
