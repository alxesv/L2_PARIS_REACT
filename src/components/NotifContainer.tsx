import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import '../assets/notifContainer.scss';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function NotifContainer(props : any){

    const user = props.currentUser;

    const [notif, setNotif] = useState<any>([]);


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
                <li> Notif 1 </li>
                <li> Notif 2 </li>
                <li> Notif 3 </li>
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