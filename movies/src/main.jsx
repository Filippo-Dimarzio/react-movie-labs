import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainApp from './App.jsx'
import MovieDetailsPage from './pages/movieDetailsPage'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainApp />
  </StrictMode>,
)

const App = () => {
  return (
      <MovieDetailsPage movie={sample} images={images} />
      );
};


const images = [
  "/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
  "/v1QQKq8M0fWxMgSdGOX1aCv8qMB.jpg",
  "/2iGN0aKHJYD0xQydlfuCUAcgNbO.jpg",
  "/rjBwhsOzHKUw2NIOrE7aMqjfe6s.jpg",
]
