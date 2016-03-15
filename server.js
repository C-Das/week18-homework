var express = require('express');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var expressHandlebars = require('express-handlebars');
var mongoose = require('mongoose');
var request = require('request');
var logger = require('morgan');
var mongojs = require('mongojs');
var PORT = 3000

var app = express();

app.use(logger('dev'));

app.use(bodyParser.urlencoded({
  extended :false
}));

app.engine('handlebars',expressHandlebars({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.use(express.static('public'));

//Database configuration
mongoose.connect('mongodb://localhost/week18homework');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

//Require Schemas
var Note = require('./model/noteModel.js');
var User = require('./model/userModel.js');
var Movies = require('./model/movieModel.js');

var exampleUser = new User({
  name: "Chinmay Das"
});

// exampleUser.save(function(err, doc) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(doc);
//   }
// });

//New Note Creation
app.post('/submit', function(req, res) {
  var newNote = new Note(req.body);
//Save the new note
  newNote.save(function(err, doc) {
    if (err) {
      res.send(err);
    } else {

//Find our user and push the new note id into the User's notes array
      User.findOneAndUpdate({}, {$push: {'notes': doc._id}}, {new: true}, function(err, doc) {
        if (err) {
          res.send(err);
        } else {
          res.send(doc);
        }
      });
    }
  });
});

app.get('/',function(req,res){
  //Find our user and push the new note id into the User's notes array
    Movies.find({},function(err, doc) {
      if (err) {
        res.send(err);
      } else {
        res.render('index',{doc:doc});
      }
    });
});

app.get('/scraper',function(req,res){

  request('http://www.rottentomatoes.com/', function (error, response, body) {

  if (!error && response.statusCode == 200) {
     $ = cheerio.load(body);

     $('.middle_col').each(function(i,elem){

        var movieName = $(this).find("a").text();
        var url = "http://www.rottentomatoes.com"+$(this).find("a").attr("href");

        request(url, function (error, response, body) {

          if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);
            debugger
            // console.log($(this).find('.posterImage'));
          }
        });

        var movieList = new Movies({
          movieName: movieName,
          movieUrl:url
        });

        movieList.save(function(err, doc) {
          if (err) {
            console.log(err);
          } else {
            console.log(doc);
          }
        });

     });
    }
  })
    res.send("Scraper Hello World");
});

app.listen (PORT, function(){
  console.log("Application is listening on PORT : "+PORT);
});
