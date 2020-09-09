const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users.map((item) => item.username)))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;