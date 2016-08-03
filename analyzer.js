module.exports = {

	analyzeTone: function(text){

		var watson = require('watson-developer-cloud');
		var tone_analyzer = watson.tone_analyzer({
		  username: 'f27be9c7-db9b-4195-a363-8fdb9d0d83b2',
		  password: 'L3aWmDuFWrFX',
		  version: 'v3',
		  version_date: '2016-05-19 '
		});

		return new Promise(function(resolve, reject){
			if(!text){
				reject({message: "No text given to analyze"})
			}
			else{
				var input = {text: text};
				tone_analyzer.tone(input, 
				function(err, tone) {
					if (err)
			  			reject(err);
					else
			  			resolve(tone, null, 2);
				});
			}
			
		});
	  	
  	}


};
