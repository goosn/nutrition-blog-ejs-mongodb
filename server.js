//DEPENDENCIES
  var express = require('express');
  var app = express ();
  var bodyParser = require('body-parser');
  var methodOverride = require('method-override');
  var mongoose = require('mongoose'); // connects to server

//PORT
  var port = 3000; // used to launch application in browser

//DATABASE
    mongoose.connect('mongodb://localhost:27017/blog'); // 1) this constantly checks for a connection to our server 2) this port is used to connect to the computer's hard drive and the mongo database 3) we created a blog db
    var db = mongoose.connect; // saving mongo connection to a variable

    mongoose.connection.once('open', function(){
      console.log('connected to mongo');
    });

//MIDDLEWARE
    app.use(methodOverride('_method'));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

//CONTROLLER MIDDLEWARE
    var blogController = require('./controllers/blogPost.js'); // whenver access a file that is an npm module, have to have ./
    app.use('/blogPost', blogController);

//ROUTE
    app.get('/', function(req, res){
      res.redirect('/blog');
    });

    app.get('/blog', function(req, res){
      res.render('blog/main.ejs');
    });

    app.get('/post', function(req, res){
      res.render('blog/post.ejs');
    })



//LISTENER
    app.listen(3000, function(){
      console.log('listening...');
    });
