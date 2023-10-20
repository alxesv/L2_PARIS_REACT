import React, { useEffect, useState } from "react";
import { getOneUser } from "../functions/getOneUser";
import { firestore } from "../App";
import "../assets/profile.scss";
import EditPassword from "./EditPassword";
import updateUser from "../functions/updateUser";
import { ToastContainer, toast } from "react-toastify";
import { hasWhiteSpace } from "../functions/hasWhiteSpace";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [changePassword, setChangePassword] = useState<Boolean>();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      getUser().then((res) => {
        if (res.user) {
          setUsername(res.user.username);
          setEmail(res.user.mail);
        }
      });
    }
  }, []);

  useEffect(() => {
    if(changePassword) {
      toast.success("Password updated", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        autoClose: 3000,
      });
      setChangePassword(false);
    }
  }, [changePassword]);

  async function getUser() {
    return await getOneUser({
      db: firestore,
      userId: localStorage.getItem("userId"),
    });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (hasWhiteSpace(username)) {
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

    const result = await updateUser({
      db: firestore,
      userId: localStorage.getItem("userId"),
      username: username,
      email: email,
    });

    if (result === "user doesn't exist") {
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
      return;
    }

    toast.success("User updated", {
      position: "top-center",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      autoClose: 3000,
    });
  }

  return (
    <div className="profilBody">
      <ToastContainer />
      <form className="profilForm" onSubmit={(e) => handleSubmit(e)}>
        <label className="profilLabel">Username :</label>
        <input
          className="profilInput"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="profilLabel">Email :</label>
        <input
          className="profilInput"
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="profilButtons" type="submit">
          Save
        </button>

        <button
          className="profilButtons"
          type="button"
          onClick={() => setOpen(true)}
        >
          Edit password
        </button>
      </form>
      {open ? (
        <EditPassword closeEdit={() => setOpen(false)} changedPassword={() => setChangePassword(true)} />
      ) : null}
    </div>
  );
}
