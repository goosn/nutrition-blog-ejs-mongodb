var mongoose = require('mongoose');
var Post = require('./blog.js');

// Make a SCHEMA
var Schema = mongoose.Schema;

var categorySchema = mongoose.Schema({
  category: String,
  posts: [Post.schema]
});

//Make a MODEL using that SCHEMA
var category = mongoose.model('Category', categorySchema);


//Export the model
module.exports = category;
