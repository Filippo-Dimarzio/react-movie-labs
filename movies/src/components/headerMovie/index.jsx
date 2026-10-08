import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, useParams } from "react-router";

const MovieHeader = ({ movie, movies }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const movieIndex = movies.findIndex((item) => String(item.id) === id);

  const goToMovie = (index) => {
    const nextMovie = movies[index];
    navigate(`/movies/${nextMovie.id}`, {
      state: { movie: nextMovie, movies },
    });
  };

  return (
    <Paper 
        component="div" 
        sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            padding: 1.5,
            margin: 0,
        }}
      >
      <IconButton
        aria-label="Previous movie"
        disabled={movieIndex <= 0}
        onClick={() => goToMovie(movieIndex - 1)}
      >
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3">
        {movie.title}
        <a href={movie.homepage}>
          <HomeIcon color="primary" />
        </a>
        <br />
        <span sx={{ fontSize: "1.5rem" }}>{`   "${movie.tagline}"`} </span>
      </Typography>
      <IconButton
        aria-label="Next movie"
        disabled={movieIndex < 0 || movieIndex >= movies.length - 1}
        onClick={() => goToMovie(movieIndex + 1)}
      >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;
