var mongoose = require('mongoose');


// Make a SCHEMA
var Schema = mongoose.Schema;

var postSchema = mongoose.Schema({
  title: { type: String, required: true},
  body: String,
  img: {type: String, default:''}
  // category: String
  // categories: [categorySchema]
});

//Make a MODEL using that SCHEMA
var Post = mongoose.model('Post', postSchema);


//Export the model
module.exports = Post;
