const router = require('express').Router()
let Post = require('../models/post.model')
let User = require('../models/user.model')

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
            .then(() => {
                res.json('New post has been created!')
                User.findById(username, (err, doc) => {
                    if (err) res.status(400).json('Error: ' + err)
                    doc.posts.push(newPost)
                    doc.save()
    })
        })
            .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/remove').delete((req, res) => {
    const id = req.body.id

    Post.findById(id, (err, doc) => {
        if(err) res.status(400).json("Error: " + err)
        doc.deleteOne()
        doc.save()
        .then(() => res.json('Post has been deleted'))
        .catch(err => res.status(400).json("Error: " + err))
    })
})

module.exports = router