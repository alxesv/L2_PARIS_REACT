import { Firestore, DocumentData, QuerySnapshot, query, where, getDocs } from 'firebase/firestore/lite';
import { collection } from 'firebase/firestore/lite'; // Assurez-vous d'importer collection depuis firebase/firestore/lite

// Spécifiez le type pour db (Firestore) et userId (string)
export async function getOneUserById(db: Firestore, userId: string) {
  const q = query(collection(db, 'users'), where('users_id', '==', userId));
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
  const user = querySnapshot.docs[0]?.data();
  const id = querySnapshot.docs[0]?.id;
  if (!user) return { user: null, id: null };
  return { user, id };
}
