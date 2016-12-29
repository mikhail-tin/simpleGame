window.onload = init;

var reqestAnimFrame = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oReqestAnimationFrame;

var map, ctxMap, ufo, ctxUfo, player, enemies, isPlaying, rocket, ctxRocket,lvl = 1, spawnInterval;

var bg = new Image();
bg.src = "img/bg.jpg"
var tiles = new Image();
tiles.src = "img/ufo.png"

var timeForBurn = 30;

function init() {
	map = document.getElementById("map");
	map.width = gameWidth;
	map.height = gameHeight;
	ctxMap = map.getContext("2d");

	ufo = document.getElementById("ufo");
	ufo.width = gameWidth;
	ufo.height = gameHeight;
	ctxUfo = ufo.getContext("2d");

	rocket = document.getElementById("enemy");
	rocket.width = gameWidth;
	rocket.height = gameHeight;
	ctxRocket = ufo.getContext("2d");

	player = new Player(10, 100);
	enemies = [];

	startLoop();

	document.addEventListener("keydown", checkKeyDown, false);
	document.addEventListener("keyup", checkKeyUp, false);
}

function startLoop() {
	isPlaying = true;
	loop();
	startCreatingEnemies();
}

function stopLoop() {
	isPlaying = false;
}

function loop() {
	if (!isPlaying) {
		return;
	}

	draw();
	update();
	reqestAnimFrame(loop);
}

function draw() {
	player.draw();
	for(var i=0; i < enemies.length; i++){
		enemies[i].draw();
	}
	drawBg();
}

function update() {
	player.update();
	for(var i=0; i < enemies.length; i++){
		enemies[i].update();
	}
}

function startCreatingEnemies(){
	clearInterval(spawnInterval);
	spawnInterval = setInterval(function(){spawnEnemy(spawnAmount)}, spawnTime);
}

function drawBg() {
	ctxMap.drawImage(bg, 0, 0, 800, 500, 0, 0, gameWidth, gameHeight)
}

function spawnEnemy(count){
	for(var i=0; i <= count + lvl; i++){
		enemies.push(new Enemy(lvl));
	}
	lvl++;
}

function checkKeyDown(e){
	var keyID = e.keyCode || e.which;

	if(keyID == 38){
		player.isUp = true;
		e.preventDefault;
	}
	if(keyID == 40){
		player.isDown = true;
		e.preventDefault;
	}
	if(keyID == 37){
		player.isLeft = true;
		e.preventDefault;
	}
	if(keyID == 39){
		player.isRight = true;
		e.preventDefault;
	}
}

function checkKeyUp(e){
	var keyID = e.keyCode || e.which;

	if(keyID == 38){
		player.isUp = false;
		e.preventDefault;
	}
	if(keyID == 40){
		player.isDown = false;
		e.preventDefault;
	}
	if(keyID == 37){
		player.isLeft = false;
		e.preventDefault;
	}
	if(keyID == 39){
		player.isRight = false;
		e.preventDefault;
	}
}

