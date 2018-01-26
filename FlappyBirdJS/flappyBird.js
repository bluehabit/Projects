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

// //draw images
function draw(){
	ctx.drawImage(bg,0,0);
	ctx.drawImage(pipeNorth, 100, 0);
	ctx.drawImage(pipeSouth,100, 0 + constant);
}

window.onload = function(){
	constant = pipeNorth.height + gap;
	console.log(constant)
	draw();
}
