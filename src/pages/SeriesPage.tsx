import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Serie from '../components/Serie';
import Pagination from '../components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function SeriesPage(){
    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const BASE_URL = 'https://api.themoviedb.org/3';

    const navigate = useNavigate();

    const [series, setSeries] = useState<any[]>([]);
    const { page, genre, query } = useParams<{ page: string, genre: string, query: string }>();

    const fetchSeries = async () => {
        const res = await fetch(`${BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=fr-FR&page=${page}`);
        const data = await res.json();
        setSeries(data.results);
    }

    useEffect(() => {
        fetchSeries();
    }, [page]);


    return(
        <div className='container'>
            <h1>Series</h1>

            <ul className="serieList">
                {series.map((serie, index) => (
                <li key={index}><Serie data={serie} /></li>
                ))}
            </ul>
            
        {series.length > 0 && <Pagination page={page} />}
        {series.length === 0 && <button onClick={() => navigate(-1)}><FontAwesomeIcon className='App-link' icon={faBackspace}/> Retour</button>}
        </div>
    )
}

export default SeriesPage;