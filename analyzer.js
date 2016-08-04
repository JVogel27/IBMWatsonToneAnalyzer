module.exports = {

	analyzeTone: function(text){

		var watson = require('watson-developer-cloud');
		var tone_analyzer = watson.tone_analyzer({
		  username: '10d590f6-591e-4950-9715-a5efaff49e90',
		  password: 'JOl3OarYVNwa',
		  version: 'v3',
		  version_date: '2016-05-19 '
		});

		return new Promise(function(resolve, reject){
			/*if(!text){
				reject({message: "No text given to analyze"})
			}*/
			//else{
				var input = {text: " I was immediately hit with a view of trendy, young, energetic dancers. They were all dressed very “hip hop” or “street”. Many of the females wore fitted sweats, while others wore baggy ones. Some girls dressed a little more feminine but still kept it hip hop. For example, a female dancer wore spandex shorts, a crop top, and an old school looking flannel tied around her waist. Nearly all the dancers had nice sneakers on, mostly Nike or Jordans. The guys had t-shirts, some plain, some from well known brands such as Stussy. I was instantly drawn in by their style! It was so refreshing seeing a group of people all be so in sync with their sense of style, from their clothes to their walk. They definitely all possessed a certain swagger. I always assumed dancers dressed in comfy workout clothes to dance class, but I was wrong. I guess dancers want to keep it fun and incorporate their hip hop roots in their clothes even when their not doing a final performance. I admired the energy they put in to their style. I could tell it made them feel confident and cool, which benefits their dancing. The room was fairly large, spacious, and clean. The wooden floors looked nice and clean, ready for the dancers. The huge mirrored walls were also clear and clean. I loved how well maintained the dance studio was. I'm sure the dancers appreciate being able to dance in such a nice environment. I could only conclude that feeling comfortable and proud of where you're dancing is very important as a dancer. Being in the dance studio was a nice change of place. There was definitely a big sense of fun, high energy in the room. I stood back and in the corner with my friend, and began to observe."};
				tone_analyzer.tone(input,
				function(err, tone) {
					if (err){
			  			reject(err);
		  			}
					else{
			  			resolve(tone, null, 2);
					}
				});
			//}
		});	
  	}
};
