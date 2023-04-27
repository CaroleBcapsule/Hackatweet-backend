var express = require('express');
var router = express.Router();


require('../models/connection');
const Tweet = require('../models/tweets');
const fetch = require('node-fetch');


//Post
router.post('/tweets', function (req, res){
    const newTweet = new Tweet({
        author: req.body.author
        content: req.body.content,
        date: req.body.content
        like: req.body.like
       });
  
    newTweet.save()
    .then(()=> {
      Tweet.find().then(data => {res.json({ allTweets: data });
  });
  });})
  
  //get
  router.get('/tweets', (req, res) => {
  
    Tweet.find()
    .then(data => {res.json({ allTweets: data});
  });
  });
  
//   router.get('/lastTrip', (req, res) => {
//     Trip.find()
//     .then(data => {res.json({ lastTrip: data[data.length -1]});
//   });
//   });
  
  router.delete('/tweets', (req, res) => {
    Tweet.deleteMany()
    .then(()=> {Trip.find().then(data =>{res.json({ allTweets: data })})
  //par token connecté son propre 
  });})
  
  module.exports = router;
  