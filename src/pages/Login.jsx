import { Layout } from "../components/Layout";
import { useState } from "react";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();

  // NOTA: todos los hooks se declaran antes de usar
  const navigate = useNavigate();

  // NOTA al profe: No use el use state para setear caso de error porque agregue' required dentro del form.
  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ username, password });
    setUsername("");
    setPassword("");
    navigate("/");

    // NOTA al profe: aca use trim porque me generaba error cuando copiaba
    // con espacios el user me parecio practico para no tener tanto ese error.

    login({ username: username.trim(), password: password.trim() });
  };

  return (
    <Layout>
      <p> "username": "donero", "password": "ewedon",</p>
      <p>User: johnd Password: m38rmF$</p>
      <form onSubmit={handleLogin}>
        <div>
          <label> Username </label>
          <input
            type="text"
            placeholder="Username"
            name="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div>
          <label> Password </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <button>Login</button>
        </div>

        {user && <p> USUARIO LOGEADO</p>}
      </form>
    </Layout>
  );
};

export { Login };
