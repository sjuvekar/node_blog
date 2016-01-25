var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get("usercollection");
  collection.find({},{},function(e,docs){
      res.render('index', {
          "userlist" : docs
      });
  }); 
});

module.exports = router;
