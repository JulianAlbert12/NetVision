from flask import Flask, request, render_template
import threading
import your_port_scanner_script  # Assuming your script is modular and can be imported

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')  # Create an index.html file in a folder named templates

@app.route('/scan', methods=['POST'])
def scan():
    target = request.form['target']
    # Assuming your script has a function called 'start_scan' that takes the target and returns results
    results = your_port_scanner_script.start_scan(target)
    return render_template('results.html', results=results)  # Display results in another HTML file

if __name__ == '__main__':
    app.run(debug=True)
