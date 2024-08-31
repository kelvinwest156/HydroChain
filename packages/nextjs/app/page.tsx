// pages/index.tsx
import React from "react";


const LandingPage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="p-4 bg-gray-800">
        <div className="container flex items-center justify-between mx-auto">
          <div className="text-2xl font-bold text-white"><span className="text-blue-500 ">hydro</span>Chain</div>
          <div className="space-x-4">
            <a href="/dashboard" className="text-gray-300 hover:text-white">
              Dashboard
            </a>
            <a href="/about" className="text-gray-300 hover:text-white">
              About
            </a>
          </div>
          <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Connect Wallet
          </button>
        </div>
      </nav>

      {/* Header */}
      <header className="py-20 text-white bg-gradient-to-r from-black to-blue-600">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold">Welcome to HydroChain</h1>
          <p className="mt-4 text-xl">Predict rainfall with advanced data analytics and blockchain technology.</p>
        </div>
      </header>

      {/* Key Features */}
      <section className="py-16 text-black bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="mb-8 text-3xl font-bold">Key Features</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="mb-4 text-2xl font-bold">Accurate Predictions</h3>
              <p>Utilize historical data to predict future rainfall trends with precision.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="mb-4 text-2xl font-bold">Interactive Maps</h3>
              <p>Explore dynamic heatmaps to visualize rainfall data across regions.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="mb-4 text-2xl font-bold">Blockchain Integration</h3>
              <p>Secure and transparent data storage using Ethereum smart contracts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Used */}
      <section className="py-16 text-black bg-white">
        <div className="container mx-auto text-center">
          <h2 className="mb-8 text-3xl font-bold">Technologies Used</h2>
          <div className="flex flex-wrap justify-center space-x-6">
            <span className="text-xl">Next.js</span>
            <span className="text-xl">Tailwind CSS</span>
            <span className="text-xl">Flask</span>
            <span className="text-xl">Solidity</span>
            <span className="text-xl">ML Models(ARIMA, rasterio)</span>
            <span className="text-xl">Matplotlib</span>
            <span className="text-xl">Ethereum</span>
            <span className="text-xl">Leaflet</span>

          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
