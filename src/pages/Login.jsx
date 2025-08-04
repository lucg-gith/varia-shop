import { Layout } from "../components/Layout";

const Login = () => {
  return (
    <Layout>
      <form>
        <input type="email" placeholder="Email" name="email" required></input>
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        ></input>
        <button type="submit">Login</button>
      </form>
    </Layout>
  );
};

export { Login };
