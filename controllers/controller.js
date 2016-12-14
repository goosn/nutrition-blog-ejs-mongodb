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

    //show for categories
    router.get('/categories', function(req, res){
      res.render('categories/index.ejs')
    });

    //show
    router.get('/:id', function(req, res){
      Blog.findById(req.params.id, function(err, createdBlog){ //computer finds id in req.params
        res.render('blog/post.ejs', {blog: createdBlog}) // 1)render post page, make createdBlog available 2)res.render points to the views folder by default
      });
    });



//EXPORT
module.exports = router;
