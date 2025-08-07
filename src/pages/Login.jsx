import { Layout } from "../components/Layout";
import { useState } from "react";
import { useAuth } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  // nota al profe: No use el use state para setear caso de error porque agregue' required dentro del form.
  const handleLogin = (e) => {
    e.preventDefault();
    //   onChange={(e) => setEmail(e.target.value)}
    // onChange={(e) => setPassword(e.target.value)}
    login();
    console.log({ email, password });
  };
  return (
    <Layout>
      <form onSubmit={handleLogin}>
        <div>
          <label> Email </label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
