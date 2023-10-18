import React from "react";
import { Link } from "react-router-dom";
import { faStar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection } from "firebase/firestore/lite";
import { firestore } from "../App";

function Series(props : any){

    async function addFollow(db: any, id_serie: number) {
        let user = localStorage.getItem("userId");
        
        await addDoc(collection(db, "follows"), {
            user_id: user,
            serie_id: id_serie,
        });
        alert("Série suivie");
    }

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

export default Series;