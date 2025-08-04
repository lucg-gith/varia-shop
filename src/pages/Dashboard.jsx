import { Layout } from "../components/Layout";
import { useState } from "react";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (description.length < 3) {
      setError("La descripción debe tener al menos 4 caracteres");
      return;
    }

    if (name.length < 3) {
      setError("El nombre debe tener al menos 4 caracteres");
      return;
    }

    const newProduct = {
      id: crypto.randomUUID(),
      title: name,
      price,
      description,
      category: "",
      image: "",
    };

    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    const data = await response.json();
    setProduct(data);
    setName("");
    setPrice("");
    setDescription("");
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del producto:</label>
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            rows="4"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        <button>Guardar</button>
      </form>

      {product && (
        <div>
          <h3>{product.title}</h3>
          <p>${product.price}</p>
          <p>{product.description}</p>
        </div>
      )}
    </Layout>
  );
};

export { Dashboard };
