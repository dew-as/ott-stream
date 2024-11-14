import React from 'react'
import MovieCard from '../components/Card';

const WatchList = () => {
  const movies = [
    { title: 'Movie 1', id: 1, thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 10 },
    { title: 'Movie 2', id: 2, thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 20 },
    { title: 'Movie 3', id: 3, thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 15 },
    { title: 'Movie 4', id: 4, thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 8 },
    { title: 'Movie 5', id: 5, thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 12 }
  ];

  return (
    <div className='container mb-5'>
      <h2 className='text-center'>Your Watch List</h2>
      {/* Display Movies */}
      <div className="d-flex flex-wrap justify-content-center">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default WatchList
