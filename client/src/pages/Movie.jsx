import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MoviePage = () => {
  const [watchListed, setWatchlisted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Track if the video is playing
  const videoRef = useRef(null);
  const location = useLocation();

  // Use URLSearchParams to parse the query string
  const queryParams = new URLSearchParams(location.search);

  const toggleWatchlist = () => {
    setWatchlisted(prevState => !prevState); // Toggle the watchlisted state
  };

  // This useEffect will only run once after the DOM is fully loaded
  useEffect(() => {
    // Ensure the DOM is fully loaded before executing the effect
    const handleDOMContentLoaded = () => {
      const request = queryParams.get('play');
      if (request) {
        handlePlayPauseVideo(true); // Auto-play if query param exists
      }
    };

    // Ensure that the effect runs after the DOM is fully loaded
    if (document.readyState === "loading") {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    } else {
      handleDOMContentLoaded();
    }

    // Cleanup event listener if added
    return () => {
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
    };
  }, [queryParams]); // Re-run the effect if queryParams changes

  const handlePlayPauseVideo = (forcePlay = false) => {
    const video = videoRef.current;
    if (!video) return;

    if (forcePlay || video.paused) {
      video.play().then(() => {
        setIsPlaying(true); // Update state to reflect the video is playing
        enterFullscreen();
      }).catch(error => {
        console.error('Error playing video:', error);
      });
    } else {
      video.pause();
      setIsPlaying(false); // Update state to reflect the video is paused
    }
  };

  // Function to toggle fullscreen
  const enterFullscreen = () => {
    const video = videoRef.current;
    if (video && video.requestFullscreen) {
      video.requestFullscreen().catch(err => {
        console.error('Error attempting to enable full-screen mode:', err);
      });
    }
  };

  const movie = {
    title: 'The Lost City of Z',
    id: 1,
    description: 'A true-life drama, centering on British explorer Major Percival Fawcett, who disappeared whilst searching for the fabled city in the Amazon in the 1920s.',
    thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_.jpg',
    videoUrl: 'https://imdb-video.media-imdb.com/vi2198189593/1434659607842-pgv4ql-1486136885072.mp4?Expires=1731245729&Signature=qb6O3s4G8tFzRWWIO0YcFr7f8Gg9J3Z3RQCqdq1rjBn1CNx3OdfgasXsRr-6~~DFWOk-odMAGLX-tl4ZaAzigq3brbNEhdbDBZ7ZuMXjcCWHF-ygs1KhAIfogwFOSUic7wP1dLyJjn-MgkHeGURM1aH5V18fv8wKche1glxlt1PiauqmKXkzMFqDFosEr7sjN21GI9qh36OSV9OvKLY3qgVgRbAwbVBy0TQ6lL6NuuVwb8RHV-DhumHlf7iBEfk5QC4MbqhQyLmFOnWvxMHkNm2~iWg1IkcmFWZJ7XNqPh0cqpRhNKWEu3DuBAV-EyPn4LAcgOgvZv1N2UQMDqBRDA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA',
    viewCount: 10
  };

  return (
    <div className="container">
      {/* Thumbnail */}
      <div className="container d-flex justify-content-center row">
        <div className='row'>
          <div className="col-md-5">
            <h1>{movie.title}</h1>
            <p>{movie.viewCount} <i>views</i> <i className="bi bi-eye-fill"></i></p>
          </div>
        </div>
        <div className='row d-flex justify-content-center align-items-center'>
          <div className="col-md-3">
            <img
              src={movie.thumbnailUrl}
              alt="Movie Thumbnail"
              className="img-fluid rounded shadow"
            />
          </div>
          {/* Movie Preview with Play Button */}
          <div className="col-md-7 position-relative">
            <div className="movie-preview">
              <video ref={videoRef} className="img-fluid rounded shadow" width="100%" height="auto" controls>
                <source src={movie.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
        {/* Description */}
        <div className='row d-flex justify-content-center'>
          <div className="col-3 d-grid">
            <button className="btn btn-danger mt-2" onClick={() => handlePlayPauseVideo()}>
              <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-btn-fill'}`}></i> {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button className="btn btn-danger mt-2" onClick={toggleWatchlist}>
              {watchListed ? <i className="bi bi-suit-heart-fill"> Remove</i> : <i className="bi bi-suit-heart"> Add</i>}
            </button>
          </div>
          <div className="col-7 d-flex align-items-center">
            <div className="d-flex col-12">
              <p>{movie.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
