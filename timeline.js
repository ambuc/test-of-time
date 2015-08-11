var stack; //list of unasked events
var timeline; //things in the timeline
var years = []; //years on the timeline
var question; //the current question (Object)
var events = data;

$(document).ready(function(){

	startGame();

});

function checkDates(){
	var i = parseInt($(this).attr('data-index'));
	var currDate = Number($('.question').attr('data-year'));
	var beforeDate = Number($(this).attr('data-year'));
	var afterDate = Number($('[data-index='+(i-1)+']').attr('data-year'));
		
	if( beforeDate < currDate && currDate < afterDate ){
		rightMoveBozo( i );
	} else {
		wrongMoveBozo();
	}
}

function rightMoveBozo( i ){
	timeline.data.splice(i, 0, question);
	refresh(timeline, i);
	newQuestion();
	$('.year').hide();
}

function wrongMoveBozo(){
	$('.year').show();
	$('.possibility').hide();

	$('.message').hide();
	$('.youlost').removeClass('hide');
	$('#points').html(timeline.data.length-1);
	$('a#newgame').click(function(){
		startGame();
	});
}

function startGame(){
	stack = _.shuffle(events);

	var starter = getNewEvent();

	timeline = {'data':[starter]};
	years.push(starter.year);
	refresh(timeline);
	newQuestion();

	$('.message').show();
	$('.youlost').addClass('hide');
	$('.year').hide();
}

function refresh(data, i){
	var events_template = _.template( $( "#timeline_template" ).html() );

	$('.timeline').html(events_template(data));

	if(!_.isUndefined(i)){
		$($('.event-row')[i]).children('.event').addClass('flash');
	}
	
	$('a.here').click(function(){
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

	$('.current').html(question_template(question));
}

function getNewEvent(){
	var trial = stack.pop();

	while(_.isUndefined(trial) || _.isNull(trial) || _.contains(years, trial.year)){
		trial = stack.pop();
	}
	return trial;
}
