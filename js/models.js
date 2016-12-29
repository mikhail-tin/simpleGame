//----Player
function Player(speed, health) {
	this.srcX = 0;
	this.srcY = 0;
    this.srcXinMove = 150;
	this.drawX = 0;
	this.drawY = 0;
	this.width = sizeForUfo;
	this.height = sizeForUfo;
	this.speed = speed;
    this.isUp = false;
    this.isDown = false;
    this.isRight = false;
    this.isLeft = false;
    this.health = health;
}

Player.prototype.draw = function () {
	ctxUfo.clearRect(0, 0, gameWidth, gameHeight);
    var x = (this.isUp || this.isDown || this.isRight || this.isLeft) ? this.srcXinMove : this.srcX;
	ctxUfo.drawImage(tiles, x, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height)
}

Player.prototype.update = function () {
	this.chooseDirection();

    for(var i=0; i < enemies.length; i++){

		if((this.drawX < (enemies[i].drawX+75) && (enemies[i].drawX+75) < (this.drawX + sizeForUfo)) 
        && ((this.drawY < enemies[i].drawY) && (enemies[i].drawY < (this.drawY + sizeForUfo)))){
            this.health -= 50;
            enemies[i].destroy();
        }
	}

    if(this.health === 50){
        this.srcX = 300;
        this.srcXinMove = 450;
    }

    if(this.health <= 0){
        this.srcX = 0;
        this.srcY = 300;
        timeForBurn --;
        if(timeForBurn < 0){
            this.srcX = -9999;
       }
    }
}

Player.prototype.chooseDirection = function () {
	if(this.isUp){
        this.drawY -= this.speed;
    }
    if(this.isDown){
        this.drawY += this.speed;
    }
    if(this.isRight){
        this.drawX += this.speed;
    }
    if(this.isLeft){
        this.drawX -= this.speed;
    }
}

//----Enemy
function Enemy(lvl) {
	this.srcX = 0;
	this.srcY = 150;
	this.drawX = Math.floor(Math.random() * gameWidth);
	this.drawY = Math.floor(Math.random() * 1000) + gameHeight;
	this.width = sizeForRocket;
	this.height = sizeForRocket;
	this.speed = Math.floor(Math.random()*10)+lvl;
}

Enemy.prototype.draw = function () {
	ctxRocket.drawImage(tiles, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height)
}

Enemy.prototype.update = function () {
	this.drawY -= this.speed;
	
    if(this.drawY < -sizeForRocket){
            this.destroy();
	}
}

Enemy.prototype.destroy = function () {
	enemies.splice(enemies.indexOf(this), 1);
}