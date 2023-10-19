import { collection, doc, deleteDoc, getDocs, query, where } from 'firebase/firestore/lite';
import { firestore } from '../App';

// Fonction pour supprimer un follow
export async function deleteFollow(db: any, user_id: string, serie_id: number) {
    try {
        const q = query(collection(db, "follows"), where("user_id", "==", user_id), where("serie_id", "==", serie_id));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
            const docId = querySnapshot.docs[0].id;
            const followRef = doc(collection(db, "follows"), docId);
            await deleteDoc(followRef);
            return true; 
        } else {
            return false; 
        }
    } catch (error) {
        return false; 
    }
}