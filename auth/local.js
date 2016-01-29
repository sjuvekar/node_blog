var passport = require("passport")
  , LocalStrategy = require('passport-local').Strategy
  , User = require("../db/user");

// Local login strategy
passport.use(
	new LocalStrategy({
		usernameField: 'email',
		passwordField: 'passwd'
	},
	function(username, password, done) {
		User.findOne({name: username}, function(err, user) {
			if (err) { return done(err); }
			// No User
			if (!user) { return done(null, false, {message: "Email id not found. Have you signed up?"}); }
			// Match password
			user.comparePassword(password, function(err, isMatch) {
				if (!err && !isMatch) {
					return done(null, false, { message: 'Could not log in, incorrect password.' });
				}
				else {
					return done(null, user);
				}
		    });
		});
	}
));
