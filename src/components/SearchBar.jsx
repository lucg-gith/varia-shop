const SearchBar = ({ value, onChange }) => {
  return (
    <section>
      <label>Búsqueda</label>
      <input
        type="text"
        placeholder="Busca tu producto..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </section>
  );
};

export { SearchBar };
