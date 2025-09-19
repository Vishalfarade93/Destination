// src/utils/geocode.js
import axios from "axios";

const accessKey = "45c06913466869dd2585d7f96a7441ae"; // your API key

export async function fetchLatLngFromPositionstack(query) {
  try {
    const response = await axios.get("https://api.positionstack.com/v1/forward", {
      params: {
        access_key: accessKey,
        query,
        limit: 1,
        country: "IN",
      },
    });

    if (response.data && response.data.data && response.data.data.length > 0) {
      const { latitude, longitude } = response.data.data[0];
      return { lat: latitude, lng: longitude };
    }
  } catch (err) {
    console.error("Positionstack API error:", err);
  }
  return { lat: "", lng: "" };
}
