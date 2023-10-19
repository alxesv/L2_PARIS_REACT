import React from "react";
import { Link } from "react-router-dom";
import { faStar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { firestore } from "../App";
import { addFollow } from '../functions/addFollow'

function SerieFollow(props : any){

    return(
        <div className="serie">
            <Link className="serieLink" to={"/serie/" + props.data.id}>
                {/* Faire une fonction pour mettre une image par défaut si on ne trouve pas l'image ? */}
                <img src={"https://image.tmdb.org/t/p/w200/" + props.data.poster_path} />
                <h4>{props.data.name}</h4>
            </Link>
            <span className="rating">{props.data.vote_average} <FontAwesomeIcon color="yellow" icon={faStar}/></span>
            <button className="followSerie" onClick={() => addFollow(firestore, props.data.id)}><FontAwesomeIcon icon={faPlus}/></button>
        </div>
    )
}

export default SerieFollow;