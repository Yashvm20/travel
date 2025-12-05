const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  category: String,
  author: String,
  date: String,
  image: String
});

module.exports = mongoose.model('Post', PostSchema);