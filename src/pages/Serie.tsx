import React from 'react';
import { useParams } from 'react-router-dom';

function SeriePage(){

    const { serieId } = useParams<{serieId:string}>();

    return(
        <div className='container'>
            <h1>
            Series
            </h1>
        </div>
    )
}

export default SeriePage;