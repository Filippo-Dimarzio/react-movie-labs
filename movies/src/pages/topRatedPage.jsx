import PageTemplate from "../components/templateMovieListPage";
import { getTopRatedMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

const TopRatedPage = () => {
  const { data: movies, error, isPending, isError } = useQuery({
    queryKey: ["topRated"],
    queryFn: getTopRatedMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => <AddToPlaylistIcon movie={movie} />}
    />
  );
};

export default TopRatedPage;