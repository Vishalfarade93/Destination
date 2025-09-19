import React from "react";
import GoogleMapReact from "google-map-react";
import 'bootstrap-icons/font/bootstrap-icons.css';


// Marker component (custom marker style)
const Marker = () => <div style={{
  color: "red",
  fontWeight: "bolder",
  fontSize: "40px",
  transform: "translate(-50%, -50%)"
}}><i class="bi bi-geo-alt-fill"></i></div>;

export default function MapView({ latitude, longitude }) {
  const defaultZoom = 14;

  if (!latitude || !longitude) {
    return <p style={{ textAlign: "center", color: "gray" }}> Location not available</p>;
  }

  return (
    <div style={{ height: "400px", width: "100%", marginTop: "20px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDRsaN2y16oAIYsWgcktKw5bWKzZd6zvT8" }} 
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultZoom={defaultZoom}
      >
        <Marker lat={latitude} lng={longitude} />
      </GoogleMapReact>
    </div>
  );
}
