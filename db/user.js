var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	}
});

// Use Synchronized compare function from bcrypt
UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
