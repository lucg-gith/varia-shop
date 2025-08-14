import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import "../styles/components/header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// TODO: cambiar el menu hamburguesa - mas pequenio
// TODO: color del header

const Header = () => {
  // NOTA: destructurin
  const { user, logout } = useAuth();

  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
        <div className="container">
          {/* NOTA: Logo */}
          <Link className=" logo-xsnavbar-brand" to="/">
            <img src={logo} alt="Logo" />
          </Link>

          {/* NOTA: Hamburger button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/*NOTA: Collaps menu */}
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/AboutUs">
                  Sobre Nosotros
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              {user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item border rounded">
                    <div className="nav-link">
                      <button className="btn-reset " onClick={logout}>
                        End session
                      </button>
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export { Header };
