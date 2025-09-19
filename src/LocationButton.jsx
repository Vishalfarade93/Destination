const LocationButton = ({ onLocate }) => {
  const handleClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => onLocate(pos.coords.latitude, pos.coords.longitude),
      () => alert("Location access denied")
    );
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: "#13c0a7",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        fontWeight: "600",
        padding: "10px 18px",
        cursor: "pointer",
        fontSize: 15,
        width: 220,
        marginBottom: 18,
      }}
    >
      Show Nearby Experiences
    </button>
  );
};

export default LocationButton;
