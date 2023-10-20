import react from 'react';
import { Link } from 'react-router-dom';

function Notification(props : any){
    return (
        <div className="serie">
        <Link className="serieLink" to={"/serie/" + props.serie.id}>
            <img src={"https://image.tmdb.org/t/p/w200/" + props.serie.backdrop_path} />
            <span className="ctr">{props.serie.name}</span>
        </Link>
        <span className="rating">{`E${props.serie.next_episode_to_air.episode_number} S${props.serie.next_episode_to_air.season_number}`}</span>
        </div>
    )

}

export default Notification;