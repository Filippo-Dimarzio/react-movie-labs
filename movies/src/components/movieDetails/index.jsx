import { Chip, Fab, Grid, Stack, Typography } from '@mui/material'
import NavigationIcon from '@mui/icons-material/Navigation'
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"

const MovieDetails = ({ movie }) => {
const [drawerOpen, setDrawerOpen] = useState(false);
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
      'Production countries',
      movie.production_countries?.map((country) => country.name).join(', ') ||
        'Unknown',
    ],
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
     <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>

    
  )
}

export default MovieDetails
