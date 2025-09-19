export default function Temp() {
  const handletemp = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          alert(`Your Location:\nLatitude: ${latitude}\nLongitude: ${longitude}`);
          console.log("Position:", pos);
        },
        (err) => {
          alert("Error getting location: " + err.message);
          console.error(err);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <button className="btn" onClick={handletemp}>
      Click Me
    </button>
  );
}
