import React, { useEffect, useState } from 'react';
import '../assets/calendar.scss'
import { firestore } from "../App";
import { collection, query, where, getDocs } from 'firebase/firestore/lite';
import CalendarItem from '../components/CalendarItem';
import { getUserId } from '../functions/getUserId';


function CalendarPage(){
    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const BASE_URL = 'https://api.themoviedb.org/3';

    const user_id  : any = getUserId();


    let followList : string[] = [];
    const [episodes, setEpisodes] = useState<any[]>([]);

    const currentDate : Date = new Date();
    const currentDay : number = currentDate.getDay();
    const calendarSeries : any[] = [];

    function getDate(day : number, currentDay : number, currentDate : Date) {
        let date = new Date(currentDate);
        if(day === 0){
            day = 7;
        }
        if(day < currentDay){
            date.setDate(date.getDate() - (currentDay - day));
        }else{
            date.setDate(date.getDate() + (day - currentDay));
        }
        let dateFormat = date.toLocaleDateString('fr-FR', {day: 'numeric', month: 'numeric'});
        return dateFormat;
    }



    async function getFollowList(db: any, userId: string) {
        const q = query(collection(db, "follows"), where("user_id", "==", userId));
        const querySnapshot = await getDocs(q);
        const follows = querySnapshot.docs.map((doc) => doc.data());
        return follows;
    }

    async function filterSeries(followList: string[]) {
        for (let i = 0; i < followList.length; i++) {
            const res = await fetch(`${BASE_URL}/tv/${followList[i]}?api_key=${TMDB_API_KEY}&language=fr-FR`);
            const data = await res.json();
            console.log(data);
            if(data.next_episode_to_air !== null){
                const nextEpisode = data.next_episode_to_air;
                const nextEpisodeDate = new Date(nextEpisode.air_date);
                if(nextEpisodeDate >= currentDate && (nextEpisodeDate.getTime()-currentDate.getTime())/(1000*60*60*24) < 7){
                    if(calendarSeries.filter((serie) => serie.id === data.id).length === 0){
                    calendarSeries.push(data);
                    }
                }
            }
        }
    }

    async function getUpcomingEpisodes() {
        let weekEpisodes : Object[] = [];
        for (let i = 0; i < calendarSeries.length; i++) {
            const res = await fetch(`${BASE_URL}/tv/${calendarSeries[i].id}/season/${calendarSeries[i].next_episode_to_air.season_number}/episode/${calendarSeries[i].next_episode_to_air.episode_number}?api_key=${TMDB_API_KEY}&language=fr-FR`);
            const data = await res.json();
            data['serie_id'] = calendarSeries[i].id;
            data['serie_name'] = calendarSeries[i].name;
            data['serie_poster'] = calendarSeries[i].poster_path;
            data['serie_backdrop'] = calendarSeries[i].backdrop_path;
            weekEpisodes.push(data);
        }
        setEpisodes(weekEpisodes);
    }

    useEffect(() => {
        try {
            getFollowList(firestore, user_id).then((follows) => {
                follows.map((follow) => {
                    followList.push(follow.serie_id);
                }
                )
            }).then(() => {
                followList = (followList.filter((follow, index) => followList.indexOf(follow) === index))
            }
            ).then(() => {
            filterSeries(followList).then(() => {
                getUpcomingEpisodes();
            });
        });
        }
        catch (error) {
            console.log(error);
        }
        
    }, []);


    return(
        <div className='container'>
            <h1>
            Calendar Page
            </h1>
            <div className="calendar">
                <div className='day'>
                    <div className='dayName'><span className={currentDay === 1 ? "today" : ""}>Lundi</span>
                    <span>{getDate(1, currentDay, currentDate)}</span>
                    </div>
                    <div className='dayContent'>
                        {episodes.map((episode, index) => {
                            const date = new Date(episode.air_date);
                            if(date.getDay() === 1){
                                return(
                                    <CalendarItem key={index} data={episode}/>
                                )
                            }
                        }
                        )}
                    </div>
                </div>
                <div className='day'>
                    <div className='dayName'><span className={currentDay === 2 ? "today" : ""}>Mardi</span>
                    <span>{getDate(2, currentDay, currentDate)}</span>
                    </div>
                    <div className='dayContent'>
                    {episodes.map((episode, index) => {
                            const date = new Date(episode.air_date);
                            if(date.getDay() === 2){
                                return(
                                    <CalendarItem key={index} data={episode}/>
                                )
                            }
                        }
                        )}
                    </div>
                </div>
                <div className='day'>
                    <div className='dayName'><span className={currentDay === 3 ? "today" : ""}>Mercredi</span>
                    <span>{getDate(3, currentDay, currentDate)}</span>
                    </div>
                    <div className='dayContent'>
                    {episodes.map((episode, index) => {
                            const date = new Date(episode.air_date);
                            if(date.getDay() === 3){
                                return(
                                    <CalendarItem key={index} data={episode}/>
                                )
                            }
                        }
                        )}
                    </div>
                </div>
                <div className='day'>
                    <div className='dayName'><span className={currentDay === 4 ? "today" : ""}>Jeudi</span>
                    <span>{getDate(4, currentDay, currentDate)}</span>
                    </div>
                    <div className='dayContent'>
                    {episodes.map((episode, index) => {
                            const date = new Date(episode.air_date);
                            if(date.getDay() === 4){
                                return(
                                    <CalendarItem key={index} data={episode}/>
                                )
                            }
                        }
                        )}
                    </div>
                </div>
                <div className='day'>
                    <div className='dayName'><span className={currentDay === 5 ? "today" : ""}>Vendredi</span>
                    <span>{getDate(5, currentDay, currentDate)}</span>
                    </div>
                    <div className='dayContent'>
                    {episodes.map((episode, index) => {
                            const date = new Date(episode.air_date);
                            if(date.getDay() === 5){
                                return(
                                    <CalendarItem key={index} data={episode}/>
                                )
                            }
                        }
                        )}
                    </div>
                </div>
                <div className='day'>
                    <div className='dayName'><span className={currentDay === 6 ? "today" : ""}>Samedi</span>
                    <span>{getDate(6, currentDay, currentDate)}</span>
                    </div>
                    <div className='dayContent'>
                    {episodes.map((episode, index) => {
                            const date = new Date(episode.air_date);
                            if(date.getDay() === 6){
                                return(
                                    <CalendarItem key={index} data={episode}/>
                                )
                            }
                        }
                        )}
                    </div>
                </div>
                <div className='day'>
                    <div className='dayName'><span className={currentDay === 0 ? "today" : ""}>Dimanche</span>
                    <span>{getDate(0, currentDay, currentDate)}</span>
                    </div>
                    <div className='dayContent'>
                    {episodes.map((episode, index) => {
                            const date = new Date(episode.air_date);
                            if(date.getDay() === 0){
                                return(
                                    <CalendarItem key={index} data={episode}/>
                                )
                            }
                        }
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalendarPage;