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
    liked_by: {
        users: [{
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
        }]
    },
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

const Post = mongoose.model('post', postSchema)

module.exports = Post