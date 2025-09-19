// filter panal
const FilterPanel = ({ filters, onChange }) => (
  <div style={{ display: "flex", gap: 16, marginBottom: 10, flexWrap: "wrap" }}>
    <input
      type="number"
      placeholder="Max Budget (₹)"
      value={filters.budget || ""}
      onChange={e => onChange({ ...filters, budget: e.target.value })}
      style={{
        width: 140,
        padding: "8px 10px",
        borderRadius: 6,
        border: "1px solid #dadada",
        fontSize: 14
      }}
    />
  </div>
);
export default FilterPanel;
