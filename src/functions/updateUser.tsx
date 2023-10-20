import React from "react";
import { getOneUser } from "./getOneUser";
import { doc, updateDoc } from "firebase/firestore/lite";

export default async function updateUser(data: any) {
  const exist = await getOneUser({ db: data.db, userId: data.userId });

  if (!exist.user) return "user doesn't exist";

  const docRef = doc(data.db, "users", exist.id);
  updateDoc(docRef, {
    username: data.username,
    mail: data.email,
    notification: data.notification,
  });
  return true;
}
