import React from "react";
import { Link } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../assets/seriepage.scss';

function Episode(props : any){

    return(
        <div className="episode">
        <div className="episodeHeader">
            <img src={"https://image.tmdb.org/t/p/w200/" + props.poster_path} />
            <h4 className="ctr">{props.data.name}</h4>
            <span className="date">{props.data.air_date}</span>
        </div>
        <span className="rating">{`E${props.data.episode_number}`}</span>
        </div>
    )
}

export default Episode;