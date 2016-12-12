mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = mongoose.Schema({
  title: { type: String, required: true},
  body: String,
  img: {type: String, default:''}
});

var Post = mongoose.model('Blog', postSchema);

//add 7 RESTFul routes

module.exports = Post;
