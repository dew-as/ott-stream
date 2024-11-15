const User = require('../models/User');
const Movie = require('../models/Movie');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register user
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to register user' });
    }
};

// Login user/admin
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('authToken', token, { httpOnly: true });
        res.status(200).json({ message: 'Login successful', isAdmin: user.isAdmin, token: token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

// Get movie list
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};

// Get single movie
exports.getSingleMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id);
        if (!movie) return res.status(404).json({ error: 'Movie not found' });
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movie details' });
    }
};

// Add/Remove to watchlist
exports.toggleWatchlist = async (req, res) => {
    const { movieId } = req.params;

    try {
        const user = await User.findById(req.user.id);

        // Check if the movie is already in the watchlist
        if (user.watchList.includes(movieId)) {
            // Remove the movie if it exists
            user.watchList = user.watchList.filter((id) => id.toString() !== movieId);
            await user.save();
            return res.status(200).json({ message: 'Movie removed from watchlist' });
        } else {
            // Add the movie if it doesn't exist
            user.watchList.push(movieId);
            await user.save();
            return res.status(200).json({ message: 'Movie added to watchlist' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to toggle watchlist' });
    }
};


// Get watchlist
exports.getWatchlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('watchList');
        res.status(200).json(user.watchList);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch watchlist' });
    }
};


// Add to watch history
exports.addToWatchHistory = async (req, res) => {
    const { movieId } = req.body;
    try {
        const user = await User.findById(req.user.id);
        user.watchHistory.push({ movie: movieId });
        await user.save();
        res.status(200).json({ message: 'Movie added to watch history' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add to watch history' });
    }
};

// Get watch history
exports.getWatchHistory = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('watchHistory.movie');
        res.status(200).json(user.watchHistory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch watch history' });
    }
};

// Change password
exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user.id);
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid current password' });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to change password' });
    }
};

// Logout
exports.logoutUser = (req, res) => {
    res.clearCookie('authToken');
    res.status(200).json({ message: 'Logged out successfully' });
};


exports.addMovie = async (req, res) => {
    const { title, description, thumbnail, video } = req.body;
    try {
        const newMovie = new Movie({ title, description, thumbnail, video });
        await newMovie.save();
        res.status(201).json({ message: 'Movie added successfully', movie: newMovie });
    } catch (error) {
        console.log(error);
        
        res.status(400).json({ error: 'Failed to add movie' });
    }
};

exports.editMovie = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedMovie) return res.status(404).json({ error: 'Movie not found' });
        res.status(200).json({ message: 'Movie updated successfully', movie: updatedMovie });
    } catch (error) {
        res.status(400).json({ error: 'Failed to update movie' });
    }
};


exports.deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) return res.status(404).json({ error: 'Movie not found' });
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete movie' });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};


exports.getUserHistory = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).populate('watchHistory.movie');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user.watchHistory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user history' });
    }
};


exports.getMovieReport = async (req, res) => {
    try {
        const report = await Movie.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: 'watchHistory.movie',
                    as: 'views',
                },
            },
            {
                $project: {
                    title: 1,
                    genre: 1,
                    viewCount: { $size: '$views' },
                },
            },
            { $sort: { viewCount: -1 } }, // Sort by view count descending
        ]);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate report' });
    }
};

