var mongoose = require('mongoose');
var postSchema = require('../models/blog.js').schema;

// Make a SCHEMA
var Schema = mongoose.Schema;

var categorySchema = mongoose.Schema({
  category: {type: String, default:''},
  posts: [postSchema]
});

//Make a MODEL using that SCHEMA
var Category = mongoose.model('Category', categorySchema);


//Export the model
module.exports = Category;
