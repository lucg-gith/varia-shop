import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <h1>Página no encontrada</h1>
      <p>
        Lo sentimos, la página que estás buscando no existe. Es posible que la
        dirección haya sido escrita incorrectamente o que la página haya sido
        movida.
      </p>
      <p>
        Puedes volver a la <Link to="/">página de inicio</Link>
      </p>
    </Layout>
  );
};

export { NotFound };
