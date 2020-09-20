const router = require('express').Router()
let User = require('../models/user.model')
let Post = require('../models/post.model')
let Comment = require('../models/comment.model')

router.route('/list').get((req, res) => {
  User.find()
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

router.route('/').delete((req, res) => {
  const id = req.body.id

  User.deleteOne({_id: id})
  .then(() => {
    Post.deleteMany({user: id}).exec()
    Comment.deleteMany({user: id}).exec()
    res.json("User has been deleted successfully.")
  })
  .catch((err) => {
    res.status(400).json("Error: " + err)
  })
})

module.exports = router