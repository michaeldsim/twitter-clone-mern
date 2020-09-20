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
    liked_by: [{
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
        }]
    ,
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

postSchema.pre('save', (next) => {
    this.model('users').findOne({_id: this.user}).populate('posts').exec((err, doc) => {
        if (err) return err.json()
    }, next())
})

postSchema.pre('deleteMany', (next) => {
    this.model('comments').deleteMany({post: this._id}, next)
})

module.exports = Post