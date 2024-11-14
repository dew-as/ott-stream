import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Header';
import Landing from './pages/Landing';
import Register from './pages/Register';
import MovieList from './pages/MovieList';
import Movie from './pages/Movie';
import ChangePassword from './pages/ChangePassword';
import WatchList from './pages/WatchList';
import Login from './pages/Login';
import History from './pages/History';
import './App.css'

// Create a wrapper component where useLocation will be used
function Main() {
  const location = useLocation();

  // Define routes where the navbar should be hidden
  const hideNavbarRoutes = ['/login', '/register', '/'];

  return (
    <div className="App">
      {/* Conditionally render Navbar */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/history" element={<History />} />
        <Route path="/changepass" element={<ChangePassword />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;
