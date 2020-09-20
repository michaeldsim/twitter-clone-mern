const router = require('express').Router()
let Comment = require('../models/comment.model')
let Post = require('../models/post.model')

router.route('/list').get((req, res) => {
    Comment.find()
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json(err))
})

router.route('/').post((req, res) => {
    const post = req.body.post
    const user = req.body.user
    const content = req.body.content

    const newComment = new Comment({
        post: post,
        user: user,
        content: content
    })

    newComment.save()
    .then(() => {
        Post.findById(post, (err, doc) => {
            if (err) res.status(400).json(err)
            doc.comments.push(newComment)
            doc.save()
        })
        res.json('New comment has been created for post: ' + post)
})
    .catch(err => res.status(400).json(err))
})

router.route('/remove').delete()

module.exports = router