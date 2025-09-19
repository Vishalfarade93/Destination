import React, { useEffect, useState } from "react";
import axios from "axios";
import CategorySection from "./CategorySection";
import ExperienceCard from "./ExperienceCard";

function ExperienceExplorer() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/experiences/featured")
      .then((res) => {
        const formatted = res.data.map((exp) => ({
          id: exp.id,
          title: exp.title,
          rating: exp.rating,
          location: exp.location,
          price: exp.price,
          imageurl: exp.imageUrl,
        }));
        setExperiences(formatted);
      })
      .catch((err) => console.error("Error fetching featured experiences:", err));
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0px",
        }}
      >
      </div>

      {experiences.length > 0 ? (
        <CategorySection
          title="Featured Experiences"
          experiences={experiences}
        />
      ) : (
        <p>Loading featured experiences...</p>
      )}
    </div>
  );
}

export default ExperienceExplorer;
