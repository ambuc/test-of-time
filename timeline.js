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
	
	// console.log('data-index', i);
	// console.log('beforeDate', beforeDate);
	// console.log('afterDate', afterDate);
	// console.log('current', currDate);
	
	if( beforeDate < currDate && currDate < afterDate ){
		// console.log('right');
		rightMoveBozo( i );
	} else {
		// console.log('wrong');
		wrongMoveBozo();
	}
}

function rightMoveBozo( i ){
	timeline.data.splice(i, 0, question);
	refresh(timeline);
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

function refresh(data){
	var events_template = _.template( $( "#timeline_template" ).html() );

	$('.timeline').html(events_template(data));

	
	$('a.here').click(function(){
		checkDates.call(this);
	});
}

function newQuestion(){
	question = getNewEvent();
	years.push(question.year);

	var question_template = _.template( $( "#question_template" ).html() );

	$('.current').html(question_template(question));}

function getNewEvent(){
	var trial = stack.pop();

	while(_.isUndefined(trial) || _.isNull(trial) || _.contains(years, trial.year)){
		trial = stack.pop();
	}
	return trial;
}

String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return this.length>n ? this.substr(0,n-1)+'&hellip;' : this;
      };
