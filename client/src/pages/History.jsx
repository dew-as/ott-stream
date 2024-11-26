import React, { useEffect, useState } from 'react'
import MovieCard from '../components/Card';
import axiosConfig from '../axiosConfig';

const History = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const getWatchHistory = async () => {
      try {
        const response = await axiosConfig.get('/watchhistory')
        console.log(response.data);
        setMovies(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getWatchHistory()
  }, [])

  return (
    <div className='container mb-5'>
      <h2 className='text-center mt-3 mb-3'>Your Watch History</h2>
      {/* Display Movies */}
      <div className="d-flex flex-wrap justify-content-center">
        {movies.map((movie) => {
          // Avoid mutating the original data
          const movieWithWatchedAt = {
            ...movie.movie,
            watchedAt: movie.watchedAt,
          };
          return <MovieCard key={movie.id} movie={movieWithWatchedAt} />;
        })}
      </div>
    </div>
  )
}

export default History
