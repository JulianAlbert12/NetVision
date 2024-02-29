from flask import Flask, jsonify, request
import nmap
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/scan-ports', methods=['POST'])
def scan_ports():
    # Get the target IP from the request
    target = request.json.get('target')

    # Create an instance of the Nmap PortScanner
    nm = nmap.PortScanner()

    # Set the options for the scan
    options = "-sV -sC"

    # Perform the scan
    nm.scan(target, arguments=options)

    # Prepare the response
    result = {}
    for host in nm.all_hosts():
        host_result = {}
        for protocol in nm[host].all_protocols():
            port_info = nm[host][protocol]
            for port, state in port_info.items():
                host_result[port] = state
        result[host] = host_result

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
