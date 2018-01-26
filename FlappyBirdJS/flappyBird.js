var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var fourk = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

//variables
var gap = 85;
var constant;

var bx = 10;
var by = 150;
var gravity = 1;

//keydown

document.addEventListener('keydown', moveUp);

function moveUp(){
	by -= 20;
}

//pipe coordinates
var pipe = [];

pipe[0] = {
	x: cvs.width,
	y: 0
}


// //draw images
function draw(){
	ctx.drawImage(bg,0,0);


	for(var i = 0; i < pipe.length; i++){
		ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

		//moves pipes to the left
		pipe[i].x--;
	}

	ctx.drawImage(fg,0, cvs.height - fg.height);
	ctx.drawImage(bird, bx, by);
	by += gravity;
	requestAnimationFrame(draw);
}

window.onload = function(){
	constant = pipeNorth.height + gap;
	console.log(constant)
	draw();
}
