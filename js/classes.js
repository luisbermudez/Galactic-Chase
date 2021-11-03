class Sprite {
    constructor(x, y, powerOfAttack) {
        this.x = x;
        this.y = y;
        this.diameter = 10;
        this.color = 'rgb(37, 136, 228)';
        this.speedX = 0;
        this.speedY = 0;
        this.powerOfAttack = powerOfAttack;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.diameter, 0, Math.PI*2);
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black'
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    position() {
        this.y += this.speedY;
        this.x += this.speedX;
        if(this.y < this.diameter) this.y = this.diameter;
        if(this.y > canvas.height - this.diameter) this.y = canvas.height - this.diameter;
        if(this.x < this.diameter) this.x = this.diameter;
        if(this.x > canvas.width - this.diameter)this.x = canvas.width - this.diameter;
    }

    attack(enemy) {
        if(overAndReady) {
            enemy.diameter -= this.powerOfAttack;
        }
    }

    overEnemy(enemy) {
        if((
            this.x - this.diameter < enemy.x + enemy.diameter && 
            this.x + this.diameter > enemy.x - enemy.diameter &&
            this.y - this.diameter < enemy.y + enemy.diameter &&
            this.y + this.diameter > enemy.y - enemy.diameter
        )) {
            overAndReady = true;
            this.color = 'rgb(184, 81, 166)'
        } else {
            overAndReady = false;
            this.color = 'rgb(37, 136, 228)';
        }
    }
}

class Enemy {
    constructor(x, y, d, speedMin, speedMax, directionChangeSpeed) {
        this.x = x;
        this.y = y;
        this.diameter = d;
        this.randomX = -2;
        this.randomY = 0;
        this.speedMin = speedMin;
        this.speedMax = speedMax;
        this.directionChangeSpeed = directionChangeSpeed;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.diameter, 0, Math.PI*2);
        ctx.lineWidth = 7;
        ctx.strokeStyle = 'black'
        ctx.stroke();
        ctx.fillStyle = 'rgb(107, 235, 171)';
        ctx.fill();
        ctx.closePath();
    }

    randomPosition() {
        // variable that will contain the sign to indicate the direction
        let dirX;
        let dirY;

        // to randomly get a sign for direction
        let directionX = () => {
            dirX = Math.floor(Math.random() * 2) ? '-' : '+';
        }

        let directionY = () => {
            dirY = Math.floor(Math.random() * 2) ? '-' : '+';
        }

        // randomly gets a value to be added to x and y 
        // the values determine the speed of the enemy
        // the difference of the values to be added to x & y respectively, determine the trayectory
        let randomPos = () => {
            this.randomX = Number(dirX + Math.floor(Math.random() * (this.speedMax) + this.speedMin));
            this.randomY = Number(dirY + Math.floor(Math.random() * (this.speedMax) + this.speedMin));
        }

        // changes the trayectory every directionChangeSpeed value
        if(frames % this.directionChangeSpeed === 0) {
            directionX();
            directionY();
            randomPos();
        }
        
        this.x += this.randomX;
        this.y += this.randomY;

        if(this.y < this.diameter + 1) {
            dirY = '+';
            this.x < this.diameter * 3 ? dirX = '+' : directionX();
            randomPos();
        }
        if(this.y > canvas.height - this.diameter - 1) {
            dirY = '-';
            this.x > canvas.width - (this.diameter * 3) ? dirX = '-' : directionX();
            randomPos()
        }
        if(this.x < this.diameter + 1) {
            dirX = '+';
            this.y < this.diameter * 3 ? dirY = '+' : directionY();
            randomPos()
        }
        if(this.x > canvas.width - this.diameter - 1) {
            dirX = '-';
            this.y > canvas.height - (this.diameter * 3) ? dirY = '-' : directionY();
            randomPos();
        }
    }
}