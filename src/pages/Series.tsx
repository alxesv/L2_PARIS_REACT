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

    const [genres, setGenres] = useState<any[]>([]);
    const [series, setSeries] = useState<any[]>([]);

    const [sort, setSort] = useState<string>('popularity.desc');

    const { page, genre, query } = useParams<{ page: string, genre: string, query: string }>();

    async function fetchSeries () {
        const res = await fetch(`${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&language=fr-FR&page=${page}&sort_by=${sort}`);
        const data = await res.json();
        setSeries(data.results);
    }

    async function fetchSeriesByGenre () {
        const res = await fetch(`${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&language=fr-FR&page=${page}&with_genres=${genre}&sort_by=${sort}`);
        const data = await res.json();
        setSeries(data.results);
    }

    async function getGenres(){
        const res = await fetch(`${BASE_URL}/genre/tv/list?api_key=${TMDB_API_KEY}&language=fr-FR&`);
        const data = await res.json();
        return data.genres;
    }

    function gotoGenre(genreId : string){
        if(genreId){
            navigate('/series/' + genreId + '/1');
        }
        else{
            navigate('/series/1');
        }
    }

    useEffect(() => {
        try {
            getGenres().then((genres) => {
                setGenres(genres);
            });
        }
        catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        try {
            if(genre){
                fetchSeriesByGenre();
            }
            else{
                fetchSeries();
            }
        }
        catch (error) {
            console.log(error);
        }
    }, [page, genre, sort]);

    return(
        <div className='container'>
            <h1>Series</h1>

            <select className='genreSelect' onChange={(e) => gotoGenre(e.target.value)}>
            <option value="">Tous les genres</option>
            {genres.map((g, index) => (
                <option selected={g.id==genre} key={index} value={g.id}>{g.name}</option>
            ))}
            </select>
            <div className='sortSelect'>
            <label>Trier par : </label>
            <select onChange={(e) => setSort(e.target.value)}>
                <option value="popularity.desc">Popularité</option>
                <option value="vote_average.desc">Note</option>
                <option value="first_air_date.desc">Date de sortie</option>
            </select>
            </div>
            <ul className="serieList">
                {series?.map((serie, index) => (
                <li key={index}><Serie data={serie} /></li>
                ))}
            </ul>

            {!series &&
             <>
            <div>Aucune série trouvée</div>
            <button onClick={() => navigate(-1)}><FontAwesomeIcon className='App-link' icon={faBackspace}/> Retour</button>
            </>
            }
            
        {series && <Pagination page={page} />}
        </div>
    )
}

export default SeriesPage;