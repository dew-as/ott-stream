import React, { useEffect, useState } from 'react'
import MovieCard from '../components/Card';
import { getWatchList } from '../utils/apiCalls';
import axiosConfig from '../axiosConfig';

const WatchList = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const getWatchList = async () => {
      try {
        const response = await axiosConfig.get('/watchlist');

        const formattedMovies = response.data.map((movie) => ({
          _id: movie._id,
          title: movie.title,
          thumbnail: movie.thumbnail,
        }));

        setMovies(formattedMovies);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    getWatchList();
  }, []);

  return (
    <div className='container mb-5'>
      <h2 className='text-center mt-3'>Your Watch List</h2>
      {/* Display Movies */}
      <div className="d-flex flex-wrap justify-content-center mt-3">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default WatchList
