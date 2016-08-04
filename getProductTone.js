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
    Q = require('q');


function getText(list) {
    var deferred = Q.defer(),
        productList = [];

    list.map(function(product) {
        var prodInfo = {
                name: product.name,
                text: '',
                tone: {}
            },
            text;

        prodInfo.text = 'description' + '\n' + product.description + '\n\n';
        if(product.hasOwnProperty('benefits')) {
            prodInfo.text += 'Benefits\n'
            product.benefits.map(function(benefit) {
               prodInfo.text += benefit.title + '\n' + benefit.description + '\n\n';
            });
        }
        productList.push(prodInfo);
    });
    deferred.resolve(productList);

    return deferred.promise;
}

function getTone(productList) {
    var deferred = Q.defer();

    productList.map(function (product) {
        toneAnalyzer.analyzeTone(product.text).then(function(tone) {
            product.tone = tone.document_tone;
            //console.log(JSON.stringify(product.tone,null,2));
            deferred.resolve(productList);
        });
    })
    return deferred.promise;
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}



function getProductTone () {
    var deferred = Q.defer();

    request.get(req, function (error, response, body) {
        if (error || response.statusCode > 399) {
            deferred.reject({'error': 'Cant find page'});
        } else {
            var list = JSON.parse(body).data;//.slice(0,1);
            getText(list)
                .then(getTone)
                .then(deferred.resolve)
                .catch(deferred.reject);
        }
    });
    return deferred.promise;
}
//sleep(2000).then( () => {

module.exports = {
    getProductTone: getProductTone
};

// });
