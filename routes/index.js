var express = require('express');
var analyzer = require('../analyzer');
var router = express.Router();
var request = require('request');
var getProductObj = require('../getProductTone');

router.get('/', function(req, res, next) {

	getProductObj.getProductTone().then(function(productList) {
		res.render('index',{
			productList:productList
		});
	});
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

