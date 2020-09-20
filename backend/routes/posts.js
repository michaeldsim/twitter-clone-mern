const router = require('express').Router()
let Post = require('../models/post.model')
let User  = require('../models/user.model')

router.route('/').get((req, res) => {
    Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json("Error: " + err))
})

router.route('/:username').get((req, res) => {
    const username = req.params.username

    Post.find()
    .then(posts => {
        res.json(posts.forEach(i => {
            if(i.user === username) return i
        }))
    })
    .catch(err => res.status(400).json(err))
})

router.route('/submit').post((req, res) => {
    const user = req.body.user
    const content = req.body.content

    const newPost = new Post({
        user: user,
        content: content
    })
    
    newPost.save()
    .then(() => {
        res.json("Post has been created successfully.")
        User.findOne({_id: user}, (doc) => {
         doc.posts.push(this._id)
         doc.save()
        })
    })
    .catch((err) => {
        if (err) res.status(200).json("Error: " + err)
    })

})

module.exports = router