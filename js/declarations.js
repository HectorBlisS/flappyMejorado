var canvas = document.getElementById('mainGame');
var ctx = canvas.getContext('2d');

//declaraciones
var board = new Board();
var flappy = new Flappy();
var pipes = [];

var intervalo;
var frames = 0;

