const router = require('express').Router()
const User = require('../models/user.model')
const Post = require('../models/post.model')
const jwt = require('jsonwebtoken')
const Comment = require('../models/comment.model')
const verify = require('./verify')

router.route('/users/list').get(async (req, res) => {
  await User.find()
    .then(users => {
      let response = []

      users.forEach(item => {
        response.push({
          username: item.username,
          date: item.date
        })
    })
    res.json(response)
  })
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/users').delete(verify, (req, res) => {
  const user = req.user

  User.deleteOne({_id: user._id})
  .then(() => {
    Post.deleteMany({user: user._id}).exec()
    Comment.deleteMany({user: user._id}).exec()
    res.json("User has been deleted successfully.")
  })
  .catch((err) => {
    res.status(400).json("Error: " + err)
  })
})

module.exports = router