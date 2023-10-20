import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore/lite';

export async function getOneUser(data: any) {
    if(data.email) {
        const q = query(collection(data.db, "users"), where("mail", "==", data.email));
        const querySnapshot = await getDocs(q);
        const user = querySnapshot.docs[0]?.data();
        const id = querySnapshot.docs[0]?.id;
        if(!user) return {user: null, id: null};
        return {user: user, id: id};
    } else if(data.userId) {
        const docRef = doc(data.db, "users", data.userId);
        const wanted_doc = await getDoc(docRef);
        const user = wanted_doc.data();
        const id = wanted_doc.id;
        if(!wanted_doc) return {user: null, id: null};
        return {user: user, id: id}
    }
    return {user: null, id: null};
}

