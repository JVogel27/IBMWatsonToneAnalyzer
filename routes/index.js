var express = require('express');
var analyzer = require('../analyzer');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {

	res.render('index');
});

router.post('/analyze', function(req, res, next){
    analyzer.analyzeTone(req.body.input).then(function(result){
    	data = {
    		tone: result
    	};
        res.render('results', data);
    }).catch(function(error){
        res.render('error', {
          message: error.message,
          error: error
        });
    })
    
})

module.exports = router;

