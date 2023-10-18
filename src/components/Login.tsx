import React, { useState } from "react";
import "../assets/login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <label className="label">Email :</label>
        <input
          type="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="input"
        />

        <label className="label">Password :</label>
        <input
          type="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="input"
        />

        <button type="submit" className="button-53">
          Login
        </button>
      </form>
    </div>
  );
}
