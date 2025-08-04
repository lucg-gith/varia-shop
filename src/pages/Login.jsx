import { Layout } from "../components/Layout";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // nota al profe: No use el use state para setear caso de error porque agregue' required dentro del form.

  return (
    <Layout>
      <form>
        <div>
          <label> Email </label>
          <input type="email" placeholder="Email" name="email" required></input>
        </div>
        <div>
          <label> Password </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          ></input>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </Layout>
  );
};

export { Login };
