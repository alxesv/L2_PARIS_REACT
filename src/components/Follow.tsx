import React, { useEffect, useState } from 'react';
import { showfollows } from '../functions/showFollows';
import Serie from '../components/Serie';
import { useLocation } from 'react-router';

function Follow() {
  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';

  const user = localStorage.getItem('userId');

  const [follows, setFollows] = useState<any[]>([]); 
  const [series, setSeries] = useState<any[]>([]);

  const fetchSeriesForFollows = async () => {
    const seriesData = await Promise.all(
      follows.map(async (follow) => {
        const res = await fetch(`${BASE_URL}/tv/${follow.serie_id }?api_key=${TMDB_API_KEY}`);
        const data = await res.json();
        return data; 
      })
    );

    setSeries(seriesData);
  };

  const fetchData = async () => {
    const data = await showfollows(user);
    if (data === undefined) {
      console.log("aucune data");
    } else {
      setFollows(data); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  useEffect(() => {
    fetchSeriesForFollows();
  }, [follows])

  return (
    <div className='container'>
      <ul className="serieList">
        {series.map((serie, index) => (
          <li key={index}><Serie data={serie} /></li>
        ))}
      </ul>
    </div>
  );
}

export default Follow;
