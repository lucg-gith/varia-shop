import { Layout } from "../components/Layout";
import { useEffect, useState } from "react";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/pages/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();

  // NOTA: todos los hooks se declaran antes de usar
  const navigate = useNavigate();

  // NOTA al profe: No use el use state para setear caso de error porque agregue' required dentro del form.
  const handleLogin = async (e) => {
    e.preventDefault();

    await login({
      username: username.trim(),
      password: password.trim(),
    });

    // NOTA al profe: aca use trim porque me generaba error cuando copiaba
    // con espacios el user me parecio practico para no tener tanto ese error.
  };

  // NOTA: recordar que el useeffect es una arrow fuction sin aprametros
  useEffect(() => {
    user && navigate("/");
  }, [user]);

  return (
    <Layout>
      <p className=" text-decoration-underline user-card p-3  bg-body rounded-top-3 mb-0 text-center">
        Usuarios para test
      </p>
      <p className=" user-card p-3  bg-body rounded-top-3 mb-0 text-center">
        username: donero, password: ewedon
      </p>
      <p className=" user-card p-3  bg-body rounded-bottom-3 mt-0 text-center border-top-0">
        username: johnd, password: m38rmF$
      </p>
      <form
        onSubmit={handleLogin}
        className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto my-4 p-4 rounded-4 border border-success bg-body shadow-sm"
      >
        <div className="mb-3">
          <label className="form-label"> Username </label>
          <input
            type="text"
            placeholder="Username"
            name="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label"> Password </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>

        <div>
          <button className="btn btn-success w-100">Login</button>
        </div>

        {user && (
          <p className="alert alert-success text-center mt-3">
            USUARIO LOGEADO
          </p>
        )}
      </form>
    </Layout>
  );
};

export { Login };
