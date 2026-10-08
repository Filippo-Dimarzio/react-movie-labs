import { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import filterArtwork from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import { createTmdbError, createTmdbRequest } from '../../utils/tmdb'

const allGenres = [{ id: '0', name: 'All' }]
const fallbackGenres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 14, name: 'Fantasy' },
  { id: 10751, name: 'Family' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
]

function FilterMoviesCard({ titleFilter, genreFilter, apiKey, onUserInput }) {
  const [apiKeyInput, setApiKeyInput] = useState(apiKey)
  const [genres, setGenres] = useState([
    ...allGenres,
    ...fallbackGenres.map((genre) => ({ ...genre, id: String(genre.id) })),
  ])
  const [genreError, setGenreError] = useState('')

  useEffect(() => {
    if (!apiKey) return undefined

    const controller = new AbortController()
    const loadGenres = async () => {
      setGenreError('')

      try {
        const request = createTmdbRequest('/genre/movie/list', apiKey)
        const response = await fetch(request.url, {
          ...request.options,
          signal: controller.signal,
        })

        if (!response.ok) {
          throw await createTmdbError(response, 'genre request')
        }

        const data = await response.json()
        if (!Array.isArray(data.genres)) {
          throw new Error('TMDB returned an unexpected genre list')
        }

        setGenres([...allGenres, ...data.genres])
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setGenreError(
            error instanceof Error ? error.message : 'An unexpected error occurred',
          )
        }
      }
    }

    loadGenres()
    return () => controller.abort()
  }, [apiKey])

  const handleChange = (event, type, value) => {
    event.preventDefault()
    onUserInput(type, value)
  }

  return (
    <Card component="aside" className="filter-panel" variant="outlined">
      <CardContent className="filter-content">
        <div className="filter-heading">
          <SearchIcon fontSize="small" />
          <Typography variant="subtitle2">Filter the movies.</Typography>
        </div>
        <TextField
          size="small"
          fullWidth
          type="search"
          placeholder="Search field"
          value={titleFilter}
          onChange={(event) => handleChange(event, 'name', event.target.value)}
          slotProps={{ htmlInput: { 'aria-label': 'Search movies by title' } }}
        />
        <FormControl size="small" fullWidth className="genre-control">
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            label="Genre"
            value={genreFilter}
            onChange={(event) => handleChange(event, 'genre', event.target.value)}
            inputProps={{ 'aria-label': 'Filter by genre' }}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={String(genre.id)}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <form
          className="api-key-form"
          onSubmit={(event) => {
            if (!apiKeyInput.trim()) {
              event.preventDefault()
              return
            }
            handleChange(event, 'apiKey', apiKeyInput.trim())
          }}
        >
          <TextField
            size="small"
            fullWidth
            type="password"
            label="TMDB API key or v4 token"
            value={apiKeyInput}
            autoComplete="off"
            onChange={(event) => setApiKeyInput(event.target.value)}
            slotProps={{
              htmlInput: {
                'aria-label': 'TMDB API key or v4 token',
                autoComplete: 'new-password',
              },
            }}
          />
          <Button type="submit" size="small" variant="contained" fullWidth>
            Load live movies
          </Button>
        </form>
        {genreError && (
          <Typography className="filter-error" role="status">
            Genres unavailable ({genreError}); the sample genre list is shown.
          </Typography>
        )}
      </CardContent>
      <CardMedia
        component="img"
        className="filter-art"
        image={filterArtwork}
        title="Misty mountain landscape"
        alt=""
      />
      <CardContent className="filter-footer">
        <SearchIcon fontSize="small" />
        <Typography variant="subtitle2">Filter the movies.</Typography>
      </CardContent>
    </Card>
  )
}

export default FilterMoviesCard
