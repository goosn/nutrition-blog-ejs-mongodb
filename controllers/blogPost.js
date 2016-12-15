//require express so we can access Router() from express
var express = require('express');
var router = express.Router(); //() parentheses is an invokation

//Models
var Post = require('../models/blog.js')
var Category = require('../models/categories.js')

//Routes

    //Index
    router.get('/', function(req, res){
      Post.find({}, function(err, foundPosts) { // you could pass in a filter so {title: 'foo'} will return all articles with that title .find is a method
      res.render('blog/main.ejs', {allPosts: foundPosts});
      });
    });

    //New
    router.get('/new', function(req, res){
      Category.find({}, function(err, foundCategories) {
         res.render('blog/new.ejs', {
           allCategories: foundCategories //doesn't matter what you call it but allCategories has to match allCategories at the top
        });
      });
    });


    //show
    router.get('/:id', function(req, res){
      Post.findById(req.params.id, function(err, foundPost){ //computer finds id in req.params (finds id in database)
        // Category.findOne({'post._id': req.params.id}, function(err, foundPost){
          res.render('blog/post.ejs', {
            // category: foundCategory,
            post: foundPost
          }); // render post page, make createdBlog available
        // });
      });
    });

    //delete
    router.delete('/:id', function(req, res){
     Post.findByIdAndRemove(req.params.id, function(err, foundPost){ // upper case B has to match top of this document, the Model
       Category.findOne({'post._id': req.params.id}, function(err, foundCategory){
         console.log(foundCategory);
         foundCategory.post.id(req.params.id).remove();
         foundCategory.save(function(err, data){
           res.redirect('/blog');
         });
       });
    });
    });


   //edit
   router.get('/:id/edit', function(req, res){
     Post.findById(req.params.id, function(err, foundPost){
       res.render('blog/edit.ejs', { post: foundPost});
        //  res.redirect('/'); you can only have a single res
     });
   });


   //update
   router.put('/:id', function(req, res){
     Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedPost){
       Category.findOne({'post._id' : req.params.id}, function(err, foundCategory){ // find post that has req.params.id specified
         foundCategory.post.id(req.params.id).remove();
         foundCategory.post.push(updatedPost);
         foundCategory.save(function(err, data){
           res.redirect('/blog/'+req.params.id); // go back to show page
         });
       });
     });
   });


   //Create
   router.post('/', function(req, res){ // going to receive data from blgo entry
         Category.findById(req.body.categoryId, function(err, foundCategory){
           Post.create(req.body, function(err, createdPost){
             foundCategory.post.push(createdPost);
             foundCategory.save(function(err, data){
               res.redirect('/blog');
            });
           });
         });
       });
       // res.redirect('/blog');
       // res.json(createdBlog);
       // create method takes 2 arguments 1.data to be pushed in 2. callback function
      // res.send(req.body); //see if email capture form worked


//EXPORT
module.exports = router;
