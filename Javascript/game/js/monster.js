window.onload = function(){
	
    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext('2d');
    ballRadius = 10;
    x = canvas.width/2;
    y = canvas.height/2;
    dx = 2;
    dy = -2;
	character = [];
	nCharacter = 9;
	
	requestAnimFrame = 
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame;

    star = 3;
	imgCharacter = new Image();
	imgCharacter.src = 'images/monster.png';

	imgBoss = new Image();
	imgBoss.src = 'images/boss.png';

	imgHeart = new Image();
	imgHeart.src = 'images/heart.png';

	imgBoom = new Image();
	imgBoom.src = 'images/boom.png';

	imgPause = new Image();
	imgPause.src = 'images/pause.png';

	imgBackground = new Image();
	imgBackground.src = 'images/background.jpg';

	imgBottom = new Image();
	imgBottom.src = 'images/bottom.jpg';

	imgReset = new Image();
	imgReset.src = 'images/reset.png';

}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
       if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    y += dy;
}

setInterval(draw, 10);