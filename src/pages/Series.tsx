import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Serie from "../components/Serie";
import Pagination from "../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function SeriesPage() {
  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  const navigate = useNavigate();

  const [onePage, setOnePage] = useState<Boolean>(false);
  const [genres, setGenres] = useState<any[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [sort, setSort] = useState<string>("popularity.desc");

  const { page, genre, query } = useParams<{
    page: string;
    genre: string;
    query: string;
  }>();

  async function fetchSeries() {
    const res = await fetch(
      `${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&language=fr-FR&page=${currentPage}&sort_by=${sort}&with_genres=${genre}`
    );
    const data = await res.json();
    if (data.total_pages > 500) {
      setTotalPages(500);
    } else {
      setTotalPages(data.total_pages);
    }
    setSeries(data.results);
  }

  async function searchSeries() {
    const unfilteredResults: Object[] = [];
    const res = await fetch(
      `${BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&language=fr-FR&page=${currentPage}&query=${query}`
    );
    const data = await res.json();
    let total_pages = data.total_pages;
    if (total_pages > 500) {
      total_pages = 500;
      setTotalPages(500);
    } else {
      setTotalPages(data.total_pages);
    }
    if (!genre) {
      setSeries(data.results);
      setOnePage(false);
    } else {
      for (let i = 1; i <= total_pages; i++) {
        const res = await fetch(
          `${BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&language=fr-FR&page=${i}&query=${query}`
        );
        const data = await res.json();
        unfilteredResults.push(...data.results);
      }
      const filteredResults = unfilteredResults.filter((serie: any) =>
        serie.genre_ids.includes(parseInt(genre))
      );
      if (sort) {
        filteredResults.sort((a: any, b: any) => {
          if (a[sort.split(".")[0]] < b[sort.split(".")[0]]) {
            return 1;
          } else if (a[sort.split(".")[0]] > b[sort.split(".")[0]]) {
            return -1;
          } else {
            return 0;
          }
        });
      }
      setSeries(filteredResults);
      setOnePage(true);
    }
  }

  async function getGenres() {
    const res = await fetch(
      `${BASE_URL}/genre/tv/list?api_key=${TMDB_API_KEY}&language=fr-FR&`
    );
    const data = await res.json();
    return data.genres;
  }

  function gotoGenre(genreId: string) {
    if (genreId) {
      if (!query) {
        navigate("/series/" + genreId + "/1");
      } else {
        navigate("/series/search/" + genreId + "/" + query + "/1");
      }
    } else {
      if (!query) {
        navigate("/series/1");
      } else {
        navigate("/series/search/" + query + "/1");
      }
    }
  }

  useEffect(() => {
    try {
      getGenres().then((genres) => {
        setGenres(genres);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      setCurrentPage(parseInt(page ? page : "1"));
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    try {
      if (query) {
        searchSeries();
      } else {
        fetchSeries();
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, genre, sort, query]);

  return (
    <div className="container">
      <h1>Series</h1>
      <div className="seriesOptions">
        {query && <span className="infoList">Resultat pour : {query}</span>}
        <select
          className="genreSelect"
          onChange={(e) => gotoGenre(e.target.value)}
        >
          <option value="">Tous les genres</option>
          {genres.map((g, index) => (
            <option selected={g.id == genre} key={index} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        {(!query || onePage === true) && (
          <div className="sortSelect">
            <label>Trier par : </label>
            <select onChange={(e) => setSort(e.target.value)}>
              <option value="popularity.desc">Popularité</option>
              <option value="vote_average.desc">Note</option>
              <option value="first_air_date.desc">Date de sortie</option>
            </select>
          </div>
        )}
      </div>
      <ul className="serieList">
        {series?.map((serie, index) => (
          <li key={index}>
            <Serie data={serie} />
          </li>
        ))}
      </ul>

      {!series || totalPages < currentPage ? (
        <>
          <div>Aucun résultat</div>
          <button onClick={() => navigate(-1)}>
            <FontAwesomeIcon className="App-link" icon={faBackspace} /> Retour
          </button>
        </>
      ) : (
        ""
      )}
      {series && totalPages >= currentPage && onePage === false && (
        <Pagination page={page} maxPage={totalPages} />
      )}
    </div>
  );
}

export default SeriesPage;
