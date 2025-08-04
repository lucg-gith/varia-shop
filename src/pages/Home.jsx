import { Layout } from "../components/Layout";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  //#region
  // NOTA: fetch herramienta nativa para hacer peticiones a la api - por defecto usa GET
  // siempre que hay una funcion asincrona hay un await
  // decirle a react que muestre el return y despues cargue los productos - con effecto secundario - useEffect
  //#endregion
  const [products, setProducts] = useState([]);

  // NOTA: syntaxis useEffect(() => { aca va lo que se carga de forma secundaria}, [cuantas veces se ejecucuta, si esta vacio se ejecuta una sola vez])
  useEffect(() => {
    fetchingProducts();
  }, []);

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "GET",
    });

    const data = await response.json();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setProducts(products.filter((product) => product.id !== id));
      // fetchingProducts();
    }
  };

  return (
    <Layout>
      <p>This is the Home</p>

      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <img src={product.image} alt="product image" />
          <p>${product.price}</p>
          <p>{product.description}</p>
          <p>{product.category}</p>
          <div>
            <button>Edit</button>
            <button
              onClick={() => {
                handleDelete(product.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export { Home };

// TODO: se rompio no se vev en la pantalla los productos
