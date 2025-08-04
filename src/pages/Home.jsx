import { Layout } from "../components/Layout";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  //#region
  // NOTA: fetch herramienta nativa para hacer peticiones a la api - por defecto usa GET
  // siempre que hay una funcion asincrona hay un await
  // decirle a react que muestre el return y despues cargue los productos - con effecto secundario - useEffect
  //#endregion
  const [products, setProduct] = useState([]);

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "GET",
    });
    const data = await response.json();
    setProduct(data);
  };

  // NOTA: syntaxis useEffect(() => { aca va lo que se carga de forma secundaria}, [cuantas veces se ejecucuta, si esta vacio se ejecuta una sola vez])

  useEffect(() => {
    fetchingProducts();
  }, []);

  return (
    <Layout>
      <p>This is the Home</p>
      <p>testing</p>
      {products.map((product) => (
        <h2>{product.title}</h2>
      ))}
    </Layout>
  );
};

export { Home };
