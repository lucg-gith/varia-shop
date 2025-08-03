import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header style={{ backgroundColor: "Black" }}>
        <img
          src="https://fish.audio/_next/image/?url=https%3A%2F%2Fpublic-platform.r2.fish.audio%2Fcoverimage%2F8d63623ecbf54f359eea60b5b58a361e&w=256&q=75"
          alt="Logo image"
        />
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <button> End session </button>
          </ul>
        </nav>
      </header>
    </>
  );
};

export { Header };
