import React from "react";
import { Link } from "react-router-dom";

function CalendarItem(props : any){
    return(
        <div className="serie">
        <Link className="serieLink" to={"/serie/" + props.data.serie_id}>
            <img src={"https://image.tmdb.org/t/p/w200/" + props.data.serie_backdrop} />
            <span className="ctr">{props.data.serie_name}</span>
        </Link>
        <span className="rating">{`E${props.data.episode_number} S${props.data.season_number}`}</span>
        </div>
    )
}

export default CalendarItem;