import Grid from '@mui/material/Grid'
import MovieCard from '../movieCard'

function MovieList({
  movies,
  favorites = [],
  onAddToFavorites,
  selectFavorite,
}) {
  return movies.map((movie) => (
    <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 2, xl: 2 }}>
      <MovieCard
        movie={movie}
        isFavorite={movie.favorite || favorites.includes(movie.id)}
        onAddToFavorites={onAddToFavorites ?? selectFavorite}
      />
    </Grid>
  ))
}

export default MovieList
