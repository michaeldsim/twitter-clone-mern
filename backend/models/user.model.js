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

userSchema.post('deleteOne', (next) => {
    this.model('posts').deleteMany({ user: this._id }, next).exec()
    this.model('comments').deleteMany({ user: this._id }, next).exec()
})


module.exports = User