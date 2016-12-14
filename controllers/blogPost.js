//require express so we can access Router() from express
var express = require('express');
var router = express.Router(); //() parentheses is an invokation

//Models
var Blog = require('../models/blog.js')
var Categories = require('../models/categories.js')

//Routes
    router.get('/', function(req, res){
      Blog.find({}, function(err, blog) {
      res.render('blog/main.ejs', {blog: blog});
      });
    });

    //New
    router.get('/new', function(req, res){
      res.render('blog/new.ejs');
    });


    // Create: POST '/blogs'
    router.post('/', function(req, res){ // going to receive data from blgo entry
      Blog.create(req.body, function(err, createdBlog){
        console.log(req.body);
        res.redirect('/blog');
      }); // create method takes 2 arguments 1.data to be pushed in 2. callback function
      // res.send(req.body); //see if email capture form worked
    });

    // Create: POST '/categoreis'
    // router.post('/', function(req, res){ // going to receive data from blgo entry
    //   Category.create(req.body, function(err, createdBlog){
    //     console.log(req.body);
    //     res.redirect('/blog');
    //   }); // create method takes 2 arguments 1.data to be pushed in 2. callback function
    //   // res.send(req.body); //see if email capture form worked
    // });

    //show
    router.get('/:id', function(req, res){
      Blog.findById(req.params.id, function(err, createdBlog){ //computer finds id in req.params
        res.render('blog/post.ejs', {blog: createdBlog}) // render post page, make createdBlog available
      });
    });

    //delete
    router.delete('/:id', function(req, res){
    console.log(req.params.id);
     Blog.findByIdAndRemove(req.params.id, function(err, blog){ // upper case B has to match top of this document, the Model      
      res.redirect('/blog');
    });
  });



//EXPORT
module.exports = router;
