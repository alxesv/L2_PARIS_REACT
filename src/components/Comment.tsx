import { useState } from "react";
import { getUserId } from "../functions/getUserId";
import { getFirestore, collection, addDoc } from "firebase/firestore/lite";
import { initializeApp } from "firebase/app";
import App from "../App";

function Comment() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    const userId = getUserId();
  
    if (userId) {
      const serieId = 'votre_serie_id';
  
      addDoc(collection(db, "Comments"), {
        comment: comment,
        serie_id: serieId,
        user_id: userId,
        rating: rating,
      })
        .then(() => {
          setComment("");
          setRating(0);
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout du commentaire :", error);
        });
    } else {
      console.error("L'utilisateur n'est pas connecté.");
    }
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder="Laisser un commentaire..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <input
        type="number"
        placeholder="Note (1-5)"
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
      />
      <button onClick={handleSubmit}>Publier</button>
    </div>
  );
}

export default Comment;
