//require express so we can access Router() from express
var express = require('express');
var router = express.Router(); //() parentheses is an invokation

//Models
var categories = require('../models/categories.js')

//Routes
    router.get('/', function(req, res){
      categories.find({}, function(err, blog) { // categories needs to match line 6
      res.render('categories/index.ejs', {Options: blog});
      });
    });

    //show
    router.get('/:id', function(req, res){
      Blog.findById(req.params.id, function(err, createdBlog){ //computer finds id in req.params
        res.render('blog/post.ejs', {blog: createdBlog}) // render post page, make createdBlog available
      });
    });

//EXPORT
module.exports = router;
