import React from "react";
import CalendarItem from "./CalendarItem";

function Day(props : any){
    return(
        <div className='day'>
                    <div className='dayName'><span className={props.currentDay === props.dayNb ? "today" : ""}>{props.dayname}</span>
                    <span>{props.date}</span>
                    </div>
                    <div className='dayContent'>
                    {props.episodes.map((episode : any, index : any) => {
                            const date = new Date(episode.air_date);
                            let dateDay = date.getDay();
                            dateDay = dateDay === 0 ? 7 : dateDay++;
                            if(dateDay === props.dayNb){
                                return(
                                    <CalendarItem key={index} data={episode}/>
                                )
                            }
                        }
                        )}
                    </div>
                </div>
    )
}

export default Day;