
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require("fs");
var url = require("url");
var mime = require("./mime").types;
var config = require("./config");
var zlib = require("zlib");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

var Showpiece = require('./public/javascripts/controller/Showpiece')(mongoose);

var userController = require('./public/javascripts/controller/user');


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
   console.log('connection success');



//    var Person = mongoose.model('Person');
//    var person = new Person({name:{first:'Jay', last:'zhou'}, major:7, email:'jay_zhou@hotmail', alive:true});
//    console.log(person);
//    person.save(function (err) {
//        console.log(err);
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
app.get('/newShowpiece', function(req, res){
    res.render('newShowpiece', { legend: 'Add New Showpiece' });
});


app.get('/users', function(req, res){
    console.log('login request');
    var email = req.param('email', null);
    var password = req.param('password', null);
    Account.login(email, password, function(success) {
        if ( !success ) {
            res.send(401);
            return; }
        console.log('login was successful');
        res.send(200);
    });
//    var Person = mongoose.model('Person');
//    if (req.method == "GET") {
//        Person.find(function (err, doc) {
//            if (err) return handleError(err);
//            for (var aDoc in doc) {
//                console.log(doc); // { name: 'mongodb.org', _id: '50341373e894ad16347efe12' }
//                res.send(doc);
//            }
//        });
//    } else {
//        console.log(req.method);
//    }
});

app.post('/login', function(req, res){
    console.log('login request');
    var email = req.param('email', null);
    var password = req.param('password', null);
    if ( null == email || email.length < 1
        || null == password || password.length < 1 ) {
        res.send(400);
        return;
    }
    models.Account.login(email, password, function(account) {
        if ( !account ) {
            res.send(401);
            return; }
        console.log('login was successful');
        req.session.loggedIn = true;
        req.session.accountId = account._id;
        res.send(200);
    });

});

app.get('/register', function(req, res) {
//    var firstName = req.param('firstName', '');
//    var lastName = req.param('lastName', '');
    var email = req.param('email', null);
//    var password = req.param('password', null);
//    if ( null == email || email.length < 1
//        || null == password || password.length < 1 ) {
//        res.send(400);
//        return; }
//    models.Account.register(email, password, firstName, lastName);
//    res.send(200);
//    var user = models.Account.findOne(err, doc){
//        if (err) {
//            // Email address is not a valid user
//            callback(false);
//        }else{
//            console.log(doc);
//        }
//    };
});




app.post('/addNewShowPiece', function(req, res){
    var name = req.body.name;
    var author = req.body.author;
    var area = req.body.area;
    var position = req.body.position;
    var category = req.body.category;
    var beaconMajor = req.body.beaconMajor;
    var beaconMinor = req.body.beaconMinor;

    Showpiece.createShowpiece(name, author, area, position, category, beaconMajor, beaconMinor);


    Showpiece.Showpiece.find(function(err, doc){
        console.log(doc);

        res.render("showpieceList", {datas:doc});
    });

//    Showpiece.cr   (name, author, area, position, category, beaconMajor, beaconMinor);
});

app.get('/showpieceList', function(req, res){

    Showpiece.Showpiece.find(function(err, doc){
        console.log(doc);
        res.render("showpieceList", {datas:doc});
    });
});

app.get('/findShowpiece', function(req, res){
    console.log(req.query.bmValue);
    Showpiece.Showpiece.findOne({beaconMajor:req.query.bmValue}, function(err, doc){
        console.log(doc);
        res.send(doc);
    });
});

app.post('/deleteShowpiece', function(req, res){
    Showpiece.deleteShowpiece(res, req.body.identity);
    console.log(req.body.identity);
    Showpiece.Showpiece.find(function(err, doc){
        console.log(doc);
        res.render("showpieceList", {datas:doc});
    });
});

//Account Start
app.post('/addNewAccount', function(req, res){
    var accountName = req.body.accountName;
    var password = req.body.password;
    var area = req.body.area;
    var position = req.body.position;
    var category = req.body.category;
    var beaconMajor = req.body.beaconMajor;
    var beaconMinor = req.body.beaconMinor;

    Showpiece.createShowpiece(name, author, area, position, category, beaconMajor, beaconMinor);


    Showpiece.Showpiece.find(function(err, doc){
        console.log(doc);

        res.render("showpieceList", {datas:doc});
    });

//    Showpiece.cr   (name, author, area, position, category, beaconMajor, beaconMinor);
});

app.get('/showpieceList', function(req, res){

    Showpiece.Showpiece.find(function(err, doc){
        console.log(doc);
        res.render("showpieceList", {datas:doc});
    });
});

app.get('/findShowpiece', function(req, res){
    console.log(req.query.bmValue);
    Showpiece.Showpiece.findOne({beaconMajor:req.query.bmValue}, function(err, doc){
        console.log(doc);
        res.send(doc);
    });
});

app.post('/deleteShowpiece', function(req, res){
    Showpiece.deleteShowpiece(res, req.body.identity);
    console.log(req.body.identity);
    Showpiece.Showpiece.find(function(err, doc){
        console.log(doc);
        res.render("showpieceList", {datas:doc});
    });
});

app.get('/getFile', function(req, res){

    var pathname = url.parse(req.url).pathname;
    var realPath = "assets/" + req.query.path;
    var ext = path.extname(realPath);

    ext = ext ? ext.slice(1) : 'unknown';

    console.log(pathname);

    fs.exists(realPath, function (exists) {

        if (!exists) {

            res.writeHead(404, {'Content-Type': 'text/plain'});

            res.write("This request URL " + realPath + " was not found on this server.");

            res.end();

        } else {
            console.log("123");
            fs.readFile(realPath, "binary", function(err, file) {

                if (err) {

                    res.writeHead(500, {'Content-Type': 'text/plain'});

                    res.end(err);

                } else {

                    if (ext.match(config.Expires.fileMatch)) {

                        var expires = new Date();

                        expires.setTime(expires.getTime() + config.Expires.maxAge * 1000);

                        res.setHeader("Expires", expires.toUTCString());

                        res.setHeader("Cache-Control", "max-age=" + config.Expires.maxAge);

                    }

                    fs.stat(realPath, function (err, stat) {

                        var lastModified = stat.mtime.toUTCString();

                        var ifModifiedSince = "If-Modified-Since".toLowerCase();

                        res.setHeader("Last-Modified", lastModified);

                        if (req.headers[ifModifiedSince] && lastModified == req.headers[ifModifiedSince]) {

                            res.writeHead(304, "Not Modified");

                            res.end();

                        } else {

                            var raw = fs.createReadStream(realPath);

                            var acceptEncoding = req.headers['accept-encoding'] || "";

                            var matched = ext.match(config.Compress.match);



                            if (matched && acceptEncoding.match(/\bgzip\b/)) {

                                res.writeHead(200, "Ok", {'Content-Encoding': 'gzip'});

                                raw.pipe(zlib.createGzip()).pipe(res);

                            } else if (matched && acceptEncoding.match(/\bdeflate\b/)) {

                                res.writeHead(200, "Ok", {'Content-Encoding': 'deflate'});

                                raw.pipe(zlib.createDeflate()).pipe(res);

                            } else {

                                res.writeHead(200, "Ok");

                                raw.pipe(res);

                            }
                        }

                    });


                }

            });

        }

    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
