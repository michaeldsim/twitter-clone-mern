const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
let User = require('../models/user.model')

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

router.route('/login').post(async (req, res) => {

    const user = await User.findOne({username: req.body.username})
    // check if user exists
    if(!user) return res.status(400).json("Username or password is wrong")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).json("Username or password is wrong")

    // create token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: '1h'})
    res.header('auth-token', token).send(token)
})

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
      .select('-password')
      .then(user => res.json(user))
  })

module.exports = router