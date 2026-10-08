import { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useLocation, useParams } from 'react-router'
import posterPlaceholder from '../images/film-poster-placeholder.png'
import MovieDetails from '../components/movieDetails'
import { createTmdbError, createTmdbRequest } from '../utils/tmdb'
import MovieHeader from '../components/headerMovie/'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'


export function MoviePage(props) {
    const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => {
        return res.json();
      })
      .then((movie) => {
        console.log(movie)
        setMovie(movie);
      });
  }, [id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => json.posters)
      .then((images) => {
        console.log(images)
        setImages(images);
      });
      eslint-disable-next-line
  }, []);


  return (
    <>
      {movie ? (
        <>
          <MovieHeader movie={movie} />
          <Grid container spacing={5} style={{ padding: '15px' }}>
            <Grid size={{ xs: 3 }}>
              <div
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                }}
              >
                <ImageList
                  sx={{
                    height: '100vh',
                  }}
                  cols={1}
                >
                  {images.map((image) => (
                    <ImageListItem key={image} cols={1}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${image}`}
                        alt={image}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            </Grid>
            <Grid size={{ xs: 9 }}>
              <MovieDetails movie={movie} />
            </Grid>
          </Grid>
        </>
      ) : (
        <h2>Waiting for API data</h2>
      )}
    </>
  )
}

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'

function MovieDetailsPage({ apiKey }) {
  const { id } = useParams()
  const { state } = useLocation()
  const previewMovie = state?.movie ?? null
  const [movie, setMovie] = useState(previewMovie)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(Boolean(apiKey))
  const [error, setError] = useState(() =>
    apiKey
      ? ''
      : previewMovie
        ? 'Enter a TMDB credential on the home page to load full movie details.'
        : 'Enter a TMDB credential on the home page before opening movie details.',
  )

  useEffect(() => {
    const controller = new AbortController()

    if (!apiKey) return undefined

    const loadDetails = async () => {
      setLoading(true)
      setError('')
      setMovie(previewMovie)
      setImages([])

      try {
        const movieRequest = createTmdbRequest(`/movie/${id}`, apiKey)
        const movieResponse = await fetch(movieRequest.url, {
          ...movieRequest.options,
          signal: controller.signal,
        })

        if (!movieResponse.ok) {
          throw await createTmdbError(movieResponse, 'movie details request')
        }

        const movieData = await movieResponse.json()
        setMovie(movieData)

        const imagesRequest = createTmdbRequest(`/movie/${id}/images`, apiKey)
        const imagesResponse = await fetch(imagesRequest.url, {
          ...imagesRequest.options,
          signal: controller.signal,
        })
        if (!imagesResponse.ok) {
          throw await createTmdbError(imagesResponse, 'movie images request')
        }

        const imageData = await imagesResponse.json()
        setImages(
          [...(imageData.backdrops ?? []), ...(imageData.posters ?? [])].slice(
            0,
            8,
          ),
        )
      } catch (loadError) {
        if (
          !(loadError instanceof DOMException && loadError.name === 'AbortError')
        ) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : 'An unexpected error occurred while loading movie details.',
          )
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadDetails()
    return () => controller.abort()
  }, [apiKey, id, previewMovie])

  return (
    <Box className="movie-app movie-details-page">
      <Box className="movie-details-toolbar">
        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          Back to movies
        </Button>
      </Box>

      {loading && (
        <Box className="movie-details-message" role="status">
          <CircularProgress size={24} />
          <Typography>Loading movie details...</Typography>
        </Box>
      )}

      {error && (
        <Alert className="movie-details-error" severity={apiKey ? 'error' : 'info'}>
          {error}
        </Alert>
      )}

      {movie && (
        <>
          <Paper className="movie-details-heading" elevation={1}>
            <Typography component="h1" variant="h4">
              {movie.title}
            </Typography>
            {movie.tagline && (
              <Typography component="p" variant="subtitle1">
                {movie.tagline}
              </Typography>
            )}
          </Paper>

          <Grid container spacing={3} className="movie-details-content">
            <Grid size={{ xs: 12, sm: 4, md: 3 }}>
              <Box
                component="img"
                className="movie-details-poster"
                src={
                  movie.poster_path
                    ? `${imageBaseUrl}${movie.poster_path}`
                    : posterPlaceholder
                }
                alt={`${movie.title} poster`}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 8, md: 9 }}>
              <MovieDetails movie={movie} />
            </Grid>
          </Grid>

          {images.length > 0 && (
            <Box className="movie-details-gallery">
              <Typography component="h2" variant="h5">
                Images
              </Typography>
              <Grid container spacing={2}>
                {images.map((image, index) => (
                  <Grid key={`${image.file_path}-${index}`} size={{ xs: 6, sm: 4, md: 3 }}>
                    <Box
                      component="img"
                      className="movie-details-image"
                      src={`${imageBaseUrl}${image.file_path}`}
                      alt={`${movie.title} still ${index + 1}`}
                      loading="lazy"
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default MovieDetailsPage
