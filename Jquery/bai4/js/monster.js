$(document).ready(function(){
	var speed = 700;
	var score = 0;
	var highScore = 0;
	var star_number = 3;
	var run = true;
	var end = false;
	var boomGame = 3;
	var blood_number = 0;
	var level= 1;
	const PAUSE = "Pause Game";
	const GAMEOVER = "Game Over";
	const srcBlood = "images/blood.png";
// save storge the highscore
	if(sessionStorage.getItem("highScore") == null) {
		sessionStorage.setItem("highScore",0);
	} else {
		highScore = sessionStorage.getItem("highScore");
	}
// get motion animation
	var monster1 = {  startX: 0, startY: 0, stopX: 200, stopY: 200 };
	var monster2 = {  startX: 200, startY: 0, stopX: 300, stopY: 200 };
	var monster3 = {  startX: 300, startY: 0, stopX: 400, stopY: 200 };
	var monster4 = {  startX: 0, startY: 200, stopX: 200, stopY: 300 };
	var monster5 = {  startX: 400, startY: 200, stopX: 400, stopY: 300 };
	var monster6 = {  startX: 0,startY: 400, stopX: 200,stopY: 400 };
	var monster7 = {  startX: 200, startY: 400, stopX: 200, stopY: 300 };
	var monster8 = {  startX: 400, startY: 400, stopX: 300, stopY: 300 };
	var monst1 = $("#monst1");
	var monst2 = $("#monst2");
	var monst3 = $("#monst3");
	var monst4 = $("#monst4");
	var monst5 = $("#monst5");
	var monst6 = $("#monst6");
	var monst7 = $("#monst7");
	var monst8 = $("#monst8");
function clickMonster(monster) {
	if(run) {
		monster.finish();
		score += 10;
		star_number++;
		updateScore();
		updateStar();
		increaseLevel();
	}
}
function setStart(monster, offsetMonster) {
	monster.css({
		"left" : offsetMonster.startX,
		"top" : offsetMonster.startY
	});
	if(monster != monst1) {
		monster.hide();
	}
}
function increaseLevel() {
	var oldLevel = level;
	if(score % 100 == 0) {
		level++;
	}
	if(oldLevel > level) {
		level = oldLevel;
	} else if(level > oldLevel) {
		speed += 20;
	}
}
function updateScore() {
	$("#scoreValue").html(score);
}
function updateHighScore() {
	sessionStorage.setItem("highScore", highScore);
}
function getHignScore(){
	return sessionStorage.getItem("highScoreValue");
}
function updateBoom() {
	$("#boomGame").html("<span>"+ boomGame + "</span>");
}
function updateStar() {
	if(star_number >=0){
		$("#starGame").html("<span>" + star_number + "</span>");
	}
	if(star_number < 0){
		stopMonster();
		$("#notify").html(GAMEOVER);
		if(highScore < score) {
			highScore = score;
			updateHighScore();
		}
		$("#notify").append("<br><h6>High score: " + highScore + "</h6>");
		run = false;
		end = true;		
	}
}
$("#boomGame").click (function(){
	if(boomGame>0)
		boomGame--;
		updateBoom();
		killMonster();
});
function stopMonster() {
	if(monst1.is(":visible")) {
		monst1.pause();
	}
	if(monst2.is(":visible")) {
		monst2.pause();
	}
	if(monst3.is(":visible")) {
		monst3.pause();
	}
	if(monst4.is(":visible")) {
		monst4.pause();
	}
	if(monst5.is(":visible")) {
		monst5.pause();
	}
	if(monst6.is(":visible")) {
		monst6.pause();
	}
	if(monst7.is(":visible")) {
		monst7.pause();
	}
	if(monst8.is(":visible")) {
		monst8.pause();
	}
}
function killMonster() { //
	var sum = 0;
	if(monst1.is(":visible")) {
		var localMonster = monst1.position();
		setBlood(localMonster.left + 50, localMonster.top + 50);
		setTimeout(function() {
			monst1.finish();
		},1);
		sum++;
	}
	if(monst2.is(":visible")) {
		var localMonster = monst2.position();
		setBlood(localMonster.left + 50, localMonster.top + 50);
		setTimeout(function() {
			monst2.finish();
		},1);
		sum++;
	}
	if(monst3.is(":visible")) {
		var localMonster = monst3.position();
		setBlood(localMonster.left + 50, localMonster.top + 50);
		setTimeout(function() {
			monst3.finish();
		},1);
		sum++;
	}
	if(monst4.is(":visible")) {
		var localMonster = monst4.position();
		setBlood(localMonster.left + 50, localMonster.top + 50);
		setTimeout(function() {
			monst4.finish();
		},1);
		sum++;
	}
	if(monst5.is(":visible")) {
		var localMonster = monst5.position();
		setBlood(localMonster.left + 50, localMonster.top + 50);
		setTimeout(function() {
			monst5.finish();
		},1);
		sum++;
	}
	if(monst6.is(":visible")) {
		var localMonster = monst6.position();
		setBlood(localMonster.left + 50, localMonster.top + 50);
		setTimeout(function() {
			monst6.finish();
		},1);
		sum++;
	}
	if(monst7.is(":visible")) {
		var localMonster = monst7.position();
		setBlood(localMonster.left + 50, localMonster.top + 50);
		setTimeout(function() {
			monst7.finish();
		},1);
		sum++;
	}
	if(monst8.is(":visible")) {
		var localMonster = monst8.position();
		setBlood(localMonster.left + 50, localMonster.top + 50);
		setTimeout(function() {
			monst8.finish();
		},1);
		sum++;
	}
	score += (2 * sum);
	updateScore();
	updateHighScore();
}
function getHighScore() {
	return sessionStorage.getItem("highScore");
}
function resumeMonster() {
	if(monst1.is(":visible")) {
		monst1.resume();
	}
	if(monst2.is(":visible")) {
		monst2.resume();
	}
	if(monst3.is(":visible")) {
		monst3.resume();
	}
	if(monst4.is(":visible")) {
		monst4.resume();
	}
	if(monst5.is(":visible")) {
		monst5.resume();
	}
	if(monst6.is(":visible")) {
		monst6.resume();
	}
	if(monst7.is(":visible")) {
		monst7.resume();
	}
	if(monst8.is(":visible")) {
		monst8.resume();
	}
}
function delBlood(){
		for(i = 1; i <= blood_number; i++) {
			$("#bloodMonster" + i).slice(0,1);
		}	
}
function setBlood(x, y) {
	if(run) {
		blood_number++;
		if(blood_number > 5) {
			$("#bloodMonster" + (blood_number - 5)).hide();	
		}
		$("<img id='bloodMonster" + blood_number +"' src='" + srcBlood + "'>").insertBefore("#monst1");
		$("#bloodMonster" + blood_number).css({
			"position" : "absolute",
			"left" : (x - 50) + "px",
			"top" : (y - 50) + "px"
		});

	}
}
function startAllMonster(){
	setStart(monst1,monster1);
	setStart(monst2,monster2);
	setStart(monst3,monster3);
	setStart(monst4,monster4);
	setStart(monst5,monster5);
	setStart(monst6,monster6);
	setStart(monst7,monster7);
	setStart(monst8,monster8);
}
function countHideMonster(){
	var d = 0;
	if(monst1.is(":visible")) {
		d++;
	}
	if(monst2.is(":visible")) {
		d++;
	}
	if(monst3.is(":visible")) {
		d++;
	}
	if(monst4.is(":visible")) {
		d++;
	}
	if(monst5.is(":visible")) {
		d++;
	}
	if(monst6.is(":visible")) {
		d++;
	}
	if(monst7.is(":visible")) {
		d++;
	}
	if(monst8.is(":visible")) {
		d++;
	}
	return d;
}
function randomMonster(){
	var random = Math.floor((Math.random() * 8)+1);
	switch(random) {
		case 1:
		if(!monst1.is(":visible")) {
			monst1.show();
			motionMonster(monst1, monster1);
		}
		break;
		case 2:
		if(!monst2.is(":visible")) {
			monst2.show();
			motionMonster(monst2, monster2);
		}
		break;
		case 3:
		if(!monst3.is(":visible")) {
			monst3.show();
			motionMonster(monst3, monster3);
		}
		break;
		case 4:
		if(!monst4.is(":visible")) {
			monst4.show();
			motionMonster(monst4, monster4);
		}
		break;
		case 5:
		if(!monst5.is(":visible")) {
			monst5.show();
			motionMonster(monst5, monster5);
		}
		break;
		case 6:
		if(!monst6.is(":visible")) {
			monst6.show();
			motionMonster(monst6, monster6);
		}
		break;
		case 7:
		if(!monst7.is(":visible")) {
			monst7.show();
			motionMonster(monst7, monster7);
		}
		break;
		case 8:
		if(!monst8.is(":visible")) {
			monst8.show();
			motionMonster(monst8, monster8);
		}
		break;
	}	
}
function motionMonster(monster, offsetMonster) {
	if(run) {
		monster.animate({
			"left" : offsetMonster.stopX,
			"top" : offsetMonster.stopY,
		}, speed, function() {
			monster.animate({
				"left" :offsetMonster.startX,
				"top" : offsetMonster.startY
			}, speed, function() {
				var monster_number = countHideMonster();
				monster.hide();
				while(monster_number <= level) {
					randomMonster();
					monster_number++;
				}
			});
		});
	}
}
function restart() {
	hideMonster();
	$("#notify").hide();
	speed = 700;
	score = 0;
	level = 1;
	blood_number = 0;
	updateScore();
	boomGame = 3;
	updateBoom();
	star_number = 3;
	updateStar();
	run = true;
	startAllMonster();
	monst1.show();
	motionMonster(monst1, monster1);
}
function hideMonster() {
	run = false;
	if(monst1.is(":visible")){
		monst1.stop();
		monst1.hide();
	}
	if(monst2.is(":visible")){
		monst2.stop();
		monst1.hide();
	}
	if(monst3.is(":visible")){
		monst3.stop();
		monst1.hide();
	}
	if(monst4.is(":visible")){
		monst4.stop();
		monst1.hide();
	}
	if(monst5.is(":visible")){
		monst5.stop();
		monst1.hide();
	}
	if(monst6.is(":visible")){
		monst6.stop();
		monst1.hide();
	}
	if(monst7.is(":visible")){
		monst7.stop();
		monst1.hide();
	}
	if(monst8.is(":visible")){
		monst8.stop();
		monst1.hide();
	}
}
$("#pauseGame").click(function(){
	if(run && !end){
		stopMonster();
		$("#notify").html(PAUSE);
		$("#notify").show();
	}
	if(!run && !end){
		resumeMonster();
		$("#notify").hide();
	}
	run = !run;
});
$("#resetGame").click(function(){
	restart();
});
$("#backgroundGame").click(function() {
	if(run) {
		star_number--;
		updateScore();
		updateStar();
	}
});
$("#boomGame").click(function(){
	if(boomGame == 4) {
		boomGame--;
		updateBoom();
		killMonster();
	}
});
var offset = $("#backgroundGame").offset();
monst1.click(function(e) {
	clickMonster(monst1);
	var locaX = e.pageX - offset.left;
	var locaY = e.pageY - offset.top;
	setBlood(locaX, locaY);
});
monst2.click(function(e) {
	clickMonster(monst2);
	var locaX = e.pageX - offset.left;
	var locaY = e.pageY - offset.top;
	setBlood(locaX, locaY);
});
monst3.click(function(e) {
	clickMonster(monst3);
	var locaX = e.pageX - offset.left;
	var locaY = e.pageY - offset.top;
	setBlood(locaX, locaY);
});
monst4.click(function(e) {
	clickMonster(monst4);
	var locaX = e.pageX - offset.left;
	var locaY = e.pageY - offset.top;
	setBlood(locaX, locaY);
});
monst5.click(function(e) {
	clickMonster(monst5);
	var locaX = e.pageX - offset.left;
	var locaY = e.pageY - offset.top;
	setBlood(locaX, locaY);
});
monst6.click(function(e) {
	clickMonster(monst6);
	var locaX = e.pageX - offset.left;
	var locaY = e.pageY - offset.top;
	setBlood(locaX, locaY);
});
monst7.click(function(e) {
	clickMonster(monst7);
	var locaX = e.pageX - offset.left;
	var locaY = e.pageY - offset.top;
	setBlood(locaX, locaY);
});
monst8.click(function(e) {
	clickMonster(monst8);
	var locaX = e.pageX - offset.left;
	var locaY = e.pageY - offset.top;	
	setBlood(locaX, locaY);
});
updateHighScore();
startAllMonster();
motionMonster(monst1, monster1);
});
