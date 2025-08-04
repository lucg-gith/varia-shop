import { useState } from "react";
import { Layout } from "../components/Layout";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("Completar campos");
      return;
    }

    const newUser = {
      username,
      email,
      password,
    };

    console.log(newUser);

    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div>
          <label> Username </label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          ></input>
        </div>
        <div>
          <label> Email </label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
        </div>
        <div>
          <label> Password </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </Layout>
  );
};

export { Register };
