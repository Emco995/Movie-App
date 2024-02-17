import React, { useState, useEffect } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Logo from "./components/NavbarComponents/Logo";
import NumResults from "./components/NavbarComponents/NumResults";
import Search from "./components/NavbarComponents/Search";
import Box from "./components/MainComponents/Box";
import MovieList from "./components/MainComponents/MovieList";
import WatchedSummary from "./components/MainComponents/WatchedSummary";
import WatchedMovieList from "./components/MainComponents/WatchedMovieList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorComponents/ErrorMessage";
import MovieDetails from "./components/MainComponents/MovieDetails";

const KEY = "6f431f8e";

export default function App() {
  const [query, setQuery] = useState("Inception");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          console.log(data.Search);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function(){
        controller.abort();
      }
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Logo></Logo>
        <Search query={query} setQuery={setQuery}></Search>
        <NumResults movies={movies}></NumResults>
      </Navbar>
      <Main>
        {/* <Box>
          {isLoading ? (
            <Loader></Loader>
          ) : (
            <MovieList movies={movies}></MovieList>
          )}
        </Box> */}

        <Box>
          {isLoading && <Loader></Loader>}
          {!isLoading && !error && (
            <MovieList
              onMovieSelect={handleSelectMovie}
              movies={movies}
            ></MovieList>
          )}
          {error && <ErrorMessage message={error}></ErrorMessage>}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              onAddWatched={handleAddWatched}
              onCloseMovie={handleCloseMovie}
              selectedId={selectedId}
              watched={watched}
            ></MovieDetails>
          ) : (
            <>
              <WatchedSummary watched={watched}></WatchedSummary>
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              ></WatchedMovieList>
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
