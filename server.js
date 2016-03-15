var express = require('express');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var expressHandlebars = require('express-handlebars');
var mongoose = require('mongoose');
var request = require('request');
var logger = require('morgan');
var PORT = 3000

var app = express();

app.use(logger('dev'));

app.get('/',function(req,res){
  res.send("Hi, This is on port -3000");
});

app.listen (PORT, function(){
  console.log("Application is listening on PORT : "+PORT);
});
