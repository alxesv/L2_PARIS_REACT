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

    // Supprimez ce commentaire pour activer la vérification du mot de passe
    /* const check = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
    );
    if (hasWhiteSpace(username)) {
      alert("Le nom d'utilisateur ne doit pas contenir d'espaces");
      return;
    }
    if (!check.test(password) || hasWhiteSpace(password)) {
      alert(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial, sans espaces"
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
      alert("L'utilisateur existe déjà");
      return false;
    }
    if (exist.length === 0) {
      alert("L'utilisateur a été créé");
    }

    try {
      const { id } = await addDoc(collection(db, "users"), {
        username: username,
        mail: email,
        password: hash,
      });

      localStorage.setItem("userId", id);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur :", error);
      // Gérez l'erreur ici
    }
  }

  return (
    <div className="registerBody">
      <h1>Inscription</h1>

      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <label className="label">Nom d'utilisateur :</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          required
          className="input"
        />

        <label className="label">E-mail :</label>
        <input
          type="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="input"
        />

        <label className="label">Mot de passe :</label>
        <input
          type="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="input"
        />

        <button type="submit" className="button-54">
          S'inscrire
        </button>
      </form>
    </div>
  );
}

export default Register;
