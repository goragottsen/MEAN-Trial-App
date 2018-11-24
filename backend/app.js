const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post'); // Capital by convention

const app = express();

mongoose.connect("mongodb+srv://ana:Rfrltkf2794lub@cluster0-9cbiu.mongodb.net/node-angular?retryWrites=true")
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*"); // no matter which domain used, it's allowed to access the resources
  res.setHeader('Access-Control-Allow-Headers',
  "Origin, X-Requested-With, Content-Type, Accept"); // meaning incoming requests MAY have these headers
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS"); // which http verbs may be used to send requests (options is sent implicitly, has to be stated)
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({  // status: everything is ok, a new resource was created
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

// Fetching posts from db
app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: documents
      });
    });
});


// Delete route
app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
  })
  res.status(200).json({ message: 'Post deleted!'});
});

module.exports = app;
