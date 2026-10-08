import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router'
import { demoMovies } from './App.jsx'
import './index.css'
import HomePage from './pages/homePage.jsx'
import { MoviePage } from './pages/movieDetailsPage.jsx'
import FavoriteMoviesPage from './pages/favoriteMoviesPage.jsx'

const App = () => {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_TMDB_KEY || '')

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        {' | '}
        <Link to="/movies/favorites">Favorites</Link>
      </nav>
      <Routes>
        <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route
          path="/"
          element={
            <HomePage
              demoMovies={demoMovies}
              apiKey={apiKey}
              onApiKeyChange={setApiKey}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
