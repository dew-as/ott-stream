const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    watchHistory: [{ movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }, watchedAt: { type: Date, default: Date.now() } }],
    watchList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
})

const User = mongoose.model('User', userSchema);
module.exports = User;