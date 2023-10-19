import React, { useEffect, useState } from 'react';
import { showfollows } from '../functions/showFollows';

function Follow() {
  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3';

  const user = localStorage.getItem('userId');

  const [follows, setFollows] = useState<any>([]); // Initialise avec un tableau vide
  const [series, setSeries] = useState<any[]>([]);

  useEffect(() => {
    // Utilisez une fonction asynchrone pour récupérer les données de follows
    const fetchData = async () => {
      const data = await showfollows(user);
      setFollows(data); // Met à jour l'état lorsque la promesse est résolue
    };

    fetchData(); // Appel de la fonction fetchData
  }, []); // Utilisez user comme dépendance pour réexécuter le useEffect si user change

  useEffect(() => {
    if (follows.length > 0) {
      // Vous pouvez maintenant utiliser les données de follows pour effectuer votre requête API
      const fetchSeries = async () => {
        const res = await fetch(`${BASE_URL}/tv/84958/images?api_key=${TMDB_API_KEY}`);
        const data = await res.json();
        console.log("data : " + JSON.stringify(data.back))
        setSeries(data.results);
      };

      fetchSeries();
    }
  }, []); // Utilisez follows comme dépendance pour réexécuter le useEffect si follows change

  return (
    <div className='container'>
      <ul>
        <li></li>
      </ul>
    </div>
  );
}

export default Follow;
