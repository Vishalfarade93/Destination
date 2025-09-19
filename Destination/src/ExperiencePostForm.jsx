import React, { useState } from "react";
import axios from "axios";
import { fetchLatLngFromPositionstack } from "./utils/geocode"; // adjust path if needed

export default function ExperiencePostForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    location: "",
    lat: "",
    lng: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");
    try {
      const { lat, lng } = await fetchLatLngFromPositionstack(form.location);
      const updatedForm = { ...form, lat, lng };
      const formData = new FormData();
      formData.append(
        "experience",
        new Blob([JSON.stringify(updatedForm)], { type: "application/json" })
      );
      if (imageFile) formData.append("image", imageFile);

      await axios.post("http://localhost:8081/api/experiences/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(true);
      setForm({
        title: "",
        description: "",
        category: "",
        price: "",
        location: "",
        lat: "",
        lng: "",
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      setError("Failed to post experience. Please try again.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "6px",
    marginBottom: "16px",
    fontSize: "14px",
  };

  const labelStyle = {
    display: "block",
    fontWeight: "bold",
    marginBottom: "4px",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "500px",
        margin: "30px auto",
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        background: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#13c0a7" }}>
        Post a New Experience
      </h2>

      <label style={labelStyle}>Title</label>
      <input
        type="text"
        name="title"
        placeholder="Enter title"
        value={form.title}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <label style={labelStyle}>Description</label>
      <textarea
        name="description"
        placeholder="Enter description"
        value={form.description}
        onChange={handleChange}
        required
        style={{ ...inputStyle, minHeight: "80px" }}
      />

      <label style={labelStyle}>Category</label>
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
        style={inputStyle}
      >
        <option value="">Select category</option>
        <option value="CULTURE">CULTURE</option>
        <option value="FOOD">FOOD</option>
        <option value="NATURE">NATURE</option>
        <option value="ADVENTURE">ADVENTURE</option>
      </select>

      <label style={labelStyle}>Price (₹)</label>
      <input
        type="number"
        name="price"
        placeholder="Enter price"
        value={form.price}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <label style={labelStyle}>Location</label>
      <input
        type="text"
        name="location"
        placeholder="Enter location"
        value={form.location}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input type="hidden" name="lat" value={form.lat} />
      <input type="hidden" name="lng" value={form.lng} />


      <label style={labelStyle}>Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={inputStyle}
      />

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          style={{
            width: "100%",
            borderRadius: "8px",
            marginTop: "10px",
            marginBottom: "16px",
          }}
        />
      )}

 
      <button
        type="submit"
        style={{
          width: "100%",
          background: "#13c0a7",
          color: "white",
          padding: "12px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        Post Experience
      </button>

      {success && <p style={{ color: "green", marginTop: "10px" }}>Experience posted successfully!</p>}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </form>
  );
}
