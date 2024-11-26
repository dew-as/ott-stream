import React, { useState } from 'react';
import { HeartOutlined, HeartFilled, PlayCircleOutlined } from '@ant-design/icons';
import { Card, Tooltip, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { toggleWatchList } from '../utils/apiCalls';

const { Meta } = Card;

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [watchListed, setWatchlisted] = useState(false);

  const toggleWatchlist = () => {
    setWatchlisted((prevState) => !prevState);
    toggleWatchList(movie._id)
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
      hoverable
      style={{
        width: 250,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        margin: '5px'
      }}
      cover={
        <div
          style={{
            position: 'relative',
            height: '350px',
            overflow: 'hidden',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <img
            alt="movie-thumbnail"
            src={movie?.thumbnail}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              cursor: 'pointer',
            }}
            onClick={() => navigate(`/movie/${movie._id}`)}
          />
          <Tooltip title="Play Now">
            <PlayCircleOutlined
              style={{
                position: 'absolute',
                bottom: '15px',
                right: '15px',
                fontSize: '2rem',
                color: '#fff',
                cursor: 'pointer',
                textShadow: '0 2px 5px rgba(0, 0, 0, 0.7)',
              }}
              onClick={() => navigate(`/movie/${movie._id}?play=true`)}
            />
          </Tooltip>
        </div>
      }
    >
      <Meta
        title={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/movie/${movie._id}`)}
            >
              {movie?.title}
            </span>
            <Tooltip title={watchListed ? 'Remove from Watchlist' : 'Add to Watchlist'}>
              <span onClick={toggleWatchlist}>
                {watchListed ? (
                  <HeartFilled style={{ color: '#e63946', fontSize: '1.3rem' }} />
                ) : (
                  <HeartOutlined style={{ color: '#e63946', fontSize: '1.3rem' }} />
                )}
              </span>
            </Tooltip>
          </div>
        }
        description={
          <div style={{ marginTop: '10px' }}>
            {formattedDate ? (
              <span style={{ fontSize: '0.9rem', color: '#777' }}>
                Watched on: {formattedDate}
              </span>
            ) : movie?.description ? (
              <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '10px' }}>
                {movie?.description.slice(0, 50)}...
              </p>
            ) : null}
          </div>
        }
      />
    </Card>
  );
};

export default MovieCard;
