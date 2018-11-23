const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*"); // no matter which domain used, it's allowed to access the resources
  res.setHeader('Access-Control-Allow-Headers',
  "Origin, X-Requested-With, Content-Type, Accept"); // meaning incoming requests MAY have these headers
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS"); // which http verbs may be used to send requests (options is sent implicitly, has to be stated)
  next();
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    { id: 'dsjhdjsgj328472847',
      title: 'First server-side post',
      content: 'This is coming from the server'
    },
    { id: 'djfhkegr7465i3g',
      title: 'Second server-side post',
      content: 'This is coming from the server!'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});

module.exports = app;
