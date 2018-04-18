//main functions
function update(){
    generatePipes();
    frames++;
    console.log(frames);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    board.draw();
    flappy.draw();
    drawPipes();
    board.drawScore()
    //esto esta bien?
    checkCollition();
}
function start(){
    //si ya esta corriendo return
    if(intervalo > 0) return;
    //extras que necesitemos inicializar
    intervalo = setInterval(function(){
        update();
    }, 1000/60);
    //esto no deberia estar aqui:
    flappy.y = 150;
    pipes = [];
    board.score = 0;
    frames = 0;
    board.music.play();
}

function stop(){
    clearInterval(intervalo);
    intervalo = 0;
    board.music.pause();
}

