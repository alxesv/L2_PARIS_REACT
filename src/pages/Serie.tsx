import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { faStar, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import '../assets/seriepage.scss';
import { Link } from "react-router-dom";
import Season from "../components/Season";
import { addFollow  } from "../functions/addFollow";
import { deleteFollow } from "../functions/deleteFollow";
import { firestore } from "../App";
import { inFollows } from "../functions/inFollows";

function SeriePage(){
    const TMDB_API_KEY= process.env.REACT_APP_TMDB_API_KEY
    const BASE_URL = "https://api.themoviedb.org/3"

    let navigate = useNavigate();
    const user = localStorage.getItem('userId');
    
    const [show, setShow] = useState<any>([])
    const [seasons, setSeasons] = useState<any[]>([])
    const [isFollowed, setIsFollowed] = useState(false);
    let { serieId } = useParams();

    async function fetchShow(){
        const res = await fetch(`${BASE_URL}/tv/${serieId}?api_key=${TMDB_API_KEY}&language=fr-FR`);
        const data = await res.json();
        setShow(data);
    }

    async function fetchSeasons(show : any){
        let seasonList : any[] = [];
        for (let i = 1; i <= show.number_of_seasons; i++) {
            const res = await fetch(`${BASE_URL}/tv/${show.id}/season/${i}?api_key=${TMDB_API_KEY}&language=fr-FR`);
            const data = await res.json();
            seasonList.push(data);
            seasonList = seasonList.filter((season, index) => seasonList.indexOf(season) === index);
        }
        setSeasons(seasonList);
    }
    
    useEffect(() => {
        if (user) {
            inFollows(firestore, user, Number(serieId))
                .then(result => {
                    setIsFollowed(result);
                });
        }
    }, [show])

    useEffect(() => {
        fetchShow()
    }, [])

    useEffect(() => {
        fetchSeasons(show);
    }, [show])
    
    return(

        <div className="container">
        <button onClick={() => navigate(-1)} className="btn-back"><FontAwesomeIcon className="App-link" icon={faBackspace}/> Retour</button>
        <div className="backdrop" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`}}>
        <h1>{show.name}</h1>
        </div>
            <div className="seriePage">
                <div className="serieDetail">
                    <div>{show.overview}</div>
                    <div>Date de sortie : {show.first_air_date}</div>
                    <div>Votes : {show.vote_average} <FontAwesomeIcon color="yellow" icon={faStar}/></div>
                    <div>Nombre de saisons : {show.number_of_seasons}</div>
                    <div>
                    </div>
                    {(show.created_by && show.created_by.length > 0 )?<div>
                        Créé par : {show.created_by && show.created_by.map((creator : any) => {
                        return <span key={creator.id}>{creator.name} </span>
                    })}
                    </div> : ''}
                    <div>Genres :&nbsp;
                        {show.genres && show.genres.map((genre : any) => {
                            return <Link to ={`/series/${genre.id}/1`} className="genre" key={genre.id}>{genre.name} </Link>
                        })}
                    </div>
                    <div>
                        Suivre 
                    {user ? (
                        serieId ? (
                            isFollowed ? (
                                <button className="followSerieDeleteDetail" onClick={() => { deleteFollow(firestore, user, Number(serieId)); setIsFollowed(false) }}><FontAwesomeIcon icon={faXmark}/></button>
                            ) : (
                                <button className="followSerieAddDetail" onClick={() => { addFollow(firestore, Number(serieId)); setIsFollowed(true) }}><FontAwesomeIcon icon={faPlus}/></button>
                            )
                        ) :  undefined
                    ) : null}   
                    </div>
                </div>
                <div className="seasons">
                        {seasons && seasons.map((season : any) => {
                            return <Season data={season} key={season.id}/>
                        })}
                
                </div>
            </div>
        </div>
    )
}

export default SeriePage;