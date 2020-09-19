const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    liked_by: [{
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
        }]
    ,
    comments: [{
        type: Schema.Types.ObjectId,
        text: String,
        ref: 'comments',
        default: null
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

// when a post is created also populate user array with the post made
// postSchema.pre('create', (next) => {
//     this.model('users').update({
//         $push: {
//             {
//                 _id:
//                 posts: ""
//             }
//         }
//     })
//     next()
// })


// when a post is deleted update user array of posts to also remove said array
postSchema.pre('deleteMany', (next) => {
    this.model('users').update({
    })
})

const Post = mongoose.model('post', postSchema)

module.exports = Post