import { addDoc, collection } from "firebase/firestore/lite";

export async function addFollow(db: any, id_serie: number) {
    let user = localStorage.getItem("userId");
    
    await addDoc(collection(db, "follows"), {
        user_id: user,
        serie_id: id_serie,
    });
    alert("Série ajoutée à la liste des suivies");
}