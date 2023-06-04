import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import "../styles/signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const { signup, error, isloading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await signup(username, password, userType);
  };


  return (
    <div className="pageContainer">
      <div className="signupContainer">
        <form className="signup" onSubmit={handleSubmit}>
          <h3>Sign up</h3>
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
          <label>Owner</label>
          <input
            type="radio"
            name="userType"
            value="owner"
            onChange={(e) => setUserType(e.target.value)}
          />
          <label>Walker</label>
          <input
            type="radio"
            name="userType"
            value="walker"
            onChange={(e) => setUserType(e.target.value)}
          />

          <button disabled={isloading}>Sign up</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
