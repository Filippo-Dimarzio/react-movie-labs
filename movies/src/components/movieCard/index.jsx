import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router'
import posterPlaceholder from '../../images/film-poster-placeholder.png'

const posterBaseUrl = 'https://image.tmdb.org/t/p/w500'

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const poster = movie.poster_path
    ? `${posterBaseUrl}${movie.poster_path}`
    : posterPlaceholder

  return (
    <Card className="movie-card" elevation={1}>
      <CardContent className="movie-card-title">
        <Typography variant="body2" title={movie.title}>
          {movie.title}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        className="movie-poster"
        image={poster}
        alt={`${movie.title} poster`}
        onError={(event) => {
          event.currentTarget.src = posterPlaceholder
        }}
      />
      <CardContent className="movie-card-meta">
        <CalendarTodayOutlinedIcon fontSize="inherit" />
        <span>{movie.release_date}</span>
        <span className="rating">★ {Number(movie.vote_average || 0).toFixed(1)}</span>
      </CardContent>
      <CardActions className="movie-card-actions">
        <IconButton
          size="small"
          aria-label={
            isFavorite
              ? `Remove ${movie.title} from favorites`
              : `Add ${movie.title} to favorites`
          }
          onClick={() => onToggleFavorite(movie.id)}
        >
          {isFavorite ? (
            <FavoriteIcon className="favorite-icon" />
          ) : (
            <FavoriteBorderIcon className="favorite-icon" />
          )}
        </IconButton>
        <Button
          component={RouterLink}
          to={`/movies/${movie.id}`}
          state={{ movie }}
          size="small"
          variant="outlined"
        >
          More Info...
        </Button>
      </CardActions>
    </Card>
  )
}

export default MovieCard
