const router = require('express').Router()
const bcrypt = require('bcrypt')
let User = require('../models/user.model')

router.route('/').post((req, res) => {
    const username = req.body.username
    const email = req.body.email
    bcrypt.hash(req.body.password, 10, (err, hashed) => {
        if(err) {
            res.status(400).json('Error: ' + err)
        } else {
            const password = hashed

            const newUser = new User({
                username,
                email,
                password
            })
        
            newUser.save()
            .then(() => res.json('New user has been registered!'))
            .catch(err => res.status(400).json('Error: ' + err))
        }
    })
})

module.exports = router