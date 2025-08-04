import { Layout } from "../components/Layout";
import { useState } from "react";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // NOTA: le agregamos ID para que tenga identificacion - aleatoreo

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: crypto.randomUUID(),
      name,
      price,
      description,
    };

    newProduct();
  };

  return (
    <Layout>
      <form>
        <div onSubmit={handleSubmit}>
          <label>Nombre del producto:</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            rows="4"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button>Guardar producto</button>
      </form>
    </Layout>
  );
};

export { Dashboard };
