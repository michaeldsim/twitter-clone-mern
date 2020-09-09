const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema( {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'posts'
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('users', userSchema)

module.exports = User