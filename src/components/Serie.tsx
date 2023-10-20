import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faStar, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { firestore } from "../App";
import { addFollow } from '../functions/addFollow'
import { inFollows } from '../functions/inFollows'
import { deleteFollow } from "../functions/deleteFollow";

function Series(props : any){

    const user = localStorage.getItem('userId');
    const navigate = useNavigate();

    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        if (user) {
            inFollows(firestore, user, props.data.id)
                .then(result => {
                    setIsFollowed(result);
                });
        }
    }, [props.data.id])

    const reloadPage = () => {
        if (window.location.pathname === '/followed') {
            window.location.reload();
        }
    }

    return(
        <div className="serie">
            <Link className="serieLink" to={"/serie/" + props.data.id}>
                {/* Faire une fonction pour mettre une image par défaut si on ne trouve pas l'image ? */}
                <img src={"https://image.tmdb.org/t/p/w200/" + props.data.poster_path} />
                <h4>{props.data.name}</h4>
            </Link>
            <span className="rating">{props.data.vote_average} <FontAwesomeIcon color="yellow" icon={faStar}/></span>
            {user ? (
                isFollowed ? (
                    <button className="followSerieDelete" onClick={() => { deleteFollow(firestore, user, props.data.id); setIsFollowed(false); reloadPage() }}><FontAwesomeIcon icon={faXmark}/></button>
                ) : (
                    <button className="followSerieAdd" onClick={() => { addFollow(firestore, props.data.id); setIsFollowed(true); reloadPage() }}><FontAwesomeIcon icon={faPlus}/></button>
                )
            ) : null}   
        </div>
    )
}

export default Series;