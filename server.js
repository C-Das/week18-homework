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

app.use(bodyParser.urlencoded({
  extended :false
}));

app.use(express.static('public'));

app.get('/',function(req,res){
  res.send("Hi, This is on port: 3000");
});

app.get('/scraper',function(req,res){

  request('http://www.rottentomatoes.com/', function (error, response, body) {

  if (!error && response.statusCode == 200) {
     $ = cheerio.load(body);

     $('.middle_col').each(function(i,elem){
        debugger
        // console.log($(this));
        console.log($(this).find("a").text());
        console.log("http://www.rottentomatoes.com"+$(this).find("a").attr("href"))

        var url = "http://www.rottentomatoes.com"+$(this).find("a").attr("href");

        console.log(url);

        // request('http://www.rottentomatoes.com/', function (error, response, body) {

        //   if (!error && response.statusCode == 200) {

        //     $ = cheerio.load(body);


        //   }

        // });

       $(this).find('middle_col').each(function (i,elem){
        console.log("2");
         console.log("Title :"+$(this).children("a").text());
         console.log("Link :"+$(this).children("a").attr("href"));
       });
       // var title = $(this).find('.middle_col').children("a").text();
       // var link = $(this).find('.middle_col').children("a").attr("href");
       // console.log("Title :"+title);
       // console.log("Link:"+link);
       // if(title && link){
       //  db.scrapedData.save({
       //    title:title,
       //    link:link
       //  }),function(err,saved){
       //    if(err){
       //      console.log(err);
       //    } else {
       //      console.log(saved);
       //    }
       //  }
       // }
     });
    }
  })
    res.send("Scraper Hello World");
});

app.listen (PORT, function(){
  console.log("Application is listening on PORT : "+PORT);
});
