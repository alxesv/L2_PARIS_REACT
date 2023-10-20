import { collection, query, where, getDocs, and } from 'firebase/firestore/lite';

export async function inFollows(db: any, user_id: string, serie_id: number) {
    const q = query(collection(db, "follows"), where("user_id", "==", user_id), where("serie_id", "==", serie_id));
    const querySnapshot = await getDocs(q);
    const follows = querySnapshot.docs[0]?.data();
    if(follows === undefined) {
        return false
    } else {
        if(follows.serie_id === undefined){
            return false
        } else {
            return true
        }
    }
}