var Post = require('../db/post')

module.exports = function(app, passport) {

	var blog_routes = function(req, res) {
		// First find number of documents in database
		Post.count(function(err, count) {
			if (!err) {
				// Get current page id from request
				var my_id = 1;
				if (req.params.id) {
					my_id = req.params.id;
				}
				// Render the page using documents
				Post.find({}, null, {sort: {created_at: -1}})
				.skip((my_id-1) * 10)
				.limit(10)
				.exec(function(err, result) {
					if (!err) {
						res.render("index.ejs", {
							blog_entries: result,
							num_pages: Math.ceil(count / 10),
						});
					}
				});
			}
		});
	};

	// normal routes ===============================================================
	// show the home page and rop posts
	app.get('/', function(req, res) { blog_routes(req, res); });
	app.get('/:id(\\d+)', function(req, res) { blog_routes(req, res); });

	// Get an individual post
	app.get('/blog/:id', function(req, res) {
		if (req.params.id) {
			Post.findById(req.params.id, function(err, result) {
				if (!err) {
					res.render("post.ejs", {
						blog_entry: result,
					});
				}
			});
		}
	});

	// Logout
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// =============================================================================
	// AUTHENTICATE (FIRST LOGIN) ==================================================
	// =============================================================================

	// Login get
	// show the login form
	app.get('/login', function(req, res) {
		res.render('login.ejs', { message: req.flash('message') });
	});

	// Login post
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// New post ==================================================
	app.get('/new', isLoggedIn, function(req, res) {
		res.render("new.ejs")
	});

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
	return next();

	req.flash("message", "You must be logged in");
	res.render('login.ejs', { message: req.flash('message') });
}
