import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import '../assets/notifContainer.scss';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Notifiaction from './Notification';
import { getFollows } from '../functions/getFollows';
import { firestore } from "../App";

function NotifContainer(props : any){

    const BASE_URL = 'https://api.themoviedb.org/3';
    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

    const currentDate = new Date();

    const user = props.currentUser;
    const [notif, setNotif] = useState<any>([]);
    const [follows, setFollows] = useState<any>([]);

    async function getEpisodes() {
        let notifList : any[] = [];
            for (let i = 0; i < follows.length; i++) {
                const res = await fetch(`${BASE_URL}/tv/${follows[i]}?api_key=${TMDB_API_KEY}&language=fr-FR`);
                const data = await res.json();
                if(data.next_episode_to_air !== null){
                    const nextEpisode = data.next_episode_to_air;
                    const nextEpisodeDate = new Date(nextEpisode.air_date);
                    if(nextEpisodeDate >= currentDate && (nextEpisodeDate.getTime()-currentDate.getTime())/(1000*60*60*24) <= 1){
                        notifList.push(data);
                    }
                }
            }
            setNotif(notifList);
        }

    useEffect(() => {
        if(user.id !== undefined){
            try{
                let followList : string[] = [];
                getFollows(firestore, user.id)
                    .then(result => {
                        result.forEach((follow : any) => {
                            followList.push(follow.serie_id);
                        });
                        setFollows(followList);
                    })
            }
            catch(e){
                console.log(e);
            }
        }
    }, [user])

    useEffect(() => {
        if(follows.length > 0){
            getEpisodes();
        }
    }
    , [follows])

    useEffect(() => {
        if (notif.length > 0) {
            props.stateChanger(true);
        }
        else {
            props.stateChanger(false);
        }
    }
    , [notif])


    function closeMenu(){
        document.querySelector('.notifContainer')?.classList.add('hide');
        document.querySelector('.notifContainer')?.classList.remove('visible');
        document.getElementById('notifButton')?.classList.remove('active');
    }

    return(
        <div className="notifContainer hide">
            <button className="btn-reset"><FontAwesomeIcon icon={faClose} onClick={closeMenu}/></button>
            {user.notification ? 
            <ul>
                <span>A venir dans les prochaines 24h :</span>
                {notif.map((serie : any) => {
                    return<li><Notifiaction key={serie.id} serie={serie} /></li>
                })}
            </ul>
            :
            <div className='noNotif'>
                Vous n'avez pas activé les notifications. &nbsp;
                <Link className="App-link" to="/profile" onClick={closeMenu}>Modifier</Link>
            </div>
            }
        </div>
    )
}

export default NotifContainer;