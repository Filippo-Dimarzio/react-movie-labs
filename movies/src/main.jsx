import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import './index.css'
import HomePage from './pages/homePage.jsx'
import MoviePage from './pages/movieDetailsPage.jsx'
import FavoriteMoviesPage from './pages/favoriteMoviesPage.jsx'
import MovieReviewPage from './pages/movieReviewPage.jsx'
import SiteHeader from './components/siteHeader'

const App = () => {
  return (
    <BrowserRouter>
      <SiteHeader />
      <Routes>
        <Route path="/reviews/:id" element={<MovieReviewPage />} />
        <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
