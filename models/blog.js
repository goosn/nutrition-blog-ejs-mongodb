mongoose = require('mongoose');
var postSchema = mongoose.Schema({
  title: String,
  body: String,
  img: {type: String, default:''}
});

var Post = mongoose.model('Blog', postSchema);

//add 7 RESTFul routes

module.exports = Post;
