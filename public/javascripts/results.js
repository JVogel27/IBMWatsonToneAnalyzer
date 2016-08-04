
function clickHandler(){
	emotionName = $(this).text();
	applyFliter(emotionName);
}

function applyFliter(emotionName){
	sentences = data.tone.sentences_tone;
	result = "";
	sentences.forEach(function(sentenceObj){
		sentence = sentenceObj.text;
		if(sentenceObj.tone_categories[0]){
			score = sentenceObj.tone_categories[0].tones.filter(function(obj){
				return obj.tone_name === emotionName;
			})[0].score;
			if(score > 0 && score <= 0.25){
				className = emotionName.toLowerCase() + "-min";
			}
			else if(score > 0.25 && score <= 0.50){
				className = emotionName.toLowerCase() + "-low";
			}
			else if(score > 0.50 && score <= 0.75){
				className = emotionName.toLowerCase() + "-mid";
			}
			else{
				className = emotionName.toLowerCase() + "-high";
			}
			sentenceMarkup = "<span class=" + className + ">" + sentence + "</br>" + " </span>";
			result += sentenceMarkup;
		}
		else{
			sentenceMarkup = "<span class=no-score>" + sentence + "</br>" + "</span>";
			result += sentenceMarkup;
		}
	});
	$(".tab-pane > p").html(result);
}


$(document).ready(function(){
	emotionName = $(".nav-stacked > li.active ").text();
	applyFliter(emotionName);
	$(".nav-stacked > li").on('click', clickHandler);
});