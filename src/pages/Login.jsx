import { Layout } from "../components/Layout";

const Login = () => {
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
