import React from "react";
import { Link } from "react-router-dom";

function ExperienceCard({ id, title, rating, location, price, imageurl }) {
  const BACKEND_URL = "http://localhost:8081";

  return (
    <Link to={`/experience/${id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          background: "#fff",
          transition: "0.3s",
          cursor: "pointer",
        }}
      >
        <img
          src={`${BACKEND_URL}${imageurl}`}
          alt={title}
          style={{ width: "100%", height: "180px", objectFit: "cover" }}
        />

        <div style={{ padding: "16px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "6px",textDecoration:"none", color:"#000" }}>
            {title}
          </h3>

          <p style={{ fontSize: "14px", color: "#555", marginBottom: "6px" }}>
            ⭐ {rating?.toFixed(1) ?? "N/A"}
          </p>

          <p style={{ fontSize: "14px", color: "#777", marginBottom: "10px" }}>
            {location || "Unknown Location"}
          </p>

          <span style={{ color: "#13c0a7", fontWeight: 600 }}>
            ₹{price ?? "—"}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ExperienceCard;
