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

