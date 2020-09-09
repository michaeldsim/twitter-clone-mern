const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema( {
    post: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model('comments', commentSchema)

module.exports = Comment