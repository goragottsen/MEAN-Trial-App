const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require("./routes/posts");



const app = express();

mongoose.connect("mongodb+srv://ana:Rfrltkf2794lub@cluster0-9cbiu.mongodb.net/node-angular?retryWrites=true", { useNewUrlParser: true })
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
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, HEAD, PUT, PATCH, DELETE, OPTIONS"); // which http verbs may be used to send requests (options is sent implicitly, has to be stated)
  next();
});

app.use("/api/posts",postsRoutes); // filter to only urls starting with /api/posts

module.exports = app;
