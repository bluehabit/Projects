
var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
var gap = 85;   
var pipeSpacing = 135;
var gravity = 1.75;
var pipe = [];
var h3 = document.querySelector('h3');
var score = 0;

//array of pipe objects
pipe[0]={
	dx: cvs.width,
	dy: 0,
	width: 52,
	height: 242
}

//image
var bg = new Image(),
fg = new Image(),
bird = new Image(),
pipeNorth = new Image();
pipeSouth = new Image();

bird.dx = 50;
bird.dy = 50;

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

function animate(){
	requestAnimationFrame(animate);
	ctx.save();
	ctx.drawImage(bg,0,0);
	ctx.drawImage(bird, bird.dx, bird.dy);

	bird.dy += gravity;

	// border(pipe[0]);
	border(bird);  	
	
	for(var i = 0; i < pipe.length; i++){
		ctx.drawImage(pipeNorth, pipe[i].dx, pipe[i].dy);
		ctx.drawImage(pipeSouth, pipe[i].dx, pipe[i].dy + gap);

		//!!!!!!!!!
		//hard coded pipe south coordinate border,
		//make it dynamic tomorrow
		ctx.strokeStyle = "red";
		ctx.lineWidth = 2;
		ctx.strokeRect(pipe[i].dx, pipe[i].dy + gap, pipeSouth.width, pipeSouth.height);


		border(pipe[i])
		pipe[i].dx--;

		//create new pipe
		if(pipe[i].dx === 240){
			pipe.push({dx: cvs.width + pipeSpacing, dy: Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height, width: 52, height: 242});
		}

		//if bird hits foreground, reload
		//cvs.height - fg.height is where the goreground is,
		//so we add + bird.height so if the bottom of the birds
		//hitbox touches the ground restart
		if(bird.dy >= cvs.height - (fg.height + bird.height)){
			// location.reload();
		}

		//increase score if pipe x value is 0
		if(pipe[i].dx === 0){
			score++; 
			console.log(score)
		}

		//remove offscreen pipes from array
		if(pipe[i].dx <= -55){
			pipe.splice(pipe[i], 1);
		}

		if(collideNorthPipe(pipe[i], bird) || collideSouthPipe(pipe[i], bird)){
			console.log('hit');
			// location.reload();
			ctx.fillStyle = 'red';
			ctx.fillRect(bird.dx, bird.dy, bird.width, bird.height);
		}
	}
        
	ctx.drawImage(fg,0,cvs.height - fg.height);

	ctx.restore();
	ctx.fillStyle = "black ";
	ctx.font = '30px Arial';
	ctx.strokeText('Score: ' + score,10,475);
}

window.onload = function(){
	gap += pipeNorth.height;
	console.log(gap)
	animate();
}


function collideNorthPipe(pipe, bird){
   return (pipe.dx <= bird.dx + bird.width &&
   	      pipe.dy <= bird.height + bird.dy &&
   		  pipe.dy+ pipe.height >= bird.dy &&
          pipe.dx + pipe.width >= bird.dx)
}

function collideSouthPipe(pipe, bird){
   return (pipe.dx <= bird.dx + bird.width &&
   	      pipe.dy + gap <= bird.height + bird.dy &&
   		  pipe.dy + gap + pipe.height >= bird.dy &&
          pipe.dx + pipe.width >= bird.dx)
}


function border(obj){
	ctx.strokeStyle = "red";
	ctx.lineWidth = 2;
	ctx.strokeRect(obj.dx, obj.dy, obj.width, obj.height);
}

//function to remove first most pipe in array
