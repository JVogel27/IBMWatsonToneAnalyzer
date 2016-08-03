var express = require('express');
var analyzer = require('../analyzer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/analyze', function(req, res, next){
	analyzer.analyzeTone(req.body.input).then(function(result){
		res.render('results');
		//res.render('analyze', {data: result});
	}).catch(function(error){
		res.render('error', {
	      message: error.message,
	      error: error
	    });
	})
	
})

module.exports = router;
