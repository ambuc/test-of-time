var stack; //list of unasked events
var timeline; //things in the timeline
var years = []; //years on the timeline
var question; //the current question (Object)
var events = {
	'data' : [
		{
			'event':'1',
			'year':1
		},
		{
			'event':'2',
			'year':2
		},
		{
			'event':'3',
			'year':3
		},
		{
			'event':'4',
			'year':4
		},
		{
			'event':'5',
			'year':5
		},
		{
			'event':'6',
			'year':6
		}
	]
};

$(document).ready(function(){

	startGame();

});

function checkDates(){
	var i = parseInt($(this).attr('data-index'));
	var currDate = Number($('.question').attr('data-year'));
	var beforeDate = Number($(this).attr('data-year'));
	var afterDate = Number($('[data-index='+(i-1)+']').attr('data-year'));
	
	console.log('data-index', i);
	console.log('beforeDate', beforeDate);
	console.log('afterDate', afterDate);
	console.log('current', currDate);
	
	if( beforeDate < currDate && currDate < afterDate ){
		console.log('right');
		rightMoveBozo( i );
	} else {
		console.log('wrong');
		wrongMoveBozo();
	}
}

function rightMoveBozo( i ){
	timeline.data.splice(i, 0, question);
	refresh(timeline);
	newQuestion();
}

function wrongMoveBozo(){
	alert('Wrong move, Bozo');
	startGame();
}

function startGame(){
	stack = _.shuffle(events.data);
	var starter = stack.pop();

	timeline = {'data':[starter]};
	years.push(starter.year);

	refresh(timeline);
	newQuestion();
}

function refresh(data){
	var events_template = _.template( $( "#timeline_template" ).html() );
	$('.timeline').html(events_template(data));
	$('a.secondary-content').click(function(){
		console.log('click');
		checkDates.call(this);
	});
}

function newQuestion(){
	var trial = stack.pop();

	while (_.contains(years, trial.year)){
		trial = stack.pop();
	}

	question = trial

	$('.question').html(question.event);
	$('.question').attr('data-year', question.year);
}










