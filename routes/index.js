var Post = require('../db/post')

module.exports.render = function(dest, req, res) {
	var my_id = 1;
	if (req.params.id) {
		my_id = req.params.id;
	}
	Post.find({}, null, {sort: {created_at: -1}})
	.skip((my_id-1) * 10)
	.limit(10)
	.exec(function(err, result) {
		if (!err) {
			res.render(dest, {
				blog_entries: result,
				num_pages: 6,
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