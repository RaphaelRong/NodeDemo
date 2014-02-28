
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
var controller = require('./public/javascripts/controller/user');


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
   console.log('connection success');

//    var Person = mongoose.model('Person');
//    var person = new Person({name:{first:'Raphael', last:'Rong'}, email:'raphael_rong@hotmail', alive:true});
//    console.log(person);
//    person.save(function (err) {
//        if (err) return handleError(err);
//
//    })
    
});




var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', function(req, res){

    var Person = mongoose.model('Person');
    Person.find(function (err, doc) {
        if (err) return handleError(err);
        for (var aDoc in doc) {
            console.log(doc); // { name: 'mongodb.org', _id: '50341373e894ad16347efe12' }
            res.send(doc);
        }
    })
});

app.get('/stooges/*?', function(req, res){
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
