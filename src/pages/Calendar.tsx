import React, { useEffect, useState } from 'react';
import '../assets/calendar.scss'
import { firestore } from "../App";
import { collection, query, where, getDocs } from 'firebase/firestore/lite';
import CalendarItem from '../components/CalendarItem';
import { getUserId } from '../functions/getUserId';
import Day from '../components/Day';


function CalendarPage(){
    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const BASE_URL = 'https://api.themoviedb.org/3';

    const user_id  : any = getUserId();
    const days : string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

    let followList : string[] = [];
    const [episodes, setEpisodes] = useState<any[]>([]);

    const currentDate : Date = new Date();
    const currentDay : number = currentDate.getDay();
    const calendarSeries : any[] = [];

    function getDate(day : number, currentDay : number, currentDate : Date) {
        let date = new Date(currentDate);
        if(day < currentDay){
            date.setDate(date.getDate() - (currentDay - day) + 1);
        }else{
            date.setDate(date.getDate() + (day - currentDay) + 1);
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
                {days.map((day, index) => {
                    return(
                        <Day dayname={day} currentDay={currentDay} currentDate={currentDate} episodes={episodes} key={index} dayNb={index+1} date={getDate(index, currentDay, currentDate)}/>
                    )
                })}
            </div>
        </div>
    )
}

export default CalendarPage;