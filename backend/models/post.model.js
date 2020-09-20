const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId, 
        ref: 'comments'
    }]
    ,
    date: {
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model('posts', postSchema)

postSchema.post('deleteMany', (next) => {
    this.model('comments').deleteMany({post: this._id}, next)
})

postSchema.post('deleteOne', (next) => {
    this.model('comments').deleteMany({post: this._id}, next)
})

module.exports = Post