var mongoose = require('mongoose');

var uristring =  process.env.MONGOLAB_URI ||
  				 process.env.MONGOHQ_URL ||
  				"mongodb://" + process.env.MONGODB_USER + ":" + process.env.MONGODB_PASSWORD + "@ds051575.mongolab.com:51575/heroku_fjlz6w1r";

module.exports.mongoInit = function() {
    mongoose.connect(uristring, function (err, res) {
	if (err) { 
	    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
	} else {
	    console.log ('Succeeded connection to: ' + uristring);
	}
    });
};

