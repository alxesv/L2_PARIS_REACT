import React from "react";
import { getOneUser } from "./getOneUser";
import { doc, updateDoc } from "firebase/firestore/lite";

export default async function changePassword(data: any) {
  const bcrypt = require("bcryptjs");
  const salt = bcrypt.genSaltSync(10);
  const exist = await getOneUser({ db: data.db, userId: data.userId });

  if (!exist.user) return "user doesn't exist";

  if (bcrypt.compareSync(data.currentPassword, exist.user.password)) {
    const docRef = doc(data.db, "users", exist.id);
    const hashedPassword = bcrypt.hashSync(data.newPassword, salt);
    updateDoc(docRef, {
      password: hashedPassword,
    });
    return true;
  } else {
    return "wrong password";
  }
}
