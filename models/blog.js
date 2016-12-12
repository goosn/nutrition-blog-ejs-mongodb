mongoose = require('mongoose');
var postSchema = mongoose.Schema({
  title: String,
  body: String,
});

var Post = mongoose.model('Blog', postSchema);

module.exports = Post;
