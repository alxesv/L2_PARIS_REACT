import React from 'react';
import { getFollows } from '../functions/getFollows';
import { firestore } from "../App";

function Follow(){

    async function user(db: any) {
        const user_id = localStorage.getItem('userId');
        if (user_id == null) {
            console.log('pas de user')
        } else {
            let user = await getFollows(firestore, user_id);
            console.log("user : ", user)
        }
      }

    return(
        <div className='container'>
            <h2>
                Voici le composant du suivre séries
            </h2>
            <button onClick={(e) => user(firestore)}>Console log</button>
        </div>
    )
}

export default Follow;