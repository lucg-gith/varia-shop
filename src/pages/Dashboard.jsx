import { Layout } from "../components/Layout";
import { useState } from "react";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // NUEVO: categoría
  const [image, setImage] = useState(""); // NUEVO: imagen
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  // NOTA: undefined: esperando resultado null: esta vacio

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (description.length < 10) {
      setError("La descripción debe tener al menos 10 caracteres");
      return;
    }

    if (name.length < 3) {
      setError("El nombre debe tener al menos 4 caracteres");
      return;
    }

    // NOTA: Validar URL solo si el campo no está vacío
    if (image && !/^https?:\/\/.+\..+/.test(image)) {
      setError("La URL de la imagen no es válida");
      return;
    }

    // NOTA: le agregamos ID para que tenga identificacion - aleatoreo - id: crypto.randomUUID() & category: "" & image: "" para que haga match con la info que trae la API.
    // PREGUNTA: nose podria dejar solo name, price y description? sin poner name:name?
    const newProduct = {
      id: crypto.randomUUID(),
      title: name,
      price: price,
      description: description,
      category: category,
      image: image || "", // Si está vacío, enviamos string vacío
    };

    // NOTA: petición al backend mediante fetch, el fetch siempre necesita un método -> método POST que significa = agregar -  https://fakeproductapi.com/products
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await response.json();

    setProduct(data);

    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
    setImage("");
  };

  return (
    <Layout>
      <div className="container ">
        <div
          className="card shadow-sm border-success rounded-4 p-4"
          style={{ maxWidth: "400px", margin: "auto" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre del producto:</label>
              <input
                type="text"
                name="name"
                required
                className="form-control form-control-lg"
                placeholder="Nombre"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Precio:</label>
              <input
                type="number"
                name="price"
                required
                className="form-control form-control-lg"
                placeholder="Precio"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            {/* NOTA: Selector de categorías */}
            <div className="mb-3">
              <label className="form-label">Categoría:</label>
              <select
                name="category"
                required
                className="form-select form-select-lg"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Selecciona una categoría</option>
                <option value="men's clothing">Men's clothing</option>
                <option value="jewelery">Jewelery</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>

            {/* NOTA: URL de imagen opcional */}
            <div className="mb-3">
              <label className="form-label">URL de imagen (opcional):</label>
              <input
                type="url"
                name="image"
                className="form-control form-control-lg"
                placeholder="https://ejemplo.com/imagen.jpg"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción:</label>
              <textarea
                name="description"
                rows="4"
                required
                className="form-control"
                placeholder="Descripción (mínimo 10 caracteres)"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              {error && <p className="text-danger mt-2">{error}</p>}
            </div>

            <button className="btn btn-success btn-lg w-100 rounded-3">
              Guardar
            </button>
          </form>
        </div>

        {product && (
          <div className="mt-4 text-center">
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>{product.description}</p>
            <p>
              <strong>Categoría:</strong> {product.category}
            </p>
            {product.image && (
              <img
                src={product.image}
                alt={product.title}
                className="img-fluid mt-2 rounded"
              />
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export { Dashboard };
