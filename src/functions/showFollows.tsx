import { firestore } from "../App";
import { getFollows } from "./getFollows";

const listFollows = [
    {"user_id": "LdGVICQ2rQgWOs9xiRT4", "serie_id": 94722},
    {"user_id": "LdGVICQ2rQgWOs9xiRT4", "serie_id": 84958},
    {"user_id": "LdGVICQ2rQgWOs9xiRT4", "serie_id": 114461},
    {"user_id": "LdGVICQ2rQgWOs9xiRT4", "serie_id": 233643},
    {"user_id": "LdGVICQ2rQgWOs9xiRT4", "serie_id": 219109},
    {"user_id": "LdGVICQ2rQgWOs9xiRT4", "serie_id": 456},
    {"user_id": "LdGVICQ2rQgWOs9xiRT4", "serie_id": 233643},
]

export function showfollows(user_id: any) {
    if (user_id == null) {
        console.log('pas de user')
    } else {
        let allFollows = getFollows(firestore, user_id) ;
        return allFollows;
    }
}