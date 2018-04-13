var canvas = document.getElementById('mainGame');
var ctx = canvas.getContext('2d');

//classes
function Board(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = "http://ellisonleao.github.io/clumsy-bird/data/img/bg.png"
    this.score = 0;
    this.music = new Audio();
    this.music.src = "./assets/mario.mp3";

    this.img.onload = function(){
        this.draw();
    }.bind(this);

    this.move = function(){
        this.x--;
        if(this.x < -canvas.width) this.x = 0;
    };

    this.draw = function(){
        this.move();
        ctx.drawImage(this.img, this.x,this.y, this.width,this.height);
        ctx.drawImage(this.img,this.x + canvas.width,this.y,this.width,this.height);
    };
    this.drawScore = function(){
        this.score = Math.floor(frames / 60);
        ctx.font = "50px Avenir";
        ctx.fillStyle = "orange";
        ctx.fillText(this.score,this.width/2, this.y+50);
    };
} //end of Board

//flappy
function Flappy(){
    this.x = 150;
    this.y = 150;
    this.width = 50;
    this.height = 50;
    this.img = new Image();
    this.img.src = "https://lh3.googleusercontent.com/k6c5BYhnp-C9e3tROiI9twKZp6bYKLPtR06V4jZ8KnsrkpDTMAF4duTtTTh0eq4uIPSiYfzw-_68ELOn_71c7g=s400";

    this.img.onload = function(){
        this.draw();
    }.bind(this);
    this.draw = function(){
        //bliss hack por huevon
        this.y += 1;
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
        //esto es una validación
        if(this.y < 0 || this.y > canvas.height - this.height) gameOver();
    };

    this.move = function(){
       this.y -= 50;
    };

    this.isTouching = function(pipe){
return (this.x < pipe.x + pipe.width) &&
       (this.x + this.width > pipe.x) &&
       (this.y < pipe.y + pipe.height) &&
       (this.y + this.height > pipe.y);
    };
}

//pipes
function Pipe(y, height) {
    this.x = canvas.width; //cambia esto
    this.y = y;
    this.width = 50;
    this.height = height;

    this.draw = function(){
        this.x--;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}

//declaraciones
var board = new Board();
var flappy = new Flappy();
var pipes = [];

var intervalo;
var frames = 0;

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


//listeners (observadores)

//comienza el juego
document.getElementById('pauseButton')
    .addEventListener('click', stop);

addEventListener('keydown', function(e){
    if(e.keyCode === 32){
        flappy.move();
    }
    if(e.keyCode === 82){
        start();
    }
});