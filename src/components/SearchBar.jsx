const SearchBar = () => {
  const [filteredProducts, setFilteredProducts] = [];

  Return(
    <section>
      <label>Busqueda</label>
      <input
        type="text"
        placeholder="Busca tu producto..."
        value={filteredProducts}
        onChange={(e) => setFilteredProducts(e.target.value)}
      />
    </section>
  );
};

export { SearchBar };
