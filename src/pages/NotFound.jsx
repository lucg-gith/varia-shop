import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import "../styles/pages/notfound.css";

const NotFound = () => {
  return (
    <Layout>
      <div className="text-center " style={{ paddingBottom: "50px" }}>
        <img
          className="img-fluid mb-4 rounded img-notfound"
          src="https://people.com/thmb/uaPXUZZ5ePss1Z3CfUIPbRBXEKE=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2)/sad-dog1-7c43708fe1a145d5aeeca6a30c1282fb.jpg"
          alt="Página no encontrada"
        />
        <h1 className="display-5 fw-bold text-danger">Página no encontrada</h1>
        <p className="lead">
          Lo sentimos, la página que estás buscando no existe. Es posible que la
          dirección haya sido escrita incorrectamente o que la página haya sido
          movida.
        </p>
        <p>
          Puedes volver a la{" "}
          <Link to="/" className="text-decoration-none fw-bold text-success">
            página de inicio
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export { NotFound };
