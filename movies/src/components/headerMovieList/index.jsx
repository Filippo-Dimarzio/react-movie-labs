import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { IconButton, Paper, Typography } from '@mui/material'

function HeaderMovieList({ title }) {
  return (
    <Paper component="div" className="page-heading">
      <IconButton aria-label="Previous movies" size="small">
        <ArrowBackIcon color="primary" fontSize="small" />
      </IconButton>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <IconButton aria-label="Next movies" size="small">
        <ArrowForwardIcon color="primary" fontSize="small" />
      </IconButton>
    </Paper>
  )
}

export default HeaderMovieList
