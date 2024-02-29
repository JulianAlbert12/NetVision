import socket
import requests
import nmap
from flask import Flask, jsonify, request

def get_ip_info():
    # Get the public IP address
    public_ip = requests.get('https://api.ipify.org').text

    # Get hostname
    hostname = socket.gethostname()

    # Get local IP address
    local_ip = socket.gethostbyname(hostname)

    # Get host by name
    host_info = socket.gethostbyname_ex(hostname)

    # Summary of IP information
    ip_info = {
        "Public IP": public_ip,
        "Local IP": local_ip,
        "Hostname": hostname,
        "Host by name": host_info
    }

    return ip_info

if __name__ == "__main__":
    ip_info = get_ip_info()
    for key, value in ip_info.items():
        print(f"{key}: {value}")
