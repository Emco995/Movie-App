import React from "react";
// import Box from "./MainComponents/Box";
// import MovieList from './MainComponents/MovieList'

const Main = ({children}) => {
  return (
    <main className="main">
      {children}
      {/* <Box element={<MovieList movies={movies}></MovieList>}></Box> */}
    </main>
  );
};

export default Main;
