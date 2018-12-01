const mongoose = require('mongoose');

// Create a blueprint = definition
const postSchema = mongoose.Schema({
  title: {type: String, required: true },
  content: {type: String, required: true },
  imagePath: {type: String, required: true }
});

// Turn the blueprint into a model
module.exports = mongoose.model('Post', postSchema);
