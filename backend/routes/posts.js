const router = require('express').Router()
let Post = require('../models/post.model')
let User  = require('../models/user.model')

router.route('/').get((req, res) => {
    Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json("Error: " + err))
})

router.route('/').post((req, res) => {
    const user = req.body.user
    const content = req.body.content

    const newPost = new Post({
        user: user,
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
        if (err) res.status(200).json("Error: " + err)
    })
})

router.route('/').delete((req, res) => {
    const id = req.body.id

    Post.deleteOne({_id: id})
    .then(() => {
        res.status(200).json("Post removed successfully.")
    })
    .catch((err) => {
        if (err) res.status(200).json("Error: " + err)
    })
})


module.exports = router