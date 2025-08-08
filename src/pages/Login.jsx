import { Layout } from "../components/Layout";
import { useState } from "react";
import { useAuth } from "../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  // NOTA al profe: No use el use state para setear caso de error porque agregue' required dentro del form.
  const handleLogin = (e) => {
    e.preventDefault();
    //   onChange={(e) => setEmail(e.target.value)}
    // onChange={(e) => setPassword(e.target.value)}
    login();
    console.log({ username, password });
  };
  return (
    <Layout>
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
      </form>
    </Layout>
  );
};

export { Login };
