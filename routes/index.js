module.exports.render = function(dest, req, res) {
	res.render(dest, {
		blog_entries: {},
		num_pages: 5,
	});
};