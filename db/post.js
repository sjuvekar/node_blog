var mongoose = require("mongoose")

var PostSchema = mongoose.Schema({
	subject: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	created_at: { type: Date, default: Date.now },
});

module.exports = mongoose,model("Post", PostSchema);