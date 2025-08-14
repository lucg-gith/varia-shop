import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import "../styles/pages/notfound.css";

const NotFound = () => {
  return (
    <Layout>
      <div
        className="container py-5 pb-5 mb-5 text-center bg-body border border-2 rounded-4 shadow-sm"
        style={{ paddingBottom: "100px", maxWidth: "720px" }}
      >
        <img
          className="img-fluid mb-4 rounded-4 border img-notfound"
          src="https://people.com/thmb/uaPXUZZ5ePss1Z3CfUIPbRBXEKE=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(999x0:1001x2)/sad-dog1-7c43708fe1a145d5aeeca6a30c1282fb.jpg"
          alt="Página no encontrada"
        />
        <h1 className="display-5 fw-bold theme-wine">Página no encontrada</h1>

        <p className="mb-0">
          Puedes volver a la{" "}
          <Link to="/" className="fw-semibold link-success">
            página de inicio
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export { NotFound };
