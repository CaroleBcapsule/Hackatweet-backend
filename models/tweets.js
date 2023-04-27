const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    content: String,
    date: Date,
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],

});


const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;