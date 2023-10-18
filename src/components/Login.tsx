import React, { useEffect, useState } from "react";
import "../assets/login.scss";
import { firestore } from "../App";
import { getOneUser } from "../functions/getOneUser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const bcrypt = require("bcryptjs");

  useEffect(() => {
    toast("Hello world!")
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();

    let result = login(firestore);

    if (!result) {
      return;
    }

    setEmail("");
    setPassword("");
  }

  async function login(firestore: any) {
    let exist = await getOneUser(firestore, email);

    if (exist.user && bcrypt.compareSync(password, exist.user.password)) {
      alert("User logged in");
      localStorage.setItem("userId", exist.id);
      window.location.href = "/";
    }
    if (!exist.user) {
      alert("User doesn't exist");
      return false;
    }
  }

  return (
    <div className="loginBody">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h1>Login</h1>

      <form onSubmit={(e) => handleSubmit(e)} className="loginForm">
        <label className="loginLabel">Email :</label>
        <input
          type="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="loginInput"
        />

        <label className="loginLabel">Password :</label>
        <input
          type="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="loginInput"
        />

        <button type="submit" className="button-53">
          Login
        </button>
      </form>
    </div>
  );
}