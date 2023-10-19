import { getFollows } from "./getFollows";
import { firestore } from "../App";

export async function showfollows(user_id: any) {
    if (user_id == null) {
        console.log('pas de user')
    } else {
        let allFollows = await getFollows(firestore, user_id);
        return allFollows;
    }
}