//require express so we can access Router() from express
var express = require('express');
var router = express.Router(); //() parentheses is an invokation

//Models
var Blog = require('../models/blog.js')
var Categories = require('../models/categories.js')

//Routes

    //Index
    router.get('/', function(req, res){
      Blog.find({}, function(err, blog) {
      res.render('blog/main.ejs', {blog: blog});
      });
    });

    //New
    router.get('/new', function(req, res){
      res.render('blog/new.ejs');
    });


    //Create
    router.post('/', function(req, res){ // going to receive data from blgo entry
      Blog.create(req.body, function(err, createdBlog){
        console.log(req.body);
        res.redirect('/blog');
      }); // create method takes 2 arguments 1.data to be pushed in 2. callback function
      // res.send(req.body); //see if email capture form worked
    });


    //show
    router.get('/:id', function(req, res){
      Blog.findById(req.params.id, function(err, createdBlog){ //computer finds id in req.params
        res.render('blog/post.ejs', {blog: createdBlog}) // render post page, make createdBlog available
      });
    });


   //edit
   router.get('/:id/edit', function(req, res){
     Blog.findById(req.params.id, function(err, createdBlog){
       res.render('blog/edit.ejs', { blog: createdBlog});
        //  res.redirect('/'); you can only have a single res
     });
   });

   //update
   router.put('/:id', function(req, res){
     Blog.findByIdAndUpdate(req.params.id, req.body, function(){
       res.redirect('/blog');
     });
   });

   //delete
   router.delete('/:id', function(req, res){
   console.log(req.params.id);
   console.log('we have accessed the delete route');
    Blog.findByIdAndRemove(req.params.id, function(err, blog){ // upper case B has to match top of this document, the Model
     res.redirect('/blog');
   });
 });

//EXPORT
module.exports = router;
