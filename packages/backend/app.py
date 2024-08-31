from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import rasterio
from scipy import stats
from scipy.ndimage import gaussian_filter
import os
import matplotlib

matplotlib.use('Agg')

app = Flask(__name__)
CORS(app, resources={r"/generate": {"origins": "http://localhost:3000"}})

def calculate_sen_slope(x, y):
    slopes = []
    n = len(x)
    for i in range(n):
        for j in range(i + 1, n):
            slope = (y[j] - y[i]) / (x[j] - x[i])
            slopes.append(slope)
    return np.median(slopes)

@app.route('/generate', methods=['POST'])
def generate_rainfall_data():
    data = request.json
    location = data.get('location', '')
    
    # Example paths for the raster files and other generated files
    raster_path = r"C:\Users\Administrator\Desktop\HydroChain\hydrochain\packages\backend\static\'ghana_rainfall_2024.tif"
    trend_path = 'static/rainfall_trend.png'
    
    try:
        # Generate Heatmap
        with rasterio.open(raster_path) as src:
            data = src.read(1)
            data = gaussian_filter(data, sigma=1)
            plt.figure(figsize=(10, 6))
            plt.imshow(data, cmap='inferno', interpolation='bilinear')
            plt.colorbar()
            plt.axis('off')
            plt.savefig('static/heatmap.png', bbox_inches='tight', pad_inches=0)
            plt.close()

        # Generate Trend Graph
        df = pd.read_excel('historical_rainfall_data.xlsx')
        x = df['Year']
        y = df['Average Rainfall Amount']
        sen_slope = calculate_sen_slope(x, y)
        
        plt.figure(figsize=(10, 6))
        plt.plot(x, y, marker='o', linestyle='-', color='b', label='Historical Data')
        
        # Plot trend line
        trend_line = stats.linregress(x, y)
        plt.plot(x, trend_line.intercept + trend_line.slope * x, 'r', label=f'Sen\'s Slope: {sen_slope:.2f}', linestyle='--')
        
        plt.xlabel('Year')
        plt.ylabel('Average Rainfall Amount')
        plt.title('Historical Rainfall Trend')
        plt.legend()
        plt.grid(True)
        plt.savefig(trend_path)
        plt.close()

        return jsonify({'heatmap': '/static/heatmap.png', 'trend': '/static/rainfall_trend.png'})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    if not os.path.exists('static'):
        os.makedirs('static')
    app.run(debug=True)
