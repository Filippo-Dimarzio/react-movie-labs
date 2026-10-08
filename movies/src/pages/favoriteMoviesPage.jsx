import React from "react";
import PageTemplate from "../components/templateMovieListPage";

const FavoriteMoviesPage = (props) => {
  const toDo = () => true;
  // Get movies from local storage.
  const movies = JSON.parse(localStorage.getItem("favorites")); 

  return (
    <PageTemplate
      title='Discover Movies'
      movies={movies}
      selectFavorite={addToFavorites}
    />
  );
};

export default FavoriteMoviesPage;
