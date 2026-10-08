import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/homePage.jsx'
import MovieDetailsPage from './pages/movieDetailsPage.jsx'

export const demoMovies = [
  {
    id: 1,
    title: 'Wonder Woman 1984',
    release_date: '2020-12-16',
    vote_average: 7.2,
    genre_ids: [28, 14],
    poster_path: '/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
  },
  {
    id: 2,
    title: 'Soul',
    release_date: '2020-12-25',
    vote_average: 8.4,
    genre_ids: [16, 35],
    poster_path: '/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg',
  },
  {
    id: 3,
    title: 'Cosmoball',
    release_date: '2020-08-27',
    vote_average: 4.9,
    genre_ids: [12, 878],
    poster_path: '/b6qUu00iIIkXX13szFy7d0CyNcg.jpg',
  },
  {
    id: 4,
    title: 'Vanguard',
    release_date: '2020-09-30',
    vote_average: 7.4,
    genre_ids: [28, 12],
    poster_path: '/vYvppZMvXYheYTWVd8fW5d0eO6x.jpg',
  },
  {
    id: 5,
    title: 'The Doorman',
    release_date: '2020-10-01',
    vote_average: 6.1,
    genre_ids: [28, 53],
    poster_path: '/6tb0xB8m7QXU5J3VhRWmGktJqXQ.jpg',
  },
  {
    id: 6,
    title: 'Miraculous World: New York, United HeroeZ',
    release_date: '2020-10-10',
    vote_average: 8.5,
    genre_ids: [16, 10751],
    poster_path: '/kIHgjAkuzvKBnmdstpBOo4AfZah.jpg',
  },
  {
    id: 7,
    title: 'The Midnight Sky',
    release_date: '2020-12-09',
    vote_average: 5.8,
    genre_ids: [18, 878],
    poster_path: '/51f4ZyZx7h5sm7QOe2DqK9f6v0U.jpg',
  },
  {
    id: 8,
    title: 'Monsters of Man',
    release_date: '2020-11-19',
    vote_average: 6.5,
    genre_ids: [28, 878],
    poster_path: '/1f3qspv64L5FXrRy0MF8X92ieuw.jpg',
  },
  {
    id: 9,
    title: 'The Croods: A New Age',
    release_date: '2020-11-25',
    vote_average: 7.5,
    genre_ids: [16, 12],
    poster_path: '/tbVZ3Sq88dZaCANlUcewQuHQOaE.jpg',
  },
  {
    id: 10,
    title: 'Honest Thief',
    release_date: '2020-09-03',
    vote_average: 6.5,
    genre_ids: [28, 53],
    poster_path: '/zeD4PabP6099gpE0STWJrJrCBCs.jpg',
  },
  {
    id: 11,
    title: 'We Can Be Heroes',
    release_date: '2020-12-25',
    vote_average: 6.2,
    genre_ids: [28, 14],
    poster_path: '/1S21HpcKY6uQ9UAw68aICSzkwuU.jpg',
  },
  {
    id: 12,
    title: 'Tenet',
    release_date: '2020-08-22',
    vote_average: 7.2,
    genre_ids: [28, 878],
    poster_path: '/k68nPLbIST6NP96JmTxmZijEvCA.jpg',
  },
]

function App() {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_TMDB_KEY || '')

  return (
    <BrowserRouter>
      <Routes>
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
        <Route
          path="/movies/:id"
          element={<MovieDetailsPage apiKey={apiKey} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
