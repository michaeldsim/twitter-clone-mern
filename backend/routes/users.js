const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const Post = require('../models/post.model')
const Comment = require('../models/comment.model')
const auth = require('../middleware/auth')

router.route('/register').post(async (req, res) => {
  const {username, password} = req.body

  if(!username || !password) return res.status(400).json({msg: 'Invalid credentials'})

  await bcrypt.hash(password, 10, (err, hashed) => {
      if(err) {
          res.status(400).json(err)
      } else {
          const password = hashed

          const newUser = new User({
              username,
              password
          })
      
          newUser.save()
          .then(() => res.json('New user has been registered!'))
          .catch(err => res.status(400).json(err))
      }
  })
})

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
    .catch(err => res.status(400).json(err))
});

router.route('/users').delete(auth, (req, res) => {
  const user = req.user

  User.deleteOne({_id: user._id})
  .then(() => {
    Post.deleteMany({user: user._id}).exec()
    Comment.deleteMany({user: user._id}).exec()
    res.json("User has been deleted successfully.")
  })
  .catch((err) => {
    res.status(400).json(err)
  })
})

module.exports = router