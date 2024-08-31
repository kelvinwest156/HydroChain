"use client";

import React, { useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";

function App() {
  const [heatmapUrl, setHeatmapUrl] = useState<string>("");
  const [trendUrl, setTrendUrl] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [showMap, setShowMap] = useState<boolean>(false);

  const handleLocationSelect = async () => {
    if (!searchInput) return;

    try {
      const response = await axios.post("http://localhost:5000/generate", {
        location: searchInput,
      });
      setHeatmapUrl(`http://localhost:5000${response.data.heatmap}`);
      setTrendUrl(`http://localhost:5000${response.data.trend}`);
      setShowMap(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-12 text-white bg-gradient-to-r from-black to-blue-900">
      <h1 className="mb-8 text-5xl font-bold">HydroChain Dashboard</h1>
      <p className="mb-8 text-lg font-bold">Welcome to the future of geospatal analysis. Try Our Engine.</p>
      <p className="mb-8 text-lg font-bold">Enter any location in the World</p>

      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter location"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLocationSelect}
          className="w-full p-4 mt-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>

      {showMap && (
        <div>
          <div className="flex justify-between w-full max-w-4xl mt-20">
            <div className="pr-16 mb-8">
              <h2 className="mb-4 font-sans font-semibold text-left text-md">Ghana Rainfall Heatmap for 2024</h2>
              <img src={heatmapUrl} alt="Rainfall Heatmap" className="w-full rounded-lg shadow-lg" />
            </div>
            <div>
              <h2 className="mb-4 font-semibold text-right text-md">Historical Rainfall Trend(2008 - 2023)</h2>
              <img src={trendUrl} alt="Rainfall Trend" className="w-full rounded-lg shadow-lg" />
            </div>
          </div>
          <p className="mb-4 font-semibold text-right text-md">
            This Engine uses the Historical data ploted on above to predict the rainfall heatmap for your location for
            the the coming year.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
