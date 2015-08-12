var stack; //list of unasked events
var timeline; //things in the timeline
var years = []; //years on the timeline
var question; //the current question (Object)
var events = data;
var strikes = 0;

$(document).ready(function(){

	startGame();

});

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
		rightMoveBozo( i , true);
	} else {
		wrongMoveBozo();
	}
}

function rightMoveBozo( i, correct){
	timeline.data.splice(i, 0, question);
	refresh(timeline, i, correct);
	newQuestion();
	$('.year').hide();
}

function wrongMoveBozo(){

	var place = _.sortedIndex( 
		_.map(timeline.data, 
			function(e){return e.year}
		), question.year
	);

	if (strikes < 2){
		rightMoveBozo(place, false);
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

	$('.question-col').hide();
	$('.strikes-col').hide();
	$('.error-col').removeClass('hide');
	$('.high-col').removeClass('hide');

	$($('.ev')[place]).addClass('z-depth-2');
	$($('#large-timeline .ev')[place]).children('.card-content').toggleClass('green red');
	$($('#small-timeline .ev')[place]).children('.card-content').toggleClass('green red');


	$('#points').html(timeline.data.length-1);
	$('a#newgame').click(function(){
		startGame();
	});
}

function startGame(){
	stack = _.shuffle(events);
	strikes = 0;

	var starter = getNewEvent();

	timeline = {'data':[starter]};
	years.push(starter.year);
	refresh(timeline);
	newQuestion();
	refreshStrikes();

	$('.question-col').show();
	$('.strikes-col').show();
	$('.error-col').addClass('hide');
	$('.high-col').addClass('hide');
	$('.year').hide();
}

function refresh(data, i, correct){
	var events_template = _.template( $( "#timeline_template" ).html() );

	$('.timeline').html(events_template(data));

	if(!_.isUndefined(i) && correct){
		$($('#large-timeline .ev')[i]).addClass('flashRight');
		$($('#large-timeline .ev')[i]).children('.event').addClass('flashRight');
		$($('#small-timeline .ev')[i]).addClass('flashRight');
		$($('#small-timeline .ev')[i]).children('.event').addClass('flashRight');
	}

	if(!_.isUndefined(i) && !correct){
		$($('#large-timeline .ev')[i]).addClass('flashWrong');
		$($('#large-timeline .ev')[i]).children('.event').addClass('flashWrong');
		$($('#small-timeline .ev')[i]).addClass('flashWrong');
		$($('#small-timeline .ev')[i]).children('.event').addClass('flashWrong');
	}
	
	$('.possibility').click(function(){
		checkDates.call(this);
	});
}

var notLocked = true;
$.fn.animateHighlight = function(highlightColor, duration) {
    var highlightBg = highlightColor || "#FFFF9C";
    var animateMs = duration || 1500;
    var originalBg = this.css("backgroundColor");
    if (notLocked) {
        notLocked = false;
        this.stop().css("background-color", highlightBg)
            .animate({backgroundColor: originalBg}, animateMs);
        setTimeout( function() { notLocked = true; }, animateMs);
    }
};

function newQuestion(){
	question = getNewEvent();
	years.push(question.year);

	var question_template = _.template( $( "#question_template" ).html() );
	$('.question-col').html(question_template(question));

}

function refreshStrikes(){
	var strikes_template = _.template( $( "#strikes_template" ).html() );
	$('.strikes-col').html(strikes_template({'strikes':strikes}));
}

function getNewEvent(){
	var trial = stack.pop();

	while(_.isUndefined(trial) || _.isNull(trial) || _.contains(years, trial.year)){
		trial = stack.pop();
	}
	return trial;
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