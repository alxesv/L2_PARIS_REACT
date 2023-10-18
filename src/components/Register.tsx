import React, { useState } from "react";
import "../assets/register.scss";
import { firestore } from "../App";
import {
  collection,
  addDoc,
} from "firebase/firestore/lite";
import { getOneUser } from "../functions/getOneUser";
import { hasWhiteSpace } from "../functions/hasWhiteSpace";
import { useNavigate } from "react-router-dom";

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
      alert("Username must not contain any spaces");
      return;
    }
    if (!check.test(password) || hasWhiteSpace(password)) {
      alert(
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character and no spaces"
      );
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
    let exist = await getOneUser(firestore, email);

    if (exist.length > 0) {
      alert("User already exist");
      return false;
    }
    if (exist.length === 0) {
      alert("User created");
    }

    const { id } = await addDoc(collection(db, "users"), {
      username: username,
      mail: email,
      password: hash,
    });

    localStorage.setItem("userId", id);
  }

  return (
    <div className="registerBody">
      <h1>Register</h1>

      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <label className="label">Username :</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          required
          className="input"
        />

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

        <button type="submit" className="button-54">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
