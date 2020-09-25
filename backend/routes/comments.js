const router = require('express').Router()
const Comment = require('../models/comment.model')
const Post = require('../models/post.model')
const verify = require('./verify')

router.route('/comments/list').get(async (req, res) => {
    await Comment.find()
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json(err))
})

router.route('/comments').post(verify, (req, res) => {
    const post = req.body.post
    const user = req.user
    const content = req.body.content

    const newComment = new Comment({
        post: post,
        user: user._id,
        content: content
    })

    newComment.save()
    .then(async () => {
        await Post.findById(post, (err, doc) => {
            if (err) res.status(400).json(err)
            doc.comments.push(newComment)
            doc.save()
        })
        res.json('New comment has been created for post: ' + post)
})
    .catch(err => res.status(400).json(err))
})

router.route('/comments').delete(verify, async (req, res) => {
    const id = req.body.id
    const user = req.user

    Comment.deleteOne({_id: id, user: user._id})
    .then(() => {
        res.json('Comment deleted successfully')
    })
    .catch((err) => res.status(400).json("Error: " + err))
})

module.exports = router