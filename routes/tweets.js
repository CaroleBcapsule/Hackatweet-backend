var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");
var moment = require("moment");
const { ISO_8601 } = require("moment");

require("../models/connection");
const Tweet = require("../models/tweets");
const User = require("../models/users");

//Post si l'utiliateur est connecté
router.post("/newTweet/:token", function (req, res) {
  User.findOne({ token: req.params.token }).then((data) => {
    if (data) {
      const newTweet = new Tweet({
        author: [data.username],
        content: req.body.content,
        date: new Date(),
        like: [],
      });
      newTweet.save().then((newTweet) => {
        res.json({ result: true, newTweet: newTweet });
      });
    } else {
      res.json({ result: false, error: "Can't tweet" });
    }
  });
});

//Get si l'utilisateur est connecté = get de tous les tweets de tous les utilisateurs
router.get("/:token", (req, res) => {
  User.findOne({ token: req.params.token })
  .populate('author')
  .then((data) => {
    if (data) {
      Tweet.find().then((data) => {
        res.json({ result: true, allTweets: data });
      });
    } else {
      {
        res.json({ result: false, error: "User not connected" });
      }
    }
  });
});

// Delete du tweet de l'utlisateur connecté
router.delete("/deleteTweet/:token/:_id", (req, res) => {
  User.findOne({ token: req.params.token }).then((data) => {
    if (data) {
      Tweet.deleteOne({ _id: req.params._id }).then((deletedTweet) => {
        res.json({ result: true, deletedTweet: deletedTweet });
      });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});

module.exports = router;
