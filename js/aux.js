//aux functions
function generatePipes(){
    if(!(frames % 300 === 0)) return;
    var ventanita = 150;
    var randomHeight = Math.floor(Math.random() * 200) + 50;
    var pipe = new Pipe(0,randomHeight);
    var pipe2 = new Pipe(randomHeight + ventanita, canvas.height - (randomHeight + ventanita));
    pipes.push(pipe);
    pipes.push(pipe2);
}

function drawPipes(){
    pipes.forEach(function(pipe){
        pipe.draw();
    });
}

function gameOver(){
    stop();
    ctx.font = "120px courier";
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 8;
    ctx.strokeText("Game Over", 50,200);
    ctx.font = "50px Avenir";
    ctx.fillStyle = "black";
    ctx.fillText('press R to start', 50, 300);
}

//funcion de validacion
function checkCollition(){
    pipes.forEach(function(pipe){
     if(flappy.isTouching(pipe)) gameOver();
    });
}

