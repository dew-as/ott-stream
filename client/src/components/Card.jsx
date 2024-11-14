import React, { useState } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [watchListed, setWatchlisted] = useState(false);

  const toggleWatchlist = () => {
    setWatchlisted(prevState => !prevState); // Toggle the watchlisted state
  };

  const formattedDate = movie?.watchedAt
    ? new Date(movie.watchedAt).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    : null;

  return (
    <Card
      style={{
        maxWidth: 250,
        margin: '15px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
      cover={
        <img
          alt="movie-thumbnail"
          src={movie?.thumbnailUrl}
          style={{ borderRadius: '10px 10px 0 0' }}
        />
      }
    >
      {/* Movie Title and Heart Icon */}
      <div className="d-flex justify-content-between align-items-center">
        <h6
          className="m-0 cursor-pointer"
          onClick={() => navigate('/movie/' + movie.id)}
          style={{ fontSize: '16px', fontWeight: 'bold' }}
        >
          {movie?.title}
        </h6>
        <div onClick={toggleWatchlist}>
          {watchListed ? (
            <HeartFilled className="h3 text-danger" />
          ) : (
            <HeartOutlined className="h3 text-danger" />
          )}
        </div>
      </div>

      <hr />

      {/* Description or Watched Date */}
      <p style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
        {formattedDate ? formattedDate : movie?.description ? movie?.description : <Link to={'/movie/' + movie.id + '?play=true'} className='btn btn-outline-danger'>Watch</Link>}
      </p>
    </Card>
  );
};

export default MovieCard;
