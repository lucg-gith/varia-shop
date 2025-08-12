import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const Header = () => {
  // NOTA: destructuring
  const { user, logout, login } = useAuth();

  return (
    <>
      <header>
        <img
          src={logo}
          alt="Logo image"
          style={{ width: "150px", height: "auto" }}
        />
        <nav>
          <ul>
            <li>
              <Link to="/AboutUs">Sobre Nosotros</Link>
            </li>

            <li>
              <Link to="/">Home</Link>
            </li>

            {user && (
              <>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>{" "}
                <button onClick={logout}> End session </button>
              </>
            )}

            {!user && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export { Header };
