var express = require('express')
  , cfenv = require('cfenv')
  , passport = require('passport')
  , util = require('util')
  , mongoose = require('mongoose')
  , FacebookStrategy = require('passport-facebook').Strategy
  , logger = require('morgan')
  , session = require('express-session')
  , bodyParser = require("body-parser")
  , cookieParser = require("cookie-parser")
  , methodOverride = require('method-override')
  , config = require("../oauth.js")
  , request = require('request');
var userFacebookLikes = [];

var routes  = require('./../routes/index');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['id', 'displayName', 'likes']
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      // console.log('profile.likes',profile._json.likes);
      userFacebookLikes = userFacebookLikes.concat(profile._json.likes);
      if(profile._json.likes.paging.next){
          getFacebookLikes(profile._json.likes.paging.next, function(){
            return done(null, profile);
          });
      }
    });
  }
));

function getFacebookLikes(facebookLikesUrl,callback){
    request.get({
        url: facebookLikesUrl,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            userFacebookLikes =  userFacebookLikes.concat(body.data);
            if (body.paging.next) { // if set, this is the next URL to query
                getFacebookLikes(body.paging.next, callback);
            } else {
                callback(); //Call when we are finished
            }
        } else {
            console.log(error);
            throw error;
        }

    });
}


function getEventsFromDates(startDate,endDate,city,callback){

    var stubhubUrl = util.format("https://api.stubhub.com/search/catalog/events/v3?city=%s&date=%s TO %s",
        cities[city],startDate,endDate);

    request.get({
        url: stubhubUrl,
        headers: {
            'Authorization': 'Bearer NNi1xN62e40VxTtbXkMofTx1PRYa',
            'Content-Type': 'application/json'
        }
    },function (error, response, body) {
        if (!error && response.statusCode == 200) {
            events = events.concat(JSON.parse(body).events);
            if(city < cities.length - 1){
                city = city + 1;
                getEventsFromDates(startDate,endDate,city,callback);
            } else{
                callback();
            }
        }
    });
}

function getEventsFromLikes(){
    var eventsFromLikes = [];
    eventsFromLikes = events;
    return eventsFromLikes;
}


var app = express();

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();



var path = require ('path');

// configure Express
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended: true
  }));
  app.use(cookieParser());
  // app.use(bodyParser());
  app.use(methodOverride());
  app.use(session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(__dirname + './../public'));
  // app.use(express.static(path.join(__dirname + '.../public')));


// app.use('/', routes);
// app.get('/', function(req, res){
//   res.json('index', { user: req.user });
// });

// app.get('/account', ensureAuthenticated, function(req, res){
//   res.render('account', { user: req.user });
// });

// app.get('/login', function(req, res){
//   res.render('login', { user: req.user });
// });

// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback
app.get('/auth/facebook',
  passport.authenticate('facebook',{ scope: ['user_likes'] }),
  function(req, res){
    // The request will be redirected to Facebook for authentication, so this
    // function will not be called.
  });

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

// app.use(function(req, res){
//   res.redirect('/');
// });


app.post('/volare/search/',function(req,res){
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var city = 0;
    getEventsFromDates(startDate,endDate,city, function(){
        res.send(getEventsFromLikes());
    });
});

//app.listen(3000);
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
