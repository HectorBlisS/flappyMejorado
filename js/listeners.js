
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