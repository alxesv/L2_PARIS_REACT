import { collection, query, where, getDocs } from 'firebase/firestore/lite';

export async function getOneUser(db: any, email: string) {
    const q = query(collection(db, "users"), where("mail", "==", email));
    const querySnapshot = await getDocs(q);
    const user = querySnapshot.docs[0]?.data();
    const id = querySnapshot.docs[0]?.id;
    if(!user) return {user: null, id: null};
    return {user: user, id: id};
}

