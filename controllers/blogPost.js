//require express so we can access Router() from express
var express = require('express');
var router = express.Router(); //() parentheses is an invokation

//Models
var Post = require('../models/blog.js')
var Category = require('../models/categories.js')

//Routes

    //Index
    router.get('/', function(req, res){
      Post.find({}, function(err, foundPosts) { // you could pass in a filter so {title: 'foo'} will return all articles with that title .find is a method // if it doesn't work it gets passed as err
        //res.send(foundPosts);
        res.render('blog/main.ejs', {allPosts: foundPosts}); // foundPosts is only a defined variable within this function. It is a placeholder that you make descriptive so you know what you are passing at that moment in time.
      });
    });

    //New
    router.get('/new', function(req, res){
      Category.find({}, function(err, foundCategories) {
         res.render('blog/new.ejs', {
           allCategories: foundCategories //doesn't matter what you call it but allCategories has to match allCategories at the top. Giving foundCategories a new key on the ejs view. allCategories is what will be used in the new.ejs page
        });
      });
    });


    //show
    router.get('/:id', function(req, res){ // id is always created in the database. So there will always be a key called id in a mongo database whether it is in the schema or not.
      Post.findById(req.params.id, function(err, foundPost){ //computer finds id in req.params (finds id in database)
        Category.findOne({'posts._id': req.params.id}, function(err, foundCategory){ // findOne is a mongo query verb. The object specifies what we are looking for within the Category(model/data) // req.params.id is the value we should be searching for.
          res.render('blog/post.ejs', {
            category: foundCategory,
            post: foundPost
          }); // render post page, make createdBlog available
        });
      });
    });

    //delete
    // router.delete('/:id', function(req, res){
    //  Post.findByIdAndRemove(req.params.id, function(err, foundPost){ // upper case B has to match top of this document, the Model
    //    Category.findOne({'posts._id': req.params.id}, function(err, foundCategory){
    //      console.log(foundCategory);
    //      foundCategory.posts.id(req.params.id).remove();
    //      foundCategory.save(function(err, data){
    //        res.redirect('/blog');
    //      });
    //    });
    // });
    // });

    //delete
    router.delete('/:id', function(req, res){
        Post.findByIdAndRemove(req.params.id, function(err, blog){ // upper case B has to match top of this document, the Model
          res.redirect('/blog');
        });
      });


   //edit
   router.get('/:id/edit', function(req, res){
     Post.findById(req.params.id, function(err, foundPost){
       res.render('blog/edit.ejs', { post: foundPost});
        //  res.redirect('/'); you can only have a single res
     });
   });


  //  //update
  //  router.put('/:id', function(req, res){
  //    Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedPost){
  //      console.log(updatedPost);
  //      Category.findOne({'category' : req.body.category}, function(err, foundCategory){ // find post that has req.params.id specified
  //       console.log(foundCategory);
  //        foundCategory.posts._id(req.params.id).remove();
  //        foundCategory.posts.push(updatedPost);
  //        foundCategory.save(function(err, data){
  //          res.redirect('/blog/'+req.params.id); // go back to show page
  //        });
  //      });
  //    });
  //  });

   //update
   router.put('/:id', function(req, res){
      Post.findById(req.params.id, function(err, foundPost){
        Category.update ( // remove post in category because post is not belong in category furthur
          {'category' : foundPost.categories},
          {$pull: {posts: {_id : req.params.id}}}, 
          {safe: true},
          function() {
            Post.findByIdAndUpdate(req.params.id, req.body, function(err, updatedPost){
              Category.findOne({'category' : req.body.categories}, function(err, foundCategory){ // 'category' matches key inisde of schemas //req.body.categories is saved to foundCategory
                foundCategory.posts.push(updatedPost);
                foundCategory.save(function(err, data){
                    res.redirect('/blog');
                });
              });
            });    
          }
        );
      });
   });


   //Create
   router.post('/', function(req, res){ // going to receive data from blog entry
         Category.findOne({'category' : req.body.categories }, function(err, foundCategory){ // 'category' matches key inisde of schemas //req.body.categories is saved to foundCategory
           Post.create(req.body, function(err, createdPost){
              // res.send(foundCategory);
              foundCategory.posts.push(createdPost);
              foundCategory.save(function(err, data){
                  //res.send(data);
                  res.redirect('/blog');
              });
           });
         });
       });
       //res.json(createdBlog); //res.json will send object with curly braces to browser
       // create method takes 2 arguments 1.data to be pushed in 2. callback function
      // res.send(req.body); //see if email capture form worked


//EXPORT
module.exports = router;
