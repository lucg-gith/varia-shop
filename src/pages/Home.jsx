import { Layout } from "../components/Layout";
import { useEffect } from "react";

const Home = () => {
  //NOTA: fetch herramienta nativa para hacer peticiones a la api - por defecto usa GET
  // siempre que hay una funcion asincrona hay un await
  // decirle a react que muestre el return y despues cargue los productos - con effecto secundario - useEffect

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
  };

  // NOTA: syntaxtis useEffect(() => { aca va lo que se carga de forma secundaria}, [cuantas veces se ejecucuta, si esta vacio se ejecuta una sola vez])

  useEffect(() => {
    fetchingProducts();
  }, []);

  return (
    <Layout>
      <p>This is the Home</p>
    </Layout>
  );
};

export { Home };
