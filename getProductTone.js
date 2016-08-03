var url = 'http://api-platform.mybluemix.net/marketplace/api/catalog/v1/products',
    request = require('request'),
    cheerio = require('cheerio'),
    toneAnalyzer = require('./analyzer.js'),
    fs = require('fs'),
    req = {
    url : url,
    headers: {
            "x-ibm-client-id":"57c55b28-5437-11e6-aa7a-01026bdd0df7",
            "x-ibm-client-secret":"57c588d1-5437-11e6-aa7a-01026bdd0df7",
            "Accept":"application/json"
        }
    },
    productlist = [];

function getProductTone (url) {
    request.get(req, function (error, response, body) {
        if (error || response.statusCode > 399) {
            console.log('Cant find page');
        } else {
            var list = JSON.parse(body).data;
            list = list.slice(0,1);
            list.forEach(function(product) {
                var prodInfo = {
                    name: product.name,
                    description: product.longDescription,
                    tone : {}
                };
                toneAnalyzer.analyzeTone(product.longDescription).then(function(tone) {
                    prodInfo.tone = tone;
                    productlist.push(prodInfo);
                });
            });
        }
    });
}

getProductTone(url);
