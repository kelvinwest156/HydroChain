from flask import Flask, request, jsonify
import subprocess
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Define paths to local files
heatmap_base_path = r'C:\Users\Administrator\Desktop\HydroChain\hydrochain\packages\backend\generated\heatmaps'
trend_path = r'C:\Users\Administrator\Desktop\HydroChain\hydrochain\packages\backend\generated\trends\ghana_historical_rainfall_trend.png'

@app.route('/api/generate-maps', methods=['POST'])
def generate_maps():
    data = request.json
    location = data.get('location')
    
    if not location:
        return jsonify({'error': 'Location not provided'}), 400

    # Construct paths for heatmap based on location
    heatmap_path = os.path.join(heatmap_base_path, f'ghana_rainfall_heatmap_2024_{location}.png')

    # Call Python script to generate heatmap if necessary
    # Example: subprocess.run(['python', 'generate_heatmap.py', location])

    # Check if the heatmap file exists
    if not os.path.exists(heatmap_path):
        return jsonify({'error': 'Heatmap not found'}), 404

    return jsonify({
        'heatmap': heatmap_path,
        'trend': trend_path
    })

if __name__ == '__main__':
    app.run(debug=True)