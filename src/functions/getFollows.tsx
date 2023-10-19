import { collection, query, where, getDocs } from 'firebase/firestore/lite';

export async function getFollows(db: any, user_id: string) {
    const q = query(collection(db, "follows"), where("user_id", "==", user_id));
    const querySnapshot = await getDocs(q);
    const follows = querySnapshot.docs.map((doc) => doc.data());
    return follows;
}
