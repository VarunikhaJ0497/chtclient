import "./Auth.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    if (!username || !email || !password) {
      alert("All fields required");
      return;
    }

    await API.post("/auth/register", {
      username,
      email,
      password
    });

    alert("Registered successfully. Please login.");
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>

      <input
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={register}>Register</button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
