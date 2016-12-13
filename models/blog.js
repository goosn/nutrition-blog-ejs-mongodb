var mongoose = require('mongoose');


// Make a SCHEMA
var Schema = mongoose.Schema;

var postSchema = mongoose.Schema({
  title: { type: String, required: true},
  body: String,
  img: {type: String, default:''}
});

//Make a MODEL using that SCHEMA 
var Post = mongoose.model('Blog', postSchema);

//add 7 RESTFul routes


//Export the model
module.exports = Post;
