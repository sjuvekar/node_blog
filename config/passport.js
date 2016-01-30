var LocalStrategy = require('passport-local').Strategy
var User          = require("../db/user");

// Passport serialization/deserialization and auth
module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // Local login strategy
  passport.use('local-login', new LocalStrategy({
    usernameField: 'login_name',
    passwordField: 'login_password',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },
  function(req, username, password, done) {

    // asynchronous
    process.nextTick(function() {

      User.findOne({name: username}, function(err, user) {
        if (err) {
          return done(err);
        }

        // No User
        if (!user) {
          return done(null, false, req.flash("message", "Login id not found. Have you signed up?"));
        }

        // Match password
        if (!user.comparePassword(password)) {
          return done(null, false, req.flash("message", "Could not log in, incorrect password."));
        }
        else {
          return done(null, user);
        }
      });
    });
  }));
};
