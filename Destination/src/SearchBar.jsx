import { FaSearch } from "react-icons/fa"; 

//search bar over slideshow home page
const SearchBar = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      width: "100%",
      maxWidth: 400,
      height: 40,
      margin: "0 auto 20px auto",
      border: "1px solid #e0e0e0",
      borderRadius: 40,
      background: "white",
      padding: "6px 10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    }}
  >
    <input
      placeholder="Search experiences, tours, workshops..."
      style={{
        flex: 1,
        padding: "12px 16px",
        border: "none",
        outline: "none",
        fontSize: 16,
        background: "white",
        borderRadius: 40,
      }}
    />




    <button
      style={{
        background: "linear-gradient(135deg, #10cfb3ff, #5ccbc2ff, #9fd2caff)",
        border: "none",
        padding: "16px 16px",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: 20,
        boxShadow: "0 3px 8px rgba(19,192,167,0.3)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 5px 14px rgba(19,192,167,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 3px 8px rgba(19,192,167,0.3)";
      }}
    >
      <FaSearch size={15} />
    </button>
  </div>
);
export default SearchBar;
