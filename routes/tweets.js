var express = require('express');
var router = express.Router();
require('../models/connection');

const Tweet = require('../models/tweets');

router.post('/newTweet', (req, res) => {

    const newTweet = new Tweet({
        message: req.body.message,
        date: req.body.date,
        nbLike: 0,
        user: req.body.userID
    });
    newTweet.save().then(newTweet => {
        res.json({ result: true, newTweet });
    });
});

router.post('/removeTweet', (req, res) => {
    Tweet.deleteOne({ _id: req.body.tweetId })
            .then(res.json({ result: true }))
        })

router.get('/allTweets', (req, res) => {
    Tweet.find()
        .then(data => {
            res.json({ result: true, data });
        })
})

router.post('/addLike', (req, res) => {
    Tweet.findById(req.body.tweetId)
        .then(data => {
            numberOfLikes = data.nbLike
            Tweet.updateOne(
                { _id: req.body.tweetId },
                { nbLike: (numberOfLikes + 1) }
            )
            .then(res.json({ result: true }))
        })
});

module.exports = router;
