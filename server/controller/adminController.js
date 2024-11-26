const User = require('../models/User');
const Movie = require('../models/Movie');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Check if the user is blocked
        if (!user.isAdmin) {
            return res.status(403).json({ error: 'Your are not an admin ,Please contact support.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('authToken', token, { httpOnly: true });
        res.status(200).json({ message: 'Login successful', isAdmin: user.isAdmin, token: token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
}

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
    console.log(id);
    const updates = req.body;
    console.log(updates);

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
        console.log(error);

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
        const movies = await Movie.find()
            .sort({ viewCount: -1 }) // Sort in descending order of view count
            .select("title viewCount "); // Select required fields

        res.status(200).json(movies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.toggleBlockUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the user by ID
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Toggle the `isBlocked` status
        user.isBlocked = !user.isBlocked;
        await user.save();

        const status = user.isBlocked ? 'blocked' : 'unblocked';
        res.status(200).json({ message: `User has been ${status} successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to toggle user block status' });
    }
};