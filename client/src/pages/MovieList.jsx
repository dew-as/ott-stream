import React, { useState } from 'react';
import { Input } from 'antd';  // Import Input from Ant Design
import MovieCard from '../components/Card';

const movies = [
  { title: 'Movie 1', id: 1, description: 'Description for Movie 1', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 10 },
  { title: 'Movie 2', id: 2, description: 'Description for Movie 2', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 20 },
  { title: 'Movie 3', id: 3, description: 'Description for Movie 3', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 15 },
  { title: 'Movie 4', id: 4, description: 'Description for Movie 4', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 8 },
  { title: 'Movie 5', id: 5, description: 'Description for Movie 5', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 12 },
  { title: 'Movie 6', id: 6, description: 'Description for Movie 6', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 10 },
  { title: 'Movie 7', id: 7, description: 'Description for Movie 7', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 20 },
  { title: 'Movie 8', id: 8, description: 'Description for Movie 8', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 15 },
];

const MovieList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter movies based on search term
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
