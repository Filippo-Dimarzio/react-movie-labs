import { Chip, Grid, Stack, Typography } from '@mui/material'

function MovieDetails({ movie }) {
  const revenue = movie.revenue
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(movie.revenue)
    : 'Unknown'

  const facts = [
    ['Released', movie.release_date || 'Unknown'],
    ['Runtime', movie.runtime ? `${movie.runtime} min` : 'Unknown'],
    [
      'Rating',
      `${Number(movie.vote_average || 0).toFixed(1)} / 10 (${movie.vote_count ?? 0} votes)`,
    ],
    ['Revenue', revenue],
  ]

  return (
    <>
      <Typography component="h2" variant="h5">
        Overview
      </Typography>
      <Typography className="movie-details-overview">
        {movie.overview || 'No overview is available for this movie.'}
      </Typography>

      {movie.genres?.length > 0 && (
        <Stack className="movie-details-genres" direction="row" gap={1}>
          {movie.genres.map((genre) => (
            <Chip key={genre.id} label={genre.name} />
          ))}
        </Stack>
      )}

      <Grid container spacing={2} className="movie-details-facts">
        {facts.map(([label, value]) => (
          <Grid key={label} size={{ xs: 6, md: 3 }}>
            <strong>{label}</strong>
            <span>{value}</span>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default MovieDetails
