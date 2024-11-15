const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, },
    viewCount: { type: Number, default: 0, required: true },
    thumbnail: { type: String, required: true },
    video: { type: String, required: true },
})

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;