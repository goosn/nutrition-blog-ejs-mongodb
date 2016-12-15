//require express so we can access Router() from express
var express = require('express');
var router = express.Router(); //() parentheses is an invokation

//Models
var Category = require('../models/categories.js')

//Routes

    router.get('/', function(req, res){
	      Category.find({}, function(err, foundCategories){
		        res.render('categories/index.ejs', {
			           categories: foundCategories
      		});
      	});
      });

      router.post('/', function(req, res){
      	Category.create(req.body, function(err, createdCategory){
      		res.redirect('/categories');
      	});
      });

      router.get('/new', function(req, res){
      	res.render('categories/new.ejs');
      });

      router.get('/:id', function(req, res){
      	Category.findById(req.params.id, function(err, foundCategory){
      		res.render('categories/show.ejs', {
      			category: foundCategory
      		});
      	});
      });

      router.delete('/:id', function(req, res){
      	Category.findByIdAndRemove(req.params.id, function(){
      		res.redirect('/categories');
      	});
      });

      router.put('/:id', function(req, res){
      	Category.findByIdAndUpdate(req.params.id, req.body, function(){
      		res.redirect('/categories');
      	});
      });

      router.get('/:id/edit', function(req, res){
      	Category.findById(req.params.id, function(err, foundCategory){
      		res.render('categories/edit.ejs', {
      			category: foundCategory
      		});
      	});
      });


//EXPORT
module.exports = router;
