import React, { useEffect, useState } from 'react';
import { Input } from 'antd';  // Import Input from Ant Design
import MovieCard from '../components/Card';
import axiosConfig from '../axiosConfig';

const MovieList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([])

  // Filter movies based on search term
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axiosConfig.get('/movielist')
        setMovies(response.data)
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    getMovies()
  }, [])

  return (
    <div className='container mb-5'>
      {/* Search Input from Ant Design */}
      <Input
        type="text"
        className="mb-3 mt-3"  // Add margin-bottom to space out the input from the movie cards
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '300px', marginLeft: '0' }} // Align to the left and give it a specific width
      />

      {/* Display Movies */}
      <div className="d-flex flex-wrap justify-content-center">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
