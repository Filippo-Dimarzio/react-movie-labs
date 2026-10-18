import PageTemplate from "../components/templateMovieListPage";
import { getPopularMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

const PopularPage = () => {
  const { data: movies, error, isPending, isError } = useQuery({
    queryKey: ["popular"],
    queryFn: getPopularMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <PageTemplate
      title="Popular Movies"
      movies={movies}
      action={(movie) => <AddToPlaylistIcon movie={movie} />}
    />
  );
};

export default PopularPage;