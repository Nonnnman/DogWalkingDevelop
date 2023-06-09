import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const { login, error, isloading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password);
  };

  return (
    <div className="pageContainer">
      <div className="loginContainer">
        <form className="login" onSubmit={handleSubmit}>
          <h3>Log in</h3>
          <label>Username:</label>
          <input
            type="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <button disabled={isloading}>Log in</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
