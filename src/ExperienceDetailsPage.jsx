import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PaymentButton from "./PaymentButton";
import MapView from "./MapView"; 

function ExperienceDetailsPage() {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(0);

  const BACKEND_URL = "http://localhost:8081";

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/experiences/${id}`)
      .then((res) => {
        setExperience(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load experience details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>⏳ Loading...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <img
        src={`http://localhost:8081${experience.imageUrl}`}
        alt={experience.title}
        style={{
          width: "100%",
          height: "400px",
          objectFit: "cover",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      />

      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px" }}>
        {experience.title}
      </h1>
      <p style={{ fontSize: "16px", color: "#555" }}>{experience.description}</p>

    
      <div style={{ margin: "20px 0", fontSize: "16px" }}>
        <p>
          <strong> Location:</strong> {experience.location}
        </p>
        <p>
          <strong> Price:</strong> ₹{experience.price}
        </p>
        <p>
          <strong>⭐ Rating:</strong> {experience.rating?.toFixed(1) ?? "N/A"}
        </p>
      </div>

      <h3> Location</h3>
      <MapView latitude={experience.lat} longitude={experience.lng} />
      <div
        style={{
          padding: "16px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          marginTop: "20px",
          background: "#f9f9f9",
        }}
      >
        <h3> Contact Local Host</h3>
        <p>Name: {experience.contactName ?? "Local Guide"}</p>
        <p>Phone: {experience.contactPhone ?? "Not Provided"}</p>
        <p>Email: {experience.contactEmail ?? "Not Provided"}</p>
      </div>

   
      <PaymentButton amount={experience.price} />

  
      <div style={{ marginTop: "30px" }}>
        <h3>⭐ Rate this Experience</h3>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              fontSize: "24px",
              cursor: "pointer",
              color: userRating >= star ? "#FFD700" : "#ccc",
            }}
            onClick={() => setUserRating(star)}
          >
            ★
          </span>
        ))}
        {userRating > 0 && <p>You rated {userRating} stars</p>}
      </div>
    </div>
  );
}

export default ExperienceDetailsPage;
