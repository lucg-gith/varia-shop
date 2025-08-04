import { Layout } from "../components/Layout";
import { useState } from "react";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  // NOTA: undefined: esperando resultado null: esta vacio

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (description.length < 3) {
      setError("La descripcio'n debe tener al menos 4 caracteres");
      return;
    }

    if (name.length < 3) {
      setError("El nombre debe tener al menos 4 caracteres");
      return;
    }

    // NOTA: le agregamos ID para que tenga identificacion - aleatoreo - id: crypto.randomUUID() & category: "" & image: "" para que haga match con la info que trae la API.
    // PREGUNTA: nose podria dejar solo name, price y description? sin poner name:name?
    const newProduct = {
      id: crypto.randomUUID(),
      title: name,
      price: price,
      description: description,
      category: "",
      image: "",
    };

    // NOTA: petición al backend mediante fetch -> método POST https://fakeproductapi.com/products
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await response.json();
    setProduct(newProduct);
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
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            required
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            rows="4"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          {error && <p>{error}</p>}
        </div>

        <button>save</button>
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
