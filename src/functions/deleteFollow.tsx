import { collection, doc, deleteDoc, getDocs, query, where } from 'firebase/firestore/lite';
import { toast } from "react-toastify";

// Fonction pour supprimer un follow
export async function deleteFollow(db: any, user_id: string, serie_id: number) {
    try {
        const q = query(collection(db, "follows"), where("user_id", "==", user_id), where("serie_id", "==", serie_id));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
            const docId = querySnapshot.docs[0].id;
            const followRef = doc(collection(db, "follows"), docId);
            await deleteDoc(followRef);
            toast.success("Suivie supprimé", {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                autoClose: 2000,
            });
            return true; 
        } else {
            toast.error("User doesn't exist", {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                autoClose: 2000,
            });
            return false;
        }
    } catch (error) {
        toast.error("Problème de suppression", {
            position: "top-center",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            autoClose: 2000,
        });
        return false;
    }
}