import React from 'react'
import MovieCard from '../components/Card';

const History = () => {
  const movies = [
    { title: 'Movie 1', id: 1, description: 'Description for Movie 1', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 10, watchedAt: '2024-11-05 13:15' },
    { title: 'Movie 2', id: 2, description: 'Description for Movie 2', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 20, watchedAt: '2024-10-30 21:05' },
    { title: 'Movie 3', id: 3, description: 'Description for Movie 3', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 15, watchedAt: '2024-10-25 09:45' },
    { title: 'Movie 4', id: 4, description: 'Description for Movie 4', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 8, watchedAt: '2024-11-01 16:30' },
    { title: 'Movie 5', id: 5, description: 'Description for Movie 5', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 12, watchedAt: '2024-10-28 11:20' },
    { title: 'Movie 6', id: 6, description: 'Description for Movie 6', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 10, watchedAt: '2024-10-31 14:05' },
    { title: 'Movie 7', id: 7, description: 'Description for Movie 7', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 20, watchedAt: '2024-11-02 18:55' },
    { title: 'Movie 8', id: 8, description: 'Description for Movie 8', thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 15, watchedAt: '2024-11-06 07:10' },
  ];

  return (
    <div className='container mb-5'>
      <h2 className='text-center'>Your Watch History</h2>
      {/* Display Movies */}
      <div className="d-flex flex-wrap justify-content-center">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default History
