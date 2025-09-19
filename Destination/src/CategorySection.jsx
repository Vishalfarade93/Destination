import ExperienceCard from "./ExperienceCard"

// we are having grid of cards here for home page for featured experiences in it 
function CategorySection({ title, experiences }) {
  return (
    <>
    
   
    <div style={{
      borderRadius: "0px 0px 16px 16px",
      overflow: "hidden",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      background: "#cccccc6a",
      padding: "0px 40px 40px 40px",
    }}>
      <section style={{ marginBottom: "40px" }}>
      <h2 style={{
        fontSize: "27px",
        fontWeight: 600,
        marginBottom: "20px",
        color: "#000000ff"
      }}>
        {title}
      </h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "50px"
      }}>
        {experiences.map((exp, idx) => (
          <ExperienceCard key={idx} {...exp} />
        ))}
      </div>
    </section>

    </div>
     </>
  )
}

export default CategorySection
