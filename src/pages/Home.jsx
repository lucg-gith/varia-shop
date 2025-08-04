import { Layout } from "../components/Layout";

const Home = () => {
  //NOTA: fetch herramienta nativa para hacer peticiones a la api - por defecto usa GET

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "GET",
    });
  };

  return (
    <Layout>
      <p>This is the Home</p>;
    </Layout>
  );
};

export { Home };
