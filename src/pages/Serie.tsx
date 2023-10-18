import React from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function SeriePage(){

    const navigate = useNavigate();
    const { serieId } = useParams<{serieId:string}>();

    return(
        <div className='container'>
            <h1>
            Series
            </h1>
            <button onClick={() => navigate(-1)}><FontAwesomeIcon className='App-link' icon={faBackspace}/> Retour</button>
        </div>
    )
}

export default SeriePage;