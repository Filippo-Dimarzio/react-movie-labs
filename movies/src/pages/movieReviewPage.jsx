import { useLocation } from 'react-router'
import MovieReview from '../components/movieReview'
import PageTemplate from '../components/templateMoviePage'

function MovieReviewPage() {
  const { state } = useLocation()
  const { movie, review } = state ?? {}

  if (!movie || !review) {
    return <p>Open a review from a movie's Reviews panel to view its details.</p>
  }

  return (
    <PageTemplate movie={movie}>
      <MovieReview review={review} />
    </PageTemplate>
  )
}

export default MovieReviewPage
