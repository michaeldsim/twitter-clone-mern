const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false}))

app.use(cors())
app.use(express.json())


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const registerRouter = require('./routes/register')
const commentsRouter = require('./routes/comments');

app.use('/comments', commentsRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
