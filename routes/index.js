var Post = require('../db/post')

module.exports.render = function(dest, req, res) {
	Post.find({}, null, {sort: {created_at: -1}}, function(err, result) {
		if (!err) {
			res.render(dest, {
				blog_entries: result,
				num_pages: 5,
			});
		}
	});
};