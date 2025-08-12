import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import "../styles/components/Header.css";
const Header = () => {
  // NOTA: destructuring
  const { user, logout, login } = useAuth();

  return (
    <>
      <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
          <div class="container-fluid">
            <div class="collapse navbar-collapse">
              <div>
                <div class="container">
                  <img
                    alt="Bootstrap"
                    width="30"
                    height="24"
                    class="navbar bg-body-tertiary"
                    src={logo}
                    alt="Logo image"
                    style={{ width: "150px", height: "auto" }}
                  />
                </div>
              </div>
              <ul class="navbar-nav">
                <div>
                  <li class="nav-item">
                    <Link class="nav-link" to="/AboutUs">
                      Sobre Nosotros
                    </Link>
                  </li>

                  <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to="/">
                      Home
                    </Link>
                  </li>
                </div>

                {user && (
                  <>
                    <div class="navbar-nav">
                      <li class="nav-item">
                        <Link
                          class="nav-link active"
                          aria-current="page"
                          to="/dashboard"
                        >
                          Dashboard
                        </Link>
                      </li>{" "}
                      <button onClick={logout}> End session </button>
                    </div>
                  </>
                )}

                {!user && (
                  <>
                    <div class="navbar-nav">
                      <li class="nav-item">
                        <Link
                          class="nav-link active"
                          aria-current="page"
                          to="/login"
                        >
                          Login
                        </Link>
                      </li>
                      <li class="nav-item">
                        <Link
                          class="nav-link active"
                          aria-current="page"
                          to="/register"
                        >
                          Register
                        </Link>
                      </li>
                    </div>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export { Header };
