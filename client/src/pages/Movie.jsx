import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axiosConfig from '../axiosConfig';
import { toggleWatchList } from '../utils/apiCalls';

const MoviePage = () => {
  const [watchListed, setWatchlisted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [movie, setMovie] = useState({});
  const videoRef = useRef(null);
  const location = useLocation();
  const { id } = useParams();

  // Parse the query string
  const queryParams = new URLSearchParams(location.search);

  const toggleWatchlist = () => {
    setWatchlisted((prevState) => !prevState);
    toggleWatchList(movie._id)
  };

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await axiosConfig.get(`/singlemovie/${id}`);
        setMovie(response.data);
        const watchHistory = await axiosConfig.post(`/watchhistory`, { movieId: id })
        console.log(watchHistory);
      } catch (error) {
        console.error(error);
      }
    };
    getMovie();
  }, [id]);

  useEffect(() => {
    if (movie.video && videoRef.current) {
      // Update the video source and reload the video
      videoRef.current.src = movie.video;
      videoRef.current.load();
    }
  }, [movie.video]);

  useEffect(() => {
    const handleDOMContentLoaded = () => {
      const request = queryParams.get('play');
      if (request) {
        handlePlayPauseVideo(true);
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    } else {
      handleDOMContentLoaded();
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
    };
  }, [queryParams]);

  const handlePlayPauseVideo = (forcePlay = false) => {
    const video = videoRef.current;
    if (!video) return;

    if (forcePlay || video.paused) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          enterFullscreen();
        })
        .catch((error) => {
          console.error('Error playing video:', error);
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const enterFullscreen = () => {
    const video = videoRef.current;
    if (video && video.requestFullscreen) {
      video.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable full-screen mode:', err);
      });
    }
  };

  return (
    <div className="container">
      <div className="container d-flex justify-content-center row">
        <div className="row">
          <div className="col-md-5">
            <h1>{movie.title}</h1>
            <p>
              {movie.viewCount} <i>views</i> <i className="bi bi-eye-fill"></i>
            </p>
          </div>
        </div>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-3">
            <img
              src={movie.thumbnail}
              alt="Movie Thumbnail"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-7 position-relative">
            <div className="movie-preview ratio ratio-16x9">
              <video
                ref={videoRef}
                className="rounded shadow w-100 h-100"
                controls
              >
                <source type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-3 d-grid">
            <button
              className="btn btn-danger mt-2"
              onClick={() => handlePlayPauseVideo()}
            >
              <i
                className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-btn-fill'
                  }`}
              ></i>{' '}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button className="btn btn-danger mt-2" onClick={toggleWatchlist}>
              {watchListed ? (
                <i className="bi bi-suit-heart-fill"> Remove</i>
              ) : (
                <i className="bi bi-suit-heart"> Add</i>
              )}
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
