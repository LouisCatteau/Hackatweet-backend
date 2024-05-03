var express = require('express');
var router = express.Router();
require('../models/connection');

const Tweet = require('../models/tweets');
const User = require('../models/users');


router.post('/newTweet', (req, res) => {
    findOne({token:req.body.tweet.token})
    .then(data=>{
        const newTweet = new Tweet({
            message: req.body.tweet.message,
            date: req.body.tweet.date,
            nbLike: 0,
            user: data._id
        });
        newTweet.save().then(newTweet => {
            res.json({ result: true, newTweet });
        });
    })
});

router.post('/removeTweet', (req, res) => {
    Tweet.deleteOne({ _id: req.body.tweetId })
        .then(res.json({ result: true }))
})

router.get('/allTweets', (req, res) => {
    Tweet.find()
        .populate('user')
        .then(tweets => {

            res.json({ result: true, tweets });
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
