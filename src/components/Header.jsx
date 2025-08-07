import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const Header = () => {
  const { user } = useAuth();

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
            {user && (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>{" "}
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
                <button> End session </button>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export { Header };
