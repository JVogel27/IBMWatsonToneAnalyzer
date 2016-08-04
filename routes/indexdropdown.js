var express = require('express');
var analyzer = require('../analyzer');
var router = express.Router();

/* GET home page. */
router.get('/indexdropdown', function(req, res, next) {
  res.render('indexdropdown');
});

// router.post('/analyze', function(req, res, next){
// 	analyzer.analyzeTone(req.body.input).then(function(result){
// 		res.render('analyze', {data: result});
// 	}).catch(function(error){
// 		res.render('error', {
// 	      message: error.message,
// 	      error: error
// 	    });
// 	})
	
// })

module.exports = router;
