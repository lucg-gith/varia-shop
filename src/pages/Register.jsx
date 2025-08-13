import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [redirecting, setRedirecting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !email || !password) {
      setError("Completar todos los campos vacios por favor");
      return;
    }

    register({ username, email, password });

    setSuccess("Usuario registrado");
    setRedirecting(true);

    setUsername("");
    setEmail("");
    setPassword("");
    // navigate("/");

    setTimeout(() => {
      setRedirect(true);
      // navigate("/");
    }, 2000);
  };

  useEffect(() => {
    if (redirect) {
      navigate("/");
    }
  }, [redirect]);

  return (
    <Layout>
      <div
        className="d-flex justify-content-center"
        style={{ paddingBottom: "50px" }}
      >
        <div className="card p-4" style={{ width: "400px" }}>
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="form-control"
                disabled={redirecting}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control"
                disabled={redirecting}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="form-control"
                disabled={redirecting}
              />
            </div>
            <div className="mt-3">
              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={redirecting}
              >
                {redirecting ? "Redireccionando..." : "Register"}
              </button>
            </div>
          </form>

          {error && <p className="text-danger mt-3">{error}</p>}
          {success && (
            <p className="text-success mt-3">
              {success} {redirecting && "Redireccionando en 2 segundos"}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export { Register };
