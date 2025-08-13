import "../styles/components/SearchBar.css";
const SearchBar = ({ value, onChange }) => {
  return (
    <section>
      <label className="form-label fw-semibold fs-5  mb-2">
        Buscá el producto que necesitás
      </label>
      <input
        class="form-control rounded-pill px-4 shadow-sm border border-success text-center search-narrow"
        type="text"
        placeholder="Busca tu producto..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </section>
  );
};

export { SearchBar };
