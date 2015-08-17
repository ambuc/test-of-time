var stack; //list of unasked events
var timeline; //things in the timeline
var years = []; //years on the timeline
var question; //the current question (Object)
var events = data;
var strikes = 0;

$(document).ready(function(){

	startGame();
	$('.clue-row').removeClass('hide');
	$('.game-over-row').removeClass('hide');

});

function startGame(){
	// $('html').css('background-color', '#e8f5e9');
	stack = _.shuffle(events);
	strikes = 0;

	var starter = getNewEvent();

	timeline = {'data':[starter]};
	years.push(starter.year);
	refresh(timeline);
	newQuestion();
	resetStrikes();
	refreshStrikes();

	$('.question-col').show();
	$('.strikes-col').show();
	$('.marks-col').show();
	$('.error-col').hide();
	$('.high-col').hide();
}

function newQuestion(){
	question = getNewEvent();
	years.push(question.year);
	// console.log(question);

	var question_template = _.template( $( "#question_template" ).html() );
	$('.question-col').html(question_template(question));

}

function refresh(data, i, correct){
	var events_template = _.template( $( "#timeline_template" ).html() );

	$('.timeline').html(events_template(data));

	if(!_.isUndefined(i)){
		expand(i, correct);
	}
	
	$('.year-content').hide();

	$('.possibility').click(function(){
		checkDates.call(this);
	});

	$('.possibility').hover(function(){ $(this).toggleClass('z-depth-1'); });
}

function refreshStrikes(){
	$('.strikes-col i').eq(3-strikes).addClass('animated flash infinite');
	$('.strikes-col i').eq(3-strikes).toggleClass('green-text red-text');
	$('.strikes-col i').eq(3-strikes).html('favorite_border');
	// red-text, favorite_border
}

function resetStrikes(){
	$('.strikes-col i').removeClass('red-text animated bounceIn');
	$('.strikes-col i').addClass('green-text');
	$('.strikes-col i').html('favorite');
}

function getNewEvent(){
	var trial = stack.pop();

	while(_.isUndefined(trial) || _.isNull(trial) || _.contains(years, trial.year)){
		trial = stack.pop();
	}
	return trial;
}

function checkDates(){
	var dataYear = $(this).attr('data-year');
	var dataIndex = $(this).attr('data-index');

	var i = parseInt(dataIndex);
	var currDate = Number($('.question').attr('data-year'));
	var afterDate = Number(dataYear);
	var beforeDate = Number($('[data-index='+(i-1)+']').attr('data-year'));

	// console.log('i ' + i);
	// console.log('currDate ' + currDate);
	// console.log('beforeDate ' + beforeDate);
	// console.log('afterDate ' + afterDate);

	if( beforeDate < currDate && currDate < afterDate ){
		right( i , true);
	} else {
		wrong();
	}
}

function right( i, correct){
	timeline.data.splice(i, 0, question);
	refresh(timeline, i, correct);
	newQuestion();
	$('.year-content').hide();
}

function wrong(){

	var place = _.sortedIndex( 
		_.map(timeline.data, 
			function(e){return e.year}
		), question.year
	);

	if(strikes==0){
		// $('html').css('background-color', '#fff3e0');
	}
	if(strikes==1){
		// $('html').css('background-color', '#ffccbc');
	}
	if(strikes==2){
		// $('html').css('background-color', '#ef9a9a');		
	}

	if (strikes < 2){
		right(place, false);
		strikes+= 1;
		refreshStrikes();
		return;
	}

	strikes+=1;
	refreshStrikes();

	timeline.data.splice(place, 0, question);
	refresh(timeline, place);

	$('.year').each(function (i, e) {
		$(e).html(formatYear($(e).html()));
		$(e).show();
	});

	$('.possibility').hide();
	$('.year-content').removeClass('hide');
	$('.year-content').show();

	$('.question-col').hide();
	$('.strikes-col').hide();
	$('.marks-col').hide();
	$('.error-col').show();
	$('.high-col').show();

	$($('.ev')[place]).addClass('z-depth-2');
	$($('#large-timeline .ev')[place]).children('.year-content').toggleClass('green red lighten-1');
	$($('#small-timeline .ev')[place]).children('.year-content').toggleClass('green red lighten-1');


	$('#points').html(timeline.data.length-1);
	$('a#newgame').click(function(){
		startGame();
	});
}

function formatYear(year) {
	year = year.toString().replace(/\s/g, '');

	if (year[0] === '-') {
		year = year.slice(1);
		year += " BC";
	}

	while (year[0] === '0') {
		year = year.slice(1);
	}

	return year;
}

function expand(i){

	$( "#large-timeline .ev" ).eq(i).toggle();
	$( "#large-timeline .ev" ).eq(i).animate({
		width: 'toggle'
	}, 500);


	$( "#small-timeline .ev" ).eq(i).toggle();
	$( "#small-timeline .ev" ).eq(i).animate({
		height: "toggle"
	}, 500);

}



	// if(!_.isUndefined(i) && correct){
	// 	$($('#large-timeline .ev')[i]).addClass('flashRight');
	// 	$($('#large-timeline .ev')[i]).children('.event-content').addClass('flashRight');
	// 	$($('#small-timeline .ev')[i]).addClass('flashRight');
	// 	$($('#small-timeline .ev')[i]).children('.event-content').addClass('flashRight');
	// }

	// if(!_.isUndefined(i) && !correct){
	// 	$($('#large-timeline .ev')[i]).addClass('flashWrong');
	// 	$($('#large-timeline .ev')[i]).children('.event-content').addClass('flashWrong');
	// 	$($('#small-timeline .ev')[i]).addClass('flashWrong');
	// 	$($('#small-timeline .ev')[i]).children('.event-content').addClass('flashWrong');
	// }