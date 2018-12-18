var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var route = require('./routes/route');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require("express-session");
var db = require('./dbconnection');
var flash = require('connect-flash');

var app = express();
const port = 3000;

app.use(session({ secret: "login-secret", resave: true, saveUninitialized: true }));
app.use(cors({
    origin: ['http://localhost:4200'],
    credentials: true
}));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(function (user, done) {
    db.query("SELECT * FROM `users` where `username`= ?", [user], function (err, user) {
        user = JSON.parse(JSON.stringify(user));
        user = user[0];
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        db.query("SELECT * FROM `users` where `username`= ?", [username], function (err, user) {
            user = JSON.parse(JSON.stringify(user));
            user = user[0];
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password != password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

app.use('/', route);

app.listen(port, () => {
    console.log('Node running @ port ', port);
})

module.exports = app;