import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faStar, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { firestore } from "../App";
import { addFollow } from '../functions/addFollow'
import { inFollows } from '../functions/inFollows'
import { deleteFollow } from "../functions/deleteFollow";
import { useLocation } from "react-router-dom";

function Series(props : any){

    const user = localStorage.getItem('userId');
    const location = useLocation();
    const page = location.pathname.split('/')[1];

    const [isFollowed, setIsFollowed] = useState(false);

    function removeFromFollow(id : any){
        if(page === "followed"){
            let newfollowList = props.follows.filter((follow : any) => follow.serie_id !== id)
            props.stateChanger(newfollowList)
        } else{
            return;
        }
    }

    useEffect(() => {
        if (user) {
            inFollows(firestore, user, props.data.id)
                .then(result => {
                    setIsFollowed(result);
                });
        }
    }, [props.data.id])

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
                    <button className="followSerieDelete" onClick={() => { deleteFollow(firestore, user, props.data.id); setIsFollowed(false); removeFromFollow(props.data.id)}}><FontAwesomeIcon icon={faXmark}/></button>
                ) : (
                    <button className="followSerieAdd" onClick={() => { addFollow(firestore, props.data.id); setIsFollowed(true);}}><FontAwesomeIcon icon={faPlus}/></button>
                )
            ) : null}   
        </div>
    )
}

export default Series;