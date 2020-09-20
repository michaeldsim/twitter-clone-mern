const router = require('express').Router()
let User = require('../models/user.model')

router.route('/').get((req, res) => {
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

module.exports = router