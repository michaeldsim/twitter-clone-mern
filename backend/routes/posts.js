const router = require('express').Router()
let Post = require('../models/post.model')

router.route('/').get((req, res) => {
    Post.find()
    .then(posts => res.json(posts)
    .catch(err => res.status(400).json(err)))
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
    const username = req.body.username
    const content = req.body.content

    const newPost = new Post({
        user: username,
        text: content
    })
    newPost.save()
            .then(() => res.json('New post has been created!'))
            .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router