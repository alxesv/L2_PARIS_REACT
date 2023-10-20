import React, { useState } from "react";
import "../assets/editPassword.scss";
import { hasWhiteSpace } from "../functions/hasWhiteSpace";
import { ToastContainer, toast } from "react-toastify";
import changePassword from "../functions/changePassword";
import { firestore } from "../App";

export default function EditPassword({ closeEdit, changedPassword }: any) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    // remove this comment to enable password check
    /* const check = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
    );

    if (!check.test(newPassword) || hasWhiteSpace(newPassword)) {
      //alert(
      //  "New password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character and no spaces"
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

    const result = await changePassword({
      db: firestore,
      currentPassword: currentPassword,
      newPassword: newPassword,
      userId: localStorage.getItem("userId"),
    });

    if (result === "wrong password") {
      toast.warning("Current password is wrong", {
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
    } else if (result === "user doesn't exist") {
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
    changedPassword();
    closeEdit();
  }

  return (
    <div className="editPasswordContainer">
      <div className="editPasswordBody">
        <ToastContainer />
        <h1>Edit password</h1>
        <form className="editPasswordForm" onSubmit={(e) => handleSubmit(e)}>
          <label>Current password :</label>
          <input
            type="password"
            name="currentPassword"
            required
            onChange={(e) => setCurrentPassword(e.target.value)}
            value={currentPassword}
            className="editPasswordInput"
          />

          <label className="editPasswordLabel">New password :</label>
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            className="editPasswordInput"
          />

          <button type="submit" className="editPasswordButtons">
            Save
          </button>
        </form>
        <button onClick={closeEdit} className="editPasswordButtons">
          Cancel
        </button>
      </div>
    </div>
  );
}
