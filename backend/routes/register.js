const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
let User = require('../models/user.model')

router.route('/register').post((req, res) => {
    const username = req.body.username
    bcrypt.hash(req.body.password, 10, (err, hashed) => {
        if(err) {
            res.status(400).json('Error: ' + err)
        } else {
            const password = hashed

            const newUser = new User({
                username,
                password
            })
        
            newUser.save()
            .then(() => res.json('New user has been registered!'))
            .catch(err => res.status(400).json('Error: ' + err))
        }
    })
})

router.route('/login').post((req, res) => {

    const user = User.findOne({username: req.body.username})
    // check if user exists
    if(!user) return res.status(400).json("Username or password is wrong")

    const validPassword = bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).json("Incorrect password")

    // create token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: '1h'})
    res.header('auth-token', token).send(token)
})

module.exports = router