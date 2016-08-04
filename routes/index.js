var express = require('express');
var analyzer = require('../analyzer');
var fs = require('fs');
var prodFile = './output.json';
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/analyze', function(req, res, next){
    analyzer.analyzeTone(req.body.input).then(function(result){
        res.render('results', {data: {name: "Name", text: "Text", tone: result}});
    }).catch(function(error){
            res.render('error', {
            message: error.message,
            error: error
        });
    })
});

router.post('/analyze-product', function(req, res, next){
    var list = JSON.parse(fs.readFileSync(prodFile, 'utf8')),
        product;

    for(var i=0; i<list.length; i++) {
        product = list[i];

        if(product.name == req.body.productName) {
            analyzer.analyzeTone(product.text).then(function(result){
                product.tone = result;
                res.render('results', {data: product});
            }).catch(function(error){
                res.render('error', {
                  message: error.message,
                  error: error
                });
            });
            break;
        }
    }
});

module.exports = router;
