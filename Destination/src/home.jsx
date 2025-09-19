import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import ExperienceExplorer from "./ExperienceExplorer";
import ExperienceCard from "./ExperienceCard"; 
import SearchBar from "./SearchBar";
import logo from "./assets/logo2.png";
import bappa from "./assets/bappa.png";
import rjs from "./assets/rjs.jpeg";
import mhc from "./assets/mhc.jpeg";
import location from "./assets/geo-alt.svg";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import LocationButton from "./LocationButton";

function Home() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch nearby experiences from backend
  const fetchNearby = async (lat, lng) => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8081/api/experiences/nearby", {
        params: { lat, lng, radiusKm: 10 },
      });
      setExperiences(res.data);
    } catch (err) {
      console.error("Error fetching nearby experiences:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Navbar home page */}
      <header
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(12px)",
          padding: "8px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 10,
          height: 50,
          transition: "all 0.3s ease",
        }}
      >
        <img
          src={logo}
          alt="Destination Logo"
          style={{
            height: "140px",
            objectFit: "contain",
            cursor: "pointer",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        />

        <nav
          style={{
            display: "flex",
            gap: 28,
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: "0.5px",
          }}
        ></nav>

        <Link to="/addexperience">
          <button
            style={{
              background:
                "linear-gradient(135deg, #10cfb3ff, #5ccbc2ff, #9fd2caff)",
              color: "#fff",
              border: "none",
              padding: "8px 18px",
              borderRadius: "80px",
              cursor: "pointer",
              fontWeight: 600,
              height: 40,
              boxShadow: "0 2px 8px rgba(19, 192, 167, 0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(19,192,167,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(19,192,167,0.3)";
            }}
          >
            Become a host
          </button>
        </Link>
      </header>

      {/* slideshow section home page */}
      <section className="hero">
  <div className="hero-card">
    <div className="hero-slideshow">
      <div className="slide fade">
        <img src={mhc} alt="slide1" />
      </div>
      <div className="slide fade">
        <img src={rjs} alt="slide2" />
      </div>
      <div className="slide fade">
        <img src={bappa} alt="slide3" />
      </div>
      <div className="slide fade">
        <img
          src="https://i.pinimg.com/1200x/0a/d4/d3/0ad4d3054882e879af9de91e748c2c85.jpg"
          alt="slide4"
        />
      </div>
    </div>

    <div className="hero-overlay">
      <h1>Discover Incredible India</h1>
      <p>
        Explore rich heritage, vibrant culture, and breathtaking destinations
      </p>
      <SearchBar />
      <Link to="/explore">
        <button
          style={{
            background: "linear-gradient(135deg, #10cfb3ff, #5ccbc2ff, #9fd2caff)",
            borderRadius: "15px",
          }}
          className="explore-btn"
        >
          Explore All
        </button>
      </Link>
    </div>


{/* map button */}
    <div
      className="map-icon"
      style={{ cursor: "pointer" }}
      onClick={() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const { latitude, longitude } = pos.coords;
              fetchNearby(latitude, longitude);
            },
            (err) => {
              console.error("Error getting location:", err);
              alert("Unable to fetch your location. Please allow location access.");
            }
          );
        } else {
          alert("Geolocation is not supported by your browser.");
        }
      }}
    >
      <span role="img" aria-label="map">
        <img src={location} alt="Map Icon" style={{ height: "30px", width: "30px" }} />
      </span>
    </div>
  </div>
</section>

      {/* Main Section */}
      <main style={{ maxWidth: "100%" }}>
        
        {loading && <p style={{ textAlign: "center" }}>Loading nearby experiences...</p>}
        {experiences.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "20px",
              padding: "20px",
            }}
          >
           {experiences.map((exp) => (
  <ExperienceCard
    key={exp.id}
    id={exp.id}
    title={exp.title}
    rating={exp.rating}
    location={exp.location}
    price={exp.price}
    imageurl={exp.imageUrl}
  />
))}

          </div>
        ) : (
          <ExperienceExplorer />
        )}
      </main>

      {/* footer */}
      <footer
        style={{
          backgroundColor: "#fff",
          color: "#555",
          textAlign: "center",
          padding: "20px",
          marginTop: "40px",
          borderTop: "1px solid #eee",
        }}
      >
        © {new Date().getFullYear()} Destination | All rights reserved
      </footer>
    </div>
  );
}

export default Home;
