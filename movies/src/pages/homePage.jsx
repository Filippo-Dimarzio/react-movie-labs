import { useEffect, useMemo, useState } from 'react'
import FilterMoviesCard from '../components/filterMoviesCard'
import HeaderMovieList from '../components/headerMovieList'
import MovieList from '../components/movieList'
import {
  AppBar,
  Box,
  Button,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material'
import { createTmdbError, createTmdbRequest } from '../utils/tmdb'

function HomePage({ demoMovies, apiKey, onApiKeyChange }) {
  const [movies, setMovies] = useState(() =>
    apiKey ? [] : demoMovies,
  )
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [loadAttempt, setLoadAttempt] = useState(0)
  const [nameFilter, setNameFilter] = useState('')
  const [genreFilter, setGenreFilter] = useState('0')
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)

  useEffect(() => {
    if (!apiKey) return undefined

    const controller = new AbortController()

    const loadMovies = async () => {
      setLoading(true)
      setLoadError('')

      try {
        const request = createTmdbRequest('/discover/movie', apiKey)
        const url = new URL(request.url)
        url.searchParams.set('language', 'en-US')
        url.searchParams.set('include_adult', 'false')
        url.searchParams.set('page', '1')
        const response = await fetch(url, {
          ...request.options,
          signal: controller.signal,
        })

        if (!response.ok) {
          throw await createTmdbError(response, 'movie request')
        }

        const data = await response.json()
        if (!Array.isArray(data.results)) {
          throw new Error('TMDB returned an unexpected movie list')
        }

        setMovies(data.results)
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setMovies([])
          setLoadError(
            error instanceof Error
              ? error.message
              : 'An unexpected error occurred while loading movies',
          )
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadMovies()
    return () => controller.abort()
  }, [apiKey, demoMovies, loadAttempt])

  const genreId = Number(genreFilter)
  const visibleMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesTitle =
        movie.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1
      const matchesGenre =
        genreId === 0 ||
        (Array.isArray(movie.genre_ids) && movie.genre_ids.includes(genreId))
      const matchesFavorites = !showFavorites || favorites.includes(movie.id)
      return matchesTitle && matchesGenre && matchesFavorites
    })
  }, [favorites, genreId, movies, nameFilter, showFavorites])

  const handleFilterChange = (type, value) => {
    if (type === 'name') setNameFilter(value)
    if (type === 'genre') setGenreFilter(value)
    if (type === 'apiKey') {
      onApiKeyChange(value)
      setMovies([])
      setLoadError('')
      setLoading(true)
      setLoadAttempt((attempt) => attempt + 1)
    }
  }
  

  const addToFavorites = (movieId) => {
    const updatedMovies = movies.map((movie) =>
      movie.id === movieId ? { ...movie, favorite: true } : movie,
    )
    setMovies(updatedMovies)
    setFavorites((currentFavorites) =>
      currentFavorites.includes(movieId)
        ? currentFavorites
        : [...currentFavorites, movieId],
    )
  }

  return (
    <Box className="movie-app">
      <AppBar position="static" className="movie-app-bar" elevation={1}>
        <Toolbar className="movie-toolbar">
          <Typography variant="subtitle1" component="div" className="brand">
            TMDB Client
          </Typography>
          <Box className="nav-links">
            <Button color="inherit" onClick={() => setShowFavorites(false)}>
              Home
            </Button>
            <Button color="inherit">Upcoming</Button>
            <Button
              color="inherit"
              className={showFavorites ? 'active-nav' : ''}
              onClick={() => setShowFavorites(true)}
            >
              Favorites
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {loadError && (
        <Box className="load-message" role="alert">
          Could not load live movies: {loadError}. For a 401 response, make
          sure you entered a valid TMDB v3 API key or v4 API Read Access Token.
        </Box>
      )}

      <HeaderMovieList title={showFavorites ? 'Favorite Movies' : 'Discover Movies'} />

      <Grid container spacing={3} className="home-layout">
        <Grid size={{ xs: 12, sm: 4, md: 2 }}>
          <FilterMoviesCard
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            apiKey={apiKey}
            onUserInput={handleFilterChange}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 8, md: 10 }}>
          {loading ? (
            <Box className="empty-results">
              <Typography>Loading movies from TMDB...</Typography>
            </Box>
          ) : loadError ? (
            <Box className="empty-results" role="status">
              <Typography>Live movies could not be loaded.</Typography>
            </Box>
          ) : visibleMovies.length ? (
            <Grid container spacing={2.5}>
              <MovieList
                movies={visibleMovies}
                favorites={favorites}
                onAddToFavorites={addToFavorites}
              />
            </Grid>
          ) : (
            <Box className="empty-results">
              <Typography>No movies match these filters.</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default HomePage
