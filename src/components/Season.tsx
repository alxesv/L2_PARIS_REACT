import React from "react";
import { Link } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../assets/seriepage.scss';
import Episode from "./Episode";

function Season(props : any){
    const episodes = props.data.episodes;

    return(
        <div className="season">
            <div>
                <h3>{props.data.name}</h3>
                <span className="rating">{props.data.vote_average} <FontAwesomeIcon color="yellow" icon={faStar}/></span>
            <span className="date">
                Date de sortie : {props.data.air_date}
            </span>
            </div>
            <div>
                {props.data.overview}
            </div>
            <div className="episodes">
                {episodes && episodes.map((episode : any) => {
                    return(
                        <Episode data={episode} key={episode.id} poster_path={props.data.poster_path}/>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default Season;