var express = require('express');
var router = express.Router();
var Post = require('../models/blog.js')

router.get('/', function(req, res){
  res.render('blog/main.ejs');
});

router.get('/post', function(req, res){
  res.render('blog/post.ejs');
});

router.post('/', function(req, res){
  //Blog.create() // push in req.body 
  res.send(req.body); //see if email capture form worked
});


module.exports = router;
