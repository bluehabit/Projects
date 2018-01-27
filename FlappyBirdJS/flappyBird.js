var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var fourk = new Image();

console.log('hey')

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

//variables
var gap = 85;   
var constant;
var score = 0;

var bx = 10;
var by = 150;
var gravity = 1.5;

//Audio
var fly = new Audio();
var bing = new Audio();

fly.src = "sounds/fly.mp3";
bing.src = "sounds/score.mp3";

//keydown / fly bird
document.addEventListener('keydown', moveUp);

function moveUp(){
	bird.src = "images/flap.png"
	by -= 25;
	fly.play();
}

//pipe, array of objects
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
		//creates more pipes
		if(pipe[i].x === 125){
			//push new pipe object
			pipe.push({
				x: cvs.width,
				y: Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height
			});
		}

		//detect collision w/ pipe and ground
		 if( bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width && 
		 	(by <= pipe[i].y + pipeNorth.height || 
		 	by+bird.height >= pipe[i].y+constant) || 
		 	by + bird.height >=  cvs.height - fg.height){
            location.reload(); // reload the page
        }
     
        //if pass through a pipe increase score
        if(pipe[i].x === 55){
        	score ++;
        	bing.play();
        	console.log(pipe.length)
        }

	}

	ctx.drawImage(fg,0, cvs.height - fg.height);
	ctx.drawImage(bird, bx, by);
	by += gravity;
 	
 	//print score to canvass
	ctx.fillstyle = "#000";
	ctx.font = "20px Verdana";
	ctx.fillText("Score : " + score,10,cvs.height-20);

	requestAnimationFrame(draw);
}

window.onload = function(){
	constant = pipeNorth.height + gap;
	console.log(constant)
	draw();
}
