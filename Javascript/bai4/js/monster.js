window.onload = function(){

	content = document.getElementById("canvas_content");
	context = content.getContext("2d");
	
	footer = document.getElementById("canvas_footer");
	contextFooter = footer.getContext("2d");
	speed = 1;
	score = 0;
	highscore = 0;
	star_number = 2;
	monster_number = 1;
	run = true;
	end = false;
	boom_number = 3;
	blood_list = [];
	windows = window;
	
	requestAnimationFrame = windows.requestAnimationFrame ||
							windows.webkitRequestAnimationFrame ||
							windows.msRequestAnimationFrame ||
							windows.oRequestAnimationFrame ||
							windows.mozRequestAnimationFrame;
							
	var runRequestAnimation;



// save storge the highscore
	if(sessionStorage.getItem("highscore") == null) {
		sessionStorage.setItem("highscore",0);
	} else {
		highScore = sessionStorage.getItem("highscore");
	}
	
	background = new Image();
	background_ready = false;
	background.onload = function() {
	background_ready = true;
}
	background.src = "images/background.jpg";

//get image footer
	footer_image = new Image();
	footer_ready = true;
	footer_image.onload = function() {

}
	footer_image.src = "images/footer.png";
//get image monster

	monster = new Image();
	monster_ready = false;
	monster.onload = function() {
	monster_ready = true;	
}
monster.src = "images/monster2.png";

//get image star
	star = new Image();
	star_ready = false;
	star.onload = function() {
	star_ready = true;
}
star.src = "images/star.png";	

// get image boom

	boom = new Image();
	boom_ready = false;
	boom.onload = function() {
	boom_ready = true;
}
	boom.src = "images/boom.jpg";

//get image blood
	blood = new Image();
	blood_ready = false;
	blood.onload = function() {
	blood_ready = true;
}
blood.src = "images/blood.png";

// get image pause
	pause = new Image();
	pause_ready = false;
	pause.onload = function() {
	pause_ready = true;
}
	pause.src = "images/pause1.png";

//get image reset
	reset = new Image();
	reset_ready = false;
	reset.onload = function() {
	reset_ready = true;
}
	reset.src = "images/restart.png";
	
	pauseContent = new Image();
	pauseContent.src = "images/pause1.png";
	
// get motion animation

	monster1 = { beginX: 0, beginY: 0, endX: 100, endY: 100, startX: 0, startY: 0, stopX: 100, stopY: 100,
				 speed: speed, click: false, show: true, dieX: 0, dieY:0
}
	monster2 = { beginX: 190, beginY: 0, endX: 190, endY: 70, startX: 190, startY: 0, stopX: 190, stopY: 70,
				 speed: speed,click: false,show: false,dieX: 0,dieY:0
}
	monster3 = { beginX: 390, beginY: 0, endX: 280, endY: 80, startX: 390, startY: 0, stopX: 280, stopY: 80,
				 speed: speed, click: false, show: false, dieX: 0, dieY:0
}
	monster4 = { beginX: 390,beginY: 170, endX: 290, endY: 150, startX: 390, startY: 180, stopX: 290, stopY: 150,
				 speed: speed, click: false, show: false, dieX: 0, dieY:0
}
	monster5 = { beginX: 390, beginY: 390, endX: 280, endY: 280, startX: 390, startY: 390, stopX: 280, stopY: 280,
				 speed: speed, click: false, show: false, dieX: 0, dieY:0
}
	monster6 = { beginX: 170,beginY: 390,endX: 170,endY: 300,startX: 170,startY: 390, stopX: 170,stopY: 300,
				 speed: speed, click: false, show: false, dieX: 0, dieY:0
}
	monster7 = { beginX: 0, beginY: 390, endX: 110, endY: 280, startX: 0, startY: 390, stopX: 110, stopY: 280,
			     speed: speed, click: false, show: false, dieX: 0, dieY:0
}
	monster8 = { beginX: 0, beginY: 170, endX: 90, endY: 170, startX: 0, startY: 170, stopX: 90, stopY: 170,
				 speed: speed, click: false, show: false, dieX: 0, dieY:0
}

// get blood while monster die

function monsterDie(x,y){
	bloodDie = {x:x, y:y};
	blood_list[blood_list.length] = bloodDie;
	if(blood_list.length > 8){
		blood_list.splice(0,1);
	}
}

// draw game display

function drawMotion() {
	if(background_ready){
		context.drawImage(background,0,0);
	}

// draw blood vector(x,y)

	if(blood_ready){
	for(var i = 0; i < blood_list.length; i++)
		if(blood_list.length > 0) {
			context.drawImage(blood, blood_list[i].x, blood_list[i].y, 80, 80);
		}
	}

// draw monster vector(x,y)
	
	if(monster_ready) {
		if(monster1.show) {
			context.drawImage(monster, monster1.startX, monster1.startY, 80, 80);
		}
		if(monster2.show) {
			context.drawImage(monster,monster2.startX, monster2.startY, 80, 80);
		}
		if(monster3.show) {
			context.drawImage(monster, monster3.startX, monster3.startY, 80, 80);
		}
		if(monster4.show) {
			context.drawImage(monster, monster4.startX, monster4.startY, 80, 80);
		}
		if(monster5.show) {
			context.drawImage(monster, monster5.startX, monster5.startY, 80, 80);
		}
		if(monster6.show) {
			context.drawImage(monster, monster6.startX, monster6.startY, 80, 80);
		}
		if(monster7.show) {
			context.drawImage(monster, monster7.startX, monster7.startY, 80, 80);
		}
		if(monster8.show) {
			context.drawImage(monster, monster8.startX, monster8.startY, 80, 80);
		}
	}
	
// draw footer
	
	if(footer_ready){ 
		contextFooter.drawImage(footer_image,0,0,500,130);
	}
	
// draw pause in footer

	if(pause_ready){
		contextFooter.drawImage(pause, 20, 15, 50, 50);
	}
	if(boom_ready){
		var b = 462;
		for(var z=0 ; z<boom_number ;z++){
		    context.drawImage(boom,b,0,40,40);	
		}
	}

// draw reset in footer

	if(reset_ready){ 
		contextFooter.drawImage(reset, 90, 15, 50, 50);	
	}

// draw star in footer
	if(star_ready){
		var h = 20;
		for(var i = 0; i <= star_number; i++){
			contextFooter.drawImage(star, h, 80, 48, 48);
			h += 50;
		}
	}

// draw highScore
	contextFooter.beginPath();
	contextFooter.fillStyle = "white";
	contextFooter.rect(320, 45, 150, 30);
	contextFooter.fill();
	contextFooter.closePath();
	contextFooter.beginPath();
	contextFooter.fillStyle = "blue"
	contextFooter.font = "bold 20px Arial";
	contextFooter.fillText("Highscore: " + highscore, 325, 67);
	
//draw score
	
	contextFooter.beginPath();
	contextFooter.fillStyle = "white";
	contextFooter.rect(320, 6, 150, 30);
	contextFooter.fill();
	contextFooter.closePath();
	contextFooter.beginPath();
	contextFooter.fillStyle = "blue";
	contextFooter.font = "bold 20px Arial";
	contextFooter.fillText("Score: " + score, 325, 28);
// while pause game , can't run boom, pause
	if(!run && end){
			boom_ready = false;
			pause_ready = false;
	}
}

// refresh monster

function refresh(monster) {
	monster.show = false;
	monster.startX = monster.beginX;
	monster.stopX = monster.endX;
	monster.startY = monster.beginY;
	monster.stopY = monster.endY;
	monster.speed = speed;
}

// random display monster
function random(){
	if(!monster1.show) {
		refresh(monster1);
	}
	if(!monster2.show) {
		refresh(monster2);
	}
	if(!monster3.show){
		refresh(monster3);
	}
	if(!monster4.show){
		refresh(monster4);
	}
	if(!monster5.show){
		refresh(monster5);
	}
	if(!monster6.show){
		refresh(monster6);
	}
	if(!monster7.show){
		refresh(monster7);
	}
	if(!monster8.show){
		refresh(monster8);
	}
	
	var abc = Math.floor((Math.random()*8)+1);
	switch (abc){
		case 1: 
			if(!monster1.show){
			monster1.show = true;
		}
			break;
		case 2: 
			if(!monster2.show){
			monster2.show = true;
		}
			break;
		case 3: if(!monster3.show){
			monster3.show = true;
		}
			break;
		case 4: if(!monster4.show){
			monster4.show = true;
		}
			break;
		case 5: if(!monster5.show){
			monster5.show = true;
		}
			break;
		case 6: if(!monster6.show){
			monster6.show = true;
		}
			break;
		case 7: if(!monster7.show){
			monster7.show = true;
		}
			break;
		case 8: if(!monster8.show){
			monster8.show= true;
		}
			break;
	} 
}

// update monster while kill

function updateMonster(monster){
	monster.click = true;
	if(monster.startX > monster.stopX){
			monster.startX -= monster.speed;
	} else if(monster.startX < monster.stopY) {
			monster.startX += monster.speed;
	}
	
	if(monster.startY > monster.stopY){
			monster.startY-= monster.speed;
	} else if(monster.startY < monster.stopY) {
			monster.startY+= monster.speed;
	}
	
	if(monster.startX == monster.stopX && monster.startY == monster.stopY){
		monster.startX = monster.stopX;
		monster.startY = monster.stopY;
		monster.stopX = monster.beginX;
		monster.stopY = monster.beginY;
	}
	if(monster.startX == monster.beginX && monster.startY == monster.beginY){
		monster.show = false;
		monster.stop = true;
		monster.startX = monster.beginX;
		monster.stopX = monster.endX;
		monster.startY = monster.beginY;
		monster.stopY = monster.endY;
		star_number--;
		random();
	}
}

//use case get level in game

function getLevel(){
	
	var level = Math.floor(score/100);
	switch(level){
		case 1: speed = 1;
				monster_number = 2;
				break;
		case 2: speed = 1;
				monster_number = 4;
				break;
		case 3: speed = 1;
				monster_number = 6;
				break;
		case 4: speed = 2;
				monster_number = 8;
				break;
		case 5: speed = 2;
				monster_number = 4;
				break;
		case 6: speed = 2;
				monster_number = 6;
				break;
		case 7: speed = 2;
				monster_number = 8;
				break;
	}
}

// get reset

function restart(){
	refresh(monster1);
	refresh(monster2);
	refresh(monster3);
	refresh(monster4);
	refresh(monster5);
	refresh(monster6);
	refresh(monster7);
	refresh(monster8);
	level= 1;
	speed = 1;
	score = 0;
	star_number = 2;
	monster_number = 1;
	run = true;
	end = false;
	boom_number = 3;
	boom_ready = true;
	pause_ready = true;
	highScore = sessionStorage.getItem("highscore"); // save highScore while reset
	blood_list = [];
	console.log("BLOOD : " + blood_list.length);
	monster1.show = true;
	main();
}

// get monster after kill

function clickMonster(monster, x, y) {
	if(monster.click) {
		if(x >= monster.startX && x <= monster.startX + 110 && y >= monster.startY && y <= monster.startY + 110 ) {
			score += 10;
			star_number++;
			monster.click = false;
			monster.show = false;
			monster.dieX = monster.startX;
			monster.dieY = monster.startY;
			monster.stopX = monster.endX;
			monster.stopY = monster.endY;
			for(var i = 0; i < monster_number; i++)
			{
				random();
				monsterDie(monster.dieX,monster.dieY);
			}	
		}
	}
}
// get click monster

content.addEventListener("click", function(e) {
	locaX = e.pageX - this.offsetLeft;
	locaY = e.pageY - this.offsetTop;
	star_number--;
	if(monster1.show) {
		clickMonster(monster1, locaX, locaY);
	}
	if(monster2.show) {
		clickMonster(monster2, locaX, locaY);
	}
	if(monster3.show) {
		clickMonster(monster3, locaX, locaY);
	}
	if(monster4.show) {
		clickMonster(monster4, locaX, locaY);
	}
	if(monster5.show) {
		clickMonster(monster5, locaX, locaY);
	}
	if(monster6.show) {
		clickMonster(monster6, locaX, locaY);
	}
	if(monster7.show) {
		clickMonster(monster7, locaX, locaY);
	}
	if(monster8.show) {
		clickMonster(monster8, locaX, locaY);
	}

	if((locaY > 0 && locaY < 40) &&  (locaX > 454 && locaX < 494)) {
	
	if ((locaY > 0 && locaY < 40) &&  (locaX > 454 && locaX < 494)) {
		star_number++;
		getBoom();
		}
},true);

// get click boom

function getBoom(){
	if(boom_ready){
		//console.log("BOOM");
		boom_number--;
		executeActionBoom();
		}
		if(boom_number==0){
			boom_ready = false;
		}
	}

// get point after use boom

function executeActionBoom (monster) {
	if(monster1.show){
		score += 5;
		monster1.show = false;
		monster1.click = false;
		monsterDie(monster1.startX, monster1.startY);
	}
	if (monster2.show) {
		score += 5;
		monster2.show = false;
		monster2.click = false;
		monsterDie(monster2.startX, monster2.startY);
	}

	if (monster3.show) {
		score += 5;
		monster3.show = false;
		monster3.click = false;
		monsterDie(monster3.startX, monster3.startY);
	}

	if (monster4.show) {
		score += 5;
		monster4.show = false;
		monster4.click = false;
		monsterDie(monster4.startX, monster4.startY);
	}

	if (monster5.show) {
		score += 5;
		monster5.show = false;
		monster5.click = false;
		monsterDie(monster5.startX, monster5.startY);
	}

	if (monster6.show) {
		score += 5;
		monster6.show = false;
		monster6.click = false;
		monsterDie(monster6.startX, monster6.startY);
	}

	if (monster7.show) {
		score += 5;
		monster7.show = false;
		monster7.click = false;
		monsterDie(monster7.startX, monster7.startY);
	}

	if (monster8.show) {
		score += 5;
		monster8.show = false;
		monster8.click = false;
		monsterDie(monster8.startX, monster8.startY);
	}
	speed = speed;
	drawMotion();
	for (var i = 0; i < monster_number; i++) {
		random();
	}
}

// get click pause, reset function
	
footer.addEventListener("click", function(e) { 
	locaX = e.pageX - this.offsetLeft;
	locaY = e.pageY - this.offsetTop;
	if(pause_ready){
		pauseGame();
	}
	if(locaX > 90 && locaX < 140 && locaY > 15 && locaY < 65) {
		restart();
	}
});

// get pause function
function pauseGame(){
	if(locaX > 20 && locaX < 70 && locaY >= 15 && locaY <= 65){
			if(run) {
			run = false;
			boom_ready = false;
		} else if(!run){
			run = true;
			boom_ready = true;
			main();
		}
}
}

// get main run game
function main() {
	getLevel();
	if (monster1.show) {
		updateMonster(monster1);
	}
	if (monster2.show) {
		updateMonster(monster2);
	}
	if (monster3.show) {
		updateMonster(monster3);
	}
	if (monster4.show) {
		updateMonster(monster4);
	}
	if (monster5.show) {
		updateMonster(monster5);
	}
	if (monster6.show) {
		updateMonster(monster6);
	}
	if (monster7.show) {
		updateMonster(monster7);
	}
	if (monster8.show) {
		updateMonster(monster8);
	}
	if(star_number < 0) {
		run = false;
		end = true;
	}
	drawMotion();
	if(run) {
		runRequestAnimation = requestAnimationFrame(main);
	}
	if(!run){
		if(!end){
		context.drawImage(pauseContent, 175, 175, 150, 150);
	} else if(end){
		if(score > highscore) {
			context.fillStyle = "red";
			context.font = "55px Arial";
			context.fillText("GAME OVER", 90, 265);
			highscore = score;
			sessionStorage.setItem("highscore", score);
			context.fillStyle = "yellow";
			context.font = "30px Arial";
			context.fillText("NEW HIGH SCORE: " + highscore, 95, 295);
		}
	}
	}
}

main();

}


