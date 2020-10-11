const router = require('express').Router()
const Post = require('../models/post.model')
const User  = require('../models/user.model')
const verify = require('./verify')

router.route('/posts').get(async (req, res) => {
    await Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json(err))
})

router.route('/posts').post(verify, (req, res) => {
    const user = req.user
    const content = req.body.content

    const newPost = new Post({
        user: user._id,
        content: content
    })
    
    newPost.save()
    .then(() => {
        res.json("Post has been created successfully.")
        User.findById(user, (err, doc) => {
        if (err) res.status(400).json(err)
         doc.posts.push(newPost)
         doc.save()
        })
    })
    .catch((err) => {
        if (err) res.status(200).json(err)
    })
})

router.route('/posts').delete(verify, async (req, res) => {
    const user = req.user

    await Post.deleteOne({_id: user._id})
    .then(() => {
        res.status(200).json("Post removed successfully.")
    })
    .catch((err) => {
        if (err) res.status(200).json(err)
    })
})


module.exports = router