import React, { useState } from "react";
import location from "./assets/geo-alt.svg";
import axios from "axios";

function MapButton() {
  const [loading, setLoading] = useState(false);

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchNearbyExperiences(latitude, longitude);
      },
      (error) => {
        alert("Failed to get location");
        setLoading(false);
      }
    );
  };

  const fetchNearbyExperiences = async (lat, lng) => {
    try {
      const response = await axios.get(
        `/nearby?lat=${lat}&lng=${lng}&radiusKm=10`
      );
      // handle the experiences (set state, show popup, etc)
      console.log(response.data);
    } catch (err) {
      alert("Error fetching experiences");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleLocationClick}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
      }}
      disabled={loading}
      title="Show nearby experiences"
    >
      <img src={location} alt="Map Icon" style={{ height: "30px", width: "30px" }} />
      {loading && <span>Locating...</span>}
    </button>
  );
}

export default MapButton;
