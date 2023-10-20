import { addDoc, collection } from "firebase/firestore/lite";
import { toast } from "react-toastify";


export async function addFollow(db: any, id_serie: number) {
    try {
        let user = localStorage.getItem("userId");
    
        await addDoc(collection(db, "follows"), {
            user_id: user,
            serie_id: id_serie,
        });
        toast.success("Série suivie", {
            position: "top-center",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            autoClose: 2000,
        });
    } catch (e) {
        toast.error("Problème lors de l'ajout", {
            position: "top-center",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            autoClose: 2000,
        });
    }
}