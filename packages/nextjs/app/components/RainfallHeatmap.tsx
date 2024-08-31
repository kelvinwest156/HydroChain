import React from "react";
import { ImageOverlay, MapContainer, TileLayer } from "react-leaflet";

interface RainfallHeatmapProps {
  heatmapUrl: string;
}

const RainfallHeatmap: React.FC<RainfallHeatmapProps> = ({ heatmapUrl }) => {
  const bounds: [[number, number], [number, number]] = [
    [4.5, -3.5], // Southwest corner of Ghana
    [11.5, 1.5], // Northeast corner of Ghana
  ];

  return (
    <MapContainer center={[7.9465, -1.0232]} zoom={7} style={{ height: "500px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ImageOverlay url={heatmapUrl} bounds={bounds} opacity={0.6} />
    </MapContainer>
  );
};

export default RainfallHeatmap;
