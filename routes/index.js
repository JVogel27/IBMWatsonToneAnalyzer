var express = require('express');
var analyzer = require('../analyzer');
var router = express.Router();

//added
var request = require('request');


var getProductObj = require('../getProductTone');

//getProductObj.getProductTone();
/* GET home page. */

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

 sleep(2000).then( () => {

 router.get('/', function(req, res, next) {

	getProductObj.getProductTone().then(function(productList) {
    res.render('index',{
    	productList:productList
    });
    console.log(productList);
    console.log("This is Varun ");
    });

    
  // res.render('index',{});

});

 });


// var headers = {
//  'User-Agent': 'request',
//  'x-ibm-client-id':'57c55b28-5437-11e6-aa7a-01026bdd0df7',
//  'x-ibm-client-secret':'57c588d1-5437-11e6-aa7a-01026bdd0df7'
// }

// var options = {
//  url: 'http://api-platform.mybluemix.net/marketplace/api/catalog/v1/products',
//  method: 'GET',
//  headers: headers
// }

// router.get('/', function(req, res, next){
//    request(options, function (error, response, body) {
// 	   if (!error && response.statusCode == 200) {
// 		   res.json('index.ejs', {
// 			   title: "Index page",
// 			   localeObj: body
// 			})
// 	   }else{
// 	       console.log("error",error); 
// 	       next();
// 	   }
// 	  });
// });  



// var url = 'http://api-platform.mybluemix.net/marketplace/api/catalog/v1/products',
//     request = require('request'),
//     cheerio = require('cheerio'),
//     toneAnalyzer = require('./analyzer.js'),
//     fs = require('fs'),
//     req = {
//     url : url,
//     headers: {
//             "x-ibm-client-id":"57c55b28-5437-11e6-aa7a-01026bdd0df7",
//             "x-ibm-client-secret":"57c588d1-5437-11e6-aa7a-01026bdd0df7",
//             "Accept":"application/json"
//         }
//     },
//     productlist = [];




// request.get(req, function (error, response, body) {
//         if (error || response.statusCode > 399) {
//             console.log('Cant find page');
//         } else {
//             var list = JSON.parse(body).data;
//             // list = list.slice(0,1);
//             list.map(function(product) {
//                 var prodInfo = {
//                     name: product.name,
//                     description: product.longDescription,
//                     tone: {},
//                     benefits: []
//                 };
//                 toneAnalyzer.analyzeTone(product.longDescription).then(function(tone) {
//                     prodInfo.tone = tone;
//                     productlist.push(prodInfo);
//                 });

//             });
//               res.render('index',{productObject: productlist});
//         }

//  });

router.post('/analyze', function(req, res, next){
	analyzer.analyzeTone(req.body.input).then(function(result){
		res.render('analyze', {data: result});
	}).catch(function(error){
		res.render('error', {
	      message: error.message,
	      error: error
	    });
	})
	
})

module.exports = router;
