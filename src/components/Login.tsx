import React, { useState } from "react";
import "../assets/login.scss";
import { firestore } from "../App";
import { getOneUser } from "../functions/getOneUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const bcrypt = require("bcryptjs");
  const navigate = useNavigate();

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
    let exist = await getOneUser({ db: firestore, email: email });

    if (exist.user && bcrypt.compareSync(password, exist.user.password)) {
      localStorage.setItem("userId", exist.id);
      navigate("/");
    }

    if (!exist.user) {
      toast.error("User doesn't exist", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        autoClose: 3000,
      });
      return false;
    } else if (!bcrypt.compareSync(password, exist.user.password)) {
      toast.warning("Wrong password", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        autoClose: 3000,
      });
      return false;
    }
  }

  return (
    <div className="loginBody container">
      <ToastContainer />
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

        <button type="submit" className="loginButtons loginButton">
          Login
        </button>

        <Link className="loginButtons" to="/register">
          Register ?
        </Link>
      </form>
    </div>
  );
}
