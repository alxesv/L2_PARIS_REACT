import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faStar, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { firestore } from "../App";
import { addFollow } from '../functions/addFollow'
import { inFollows } from '../functions/inFollows'

function Series(props : any){

    const user = localStorage.getItem('userId');
    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        if (user) {
            inFollows(firestore, user, props.data.id)
                .then(result => {
                    setIsFollowed(result);
                });
        }
    }, [])

    return(
        <div className="serie">
            <Link className="serieLink" to={"/serie/" + props.data.id}>
                {/* Faire une fonction pour mettre une image par défaut si on ne trouve pas l'image ? */}
                <img src={"https://image.tmdb.org/t/p/w200/" + props.data.poster_path} />
                <h4>{props.data.name}</h4>
            </Link>
            <span className="rating">{props.data.vote_average} <FontAwesomeIcon color="yellow" icon={faStar}/></span>
        {
            isFollowed ? (
                <button className="followSerie" onClick={() => addFollow(firestore, props.data.id)}><FontAwesomeIcon icon={faMinus}/></button>
            ) : (
                <button className="followSerie" onClick={() => addFollow(firestore, props.data.id)}><FontAwesomeIcon icon={faPlus}/></button>
            )
        }
        </div>
    )
}

export default Series;