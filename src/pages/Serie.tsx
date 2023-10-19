import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

function SeriePage(){
    const TMDB_API_KEY= process.env.REACT_APP_TMDB_API_KEY
    const BASE_URL = "https://api.themoviedb.org/3"

    let navigate = useNavigate();
    
    const [show, setShow] = useState<any>([])
    let { serieId } = useParams();

    async function fetchShow(){
        const res = await fetch(`${BASE_URL}/tv/${serieId}?api_key=${TMDB_API_KEY}&language=fr-FR`);
        const data = await res.json();
        setShow(data);
    }

    useEffect(() => {
        fetchShow();
    }, [])
    
    return(

        <div className="container">
        <button onClick={() => navigate(-1)}><FontAwesomeIcon  className="App-link" icon={faBackspace}/> Retour</button>
        <h1>{show.name}</h1>
            <div className="seriePage">
                <img src={"https://image.tmdb.org/t/p/w400" + show.poster_path} />
                <div className="serieDetail">
                    <div>{show.overview}</div>
                    <div>Date de sortie : {show.first_air_date}</div>
                    <div>Votes : {show.vote_average} <FontAwesomeIcon icon={faStar}/></div>
                </div>
            </div>
        </div>
    )
}

export default SeriePage;