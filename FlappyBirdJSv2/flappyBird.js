// var cvs = document.getElementById("canvas");
// var ctx = cvs.getContext("2d");
// ctx.drawImage(image,x,y)
// ctx.translate
// ctx.rotate
// ctx.restore

var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
var gap = 85;   
var constant;
var pipeSpacing = 125;
var gravity = 1.75;
var pipe = [];

//array of pipe objects
pipe[0]={
	dx: cvs.width,
	dy: 0
}

//image
var bg = new Image(),
fg = new Image(),
bird = new Image(),
pipeNorth = new Image();
pipeSouth = new Image();

bird.dx = 50;
bird.dy = 50;
bird.boundary;

cvs.width = 288;
cvs.height = 512;

bg.src = "images/bg.png";
fg.src = "images/fg.png";
bird.src  = "images/bird.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

document.addEventListener('keydown', flap);

function flap(){
	bird.dy -= 29;
}

function draw(){
	ctx.drawImage(bg,0,0);
	
	ctx.drawImage(bird, bird.dx, bird.dy);

	//this pulls the bird down, gravity
	bird.dy += gravity;

	for(var i = 0; i < pipe.length; i++){
		ctx.drawImage(pipeNorth, pipe[i].dx, pipe[i].dy);
		ctx.drawImage(pipeSouth, pipe[i].dx, pipe[i].dy + constant);

		pipe[i].dx--;

		//only one pipe at a time  can ever hit 240, they
		//are not constantly all hitting 240
		if(pipe[i].dx === 240){
			pipe.push({dx: cvs.width + pipeSpacing, dy: Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height});
		}

		//This works but makes pipes flicker for some reason
		// if(pipe[i].dx <= -65){
		// 		pipe.shift();
		// }

		pipeBoundary(pipe[0], bird)

	}
	//dx is always equal to canvass width so it starts from the end of the
	//screen and moves to the right

	// console.log(pipe[0].dx)

	//dy we set to 0 so it starts at the top of the screen           
	ctx.drawImage(fg,0,cvs.height - fg.height);
	requestAnimationFrame(draw);
}

window.onload = function(){
	constant = pipeNorth.height + gap;
	console.log(constant)
	draw();
}

function pipeBoundary(pipe, bird){
	var pipeBoundary = {};
	pipeBoundary.left = pipe.dx;
	pipeBoundary.right = pipe.dx + pipeNorth.width;

	var birdBoundary = {};
	birdBoundary.top = bird.dy;
	birdBoundary.bottom = bird.dy + bird.height;

	if(isBetween(pipeBoundary.left, pipeBoundary.right, birdBoundary.top)){
		console.log('hit')
	}


	// if(isBetween(pipeBoundary.left, pipeBoundary.right, birdBoundary.right)){
	// 	return true;
	// }
	// return false;
	// console.log(pipeBoundary);
}

function isBetween(num1, num2, input){
	if(input >= num1 && input <= num2){
		return true
	}
	return false;
}






// var myPipes = [
// 	{
// 		dx:5,
// 		dy:9
// 	},
// 	{
// 		dx:15,
// 		dy:8
// 	},
// 	{
// 		dx:19,
// 		dy:22
// 	},
// ];

// myPipes.forEach(function(pipe){
// 	console.log(pipe)
// 	console.log(myPipes.indexOf(pipe))
// })
// //0,1,2

// var myArr = [1,2,3]

// function removeOffScreen(pipe){
// 	var pipeIndex;

// 	if(pipe.dx < -52){

// 	}
// }


