//DEPENDENCIES
  var express = require('express');
  var app = express ();
  var bodyParser = require('body-parser');
  var methodOverride = require('method-override');
  var mongoose = require('mongoose'); // connects to server

//PORT
  var port = 3000; // used to launch application in browser

//DATABASE
    mongoose.connect('mongodb://localhost:27017/Nutrition_Blog'); // 1) this constantly checks for a connection to our server 2) this port is used to connect to the computer's hard drive and the mongo database

    var db = mongoose.connect; // saving mongo connection to a variable


//MIDDLEWARE
    app.use(methodOverride('_method'));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

//CONTROLLER MIDDLEWARE
    //  app.use('/', blogPost.js);


//ROUTE
    app.get('/blog', function(req, res){
      res.render('blog/main.ejs');
    });



//LISTENER
    app.listen(3000, function(){
      console.log('listening...');
    });
