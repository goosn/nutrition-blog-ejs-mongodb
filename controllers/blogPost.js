var express = require('express');
var router = express.Router();
var Blog = require('../models/blog.js')

router.get('/', function(req, res){
  res.render('blog/main.ejs');
});

//New
router.get('/new', function(req, res){
  res.render('blog/new.ejs');
});

router.get('/post', function(req, res){
  res.render('blog/post.ejs');
});


router.post('/', function(req, res){ // going to receive data from blgo entry
  Blog.create(req.body, function(err, createdBlog){
    res.redirect('/blogs');
  }); // create method takes 2 arguments 1.data to be pushed in 2. callback function
  // res.send(req.body); //see if email capture form worked
});


module.exports = router;
