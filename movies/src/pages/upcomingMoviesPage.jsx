import { useEffect, useState } from 'react'
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from '../api/tmdb-api'

function UpcomingMoviesPage() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getUpcomingMovies().then((upcomingMovies) => {
      setMovies(upcomingMovies)
    })
  }, [])

  const addToFavorites = (movieId) => {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId ? { ...movie, favorite: true } : movie,
      ),
    )
  }

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      selectFavorite={addToFavorites}
    />
  )
}

export default UpcomingMoviesPage
