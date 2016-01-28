var Post = require('../db/post')

module.exports.render = function(dest, req, res) {
	// First send number of documents in database
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
					res.render(dest, {
						blog_entries: result,
						num_pages: Math.ceil(count / 10),
					});
				}
			});
		}
	});
};

module.exports.render_blog = function(dest, req, res) {
  	if (req.params.id) {
		Post.findById(req.params.id, function(err, result) {
			if (!err) {
				res.render(dest, {
					blog_entry: result,
				});
			}
		});
	}
};