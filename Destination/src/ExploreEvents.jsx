import React, { useEffect, useState } from "react";
import axios from "axios";
import ExperienceCard from "./ExperienceCard";
import logo from "./assets/logo2.png";
import { Link } from "react-router-dom";

export default function ExploreEvents() {
    const [events, setEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(false);

    const categories = ["All", "CULTURE", "FOOD", "NATURE", "ADVENTURE"];

    useEffect(() => {
        fetchEvents(selectedCategory);
    }, [selectedCategory]);

    const fetchEvents = async (category) => {
        setLoading(true);
        try {
            let url =
                category === "All"
                    ? "http://localhost:8081/api/experiences/all"
                    : `http://localhost:8081/api/experiences/category/${category}`;
            const res = await axios.get(url);
            setEvents(res.data);
        } catch (err) {
            console.error("Failed to fetch events", err);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app">
            


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
                <Link to="/">
                    <img src={logo} alt="Destination Logo" style={{ height: "140px" }} />
                </Link>
                <nav style={{ display: "flex", gap: 28, fontSize: 18, fontWeight: 500 }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                background: selectedCategory === cat ? "linear-gradient(#10cfb3ff, #5ccbc2ff, #9fd2caff)" : "transparent",
                                color: selectedCategory === cat ? "#fff" : "#222",
                                border: "none",
                                cursor: "pointer",
                                padding: "6px 14px",
                                borderRadius: "20px",
                                transition: "0.3s",
                                fontSize: 18,
                            }}
                        >
                            {cat.toLowerCase()}
                        </button>
                    ))}
                </nav>
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

            {/* main section */}
            <main style={{ padding: "40px 60px" }}>
                <h2 style={{ fontSize: "2rem", marginBottom: "20px", textAlign: "center" }}>
                    {selectedCategory.toLowerCase().charAt(0).toUpperCase() + selectedCategory.toLowerCase().slice(1).toLowerCase(  )} Experiences
                </h2>

                {loading ? (
                    <p style={{ textAlign: "center", background: "linear-gradient(135deg, #10cfb3ff, #5ccbc2ff, #9fd2caff)", color: "#fff" }}>Loading...</p>
                ) : events.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#666" }}>
                        No experiences found in this category.
                    </p>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 320px))",
                            gap: "24px",
                            justifyContent: "center",
                        }}
                    >
                        {events.map((event) => (
                            <ExperienceCard
                                key={event.id}
                                id={event.id}
                                title={event.title}
                                rating={event.rating}
                                location={event.location}
                                price={event.price}
                                imageurl={event.imageUrl}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Footer */}
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
