const router = require('express').Router()
let User = require('../models/user.model')

router.route('/').get((req, res) => {
  User.find()
    .then(users => {
      users.forEach(item => {
        res.json({
          username: item.username,
          date: item.date
        })
    })
  })
    .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router