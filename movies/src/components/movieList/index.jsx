import Grid from '@mui/material/Grid'
import MovieCard from '../movieCard'

function MovieList({ movies, favorites, onToggleFavorite }) {
  return movies.map((movie) => (
    <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 2, xl: 2 }}>
      <MovieCard
        movie={movie}
        isFavorite={favorites.includes(movie.id)}
        onToggleFavorite={onToggleFavorite}
      />
    </Grid>
  ))
}

export default MovieList
