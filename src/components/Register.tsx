import React, { useState } from "react";
import "../assets/register.scss";
import { firestore } from "../App";
import { collection, addDoc } from "firebase/firestore/lite";
import { getOneUser } from "../functions/getOneUser";
import { hasWhiteSpace } from "../functions/hasWhiteSpace";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const bcrypt = require("bcryptjs");
  const salt = bcrypt.genSaltSync(10);
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();

    // remove this comment to enable password check

    /* const check = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
    );
    if(hasWhiteSpace(username)){
      //alert("Username must not contain any spaces");
      toast.warning("Username must not contain any spaces", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        autoClose: 3000,
      });
      
      return;
    }
    if (!check.test(password) || hasWhiteSpace(password)) {
      //alert(
      //  "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character and no spaces"
      //);
      toast.warning("Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character and no spaces", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        autoClose: 3000,
      });
      
      return;
    } */

    let result = await register(firestore);
    if (result === false) {
      return;
    }

    setUsername("");
    setEmail("");
    setPassword("");

    navigate("/");
  }

  async function register(db: any) {
    const hash = bcrypt.hashSync(password, salt);
    let exist = await getOneUser({ db: firestore, email: email });

    if (exist.user) {
      toast.error("User already exist", {
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

    const { id } = await addDoc(collection(db, "users"), {
      username: username,
      mail: email,
      password: hash,
      notification: false
    });

    localStorage.setItem("userId", id);
  }

  return (
    <div className="registerBody">
      <ToastContainer />
      <h1>Register</h1>

      <form onSubmit={(e) => handleSubmit(e)} className="registerForm">
        <label className="registerLabel">Username :</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          required
          className="registerInput"
        />

        <label className="registerLabel">Email :</label>
        <input
          type="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="registerInput"
        />

        <label className="registerLabel">Password :</label>
        <input
          type="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="registerInput"
        />

        <button type="submit" className="registerButtons registerButton">
          Register
        </button>

        <Link className="registerButtons" to="/login">
          login ?
        </Link>
      </form>
    </div>
  );
}

export default Register;
