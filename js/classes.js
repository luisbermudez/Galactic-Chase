class Sprite {
    constructor(x, y, powerOfAttack, powerOnTimer) {
        this.x = x;
        this.y = y;
        this.diameter = 35;
        this.color = 'rgba(80, 152, 173, 0.95)';
        this.speedX = 0;
        this.speedY = 0;
        this.powerOfAttack = powerOfAttack;
        this.powerActive = false;
        this.powerOnTimer = powerOnTimer;

        this.image = new Image();
        this.image.src = './../images/astron.png';
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.diameter, 0, Math.PI*2);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(80, 152, 173, 0.75)';
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.drawImage(this.image, this.x - this.diameter, this.y - this.diameter, this.diameter*2, this.diameter*2);
    }

    position() {
        this.y += this.speedY;
        this.x += this.speedX;
        if(this.y < this.diameter + 5) this.y = this.diameter + 3;
        if(this.y > canvas.height - this.diameter - 5) this.y = canvas.height - this.diameter - 3;
        if(this.x < this.diameter + 5) this.x = this.diameter + 3;
        if(this.x > canvas.width - this.diameter - 5)this.x = canvas.width - this.diameter - 3;
    }

    attack(enemy) {
        // Ready to attack when special power on
        if(powerOn && enemy.diameter > this.powerOfAttack) {
            bulletReady = true;
            shadowOn = true;
        }

        // Ready to attack when over the enemy
        if(overAndReady && enemy.diameter > this.powerOfAttack) {
            bulletReady = true;
        }
    }

    // Timer to deactivate the special power after a period of time
    deactivatePower() {
        if(powerOn) {
            setTimeout(() => {
                powerOn = false;
                shadowOn = true;
            }, powerOnTimer);
        }
    }

    power(powerItem) {
        if(
            this.x - this.diameter < powerItem.x + powerItem.diameter && 
            this.x + this.diameter > powerItem.x - powerItem.diameter &&
            this.y - this.diameter < powerItem.y + powerItem.diameter &&
            this.y + this.diameter > powerItem.y - powerItem.diameter
        ) {
            this.color = 'rgb(184, 81, 166)';
            powerOn = true;
            this.deactivatePower();
        }
    }

    overEnemy(enemy) {
        if(
            this.x - this.diameter < enemy.x + enemy.diameter && 
            this.x + this.diameter > enemy.x - enemy.diameter &&
            this.y - this.diameter < enemy.y + enemy.diameter &&
            this.y + this.diameter > enemy.y - enemy.diameter
        ) {
            if(powerOn) {
                powerOn = true;
            } else {
                overAndReady = true;
                this.color = 'rgb(184, 81, 166)';
                shadowOn = true;
            }
        } else {
            if(powerOn) {
                powerOn = true;
            } else {
                overAndReady = false;
                bulletReady = false;
                this.color = 'rgba(80, 152, 173, 0.95)';
                shadowOn = false;
            }
        }
    }
}

class Enemy {
    constructor(x, y, d, speedMin, speedMax, directionChangeSpeed) {
        this.x = x;
        this.y = y;
        this.diameter = d;
        this.randomX = -2;
        this.randomY = 2;
        this.speedMin = speedMin;
        this.speedMax = speedMax;
        this.directionChangeSpeed = directionChangeSpeed;
        this.color = 'rgba(147, 206, 188, 0.95)';

        this.image = new Image();
        this.image.src = './../images/ufo1.png';
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.diameter, 0, Math.PI*2);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(147, 206, 188, 0.565)';
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.drawImage(this.image, this.x - this.diameter, this.y - this.diameter, this.diameter*2, this.diameter*2);
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

        if(this.y < this.diameter) {
            dirY = '+';
            this.x < this.diameter * 3 ? dirX = '+' : directionX();
            randomPos();
        }
        if(this.y > canvas.height - this.diameter) {
            dirY = '-';
            this.x > canvas.width - (this.diameter * 3) ? dirX = '-' : directionX();
            randomPos()
        }
        if(this.x < this.diameter) {
            dirX = '+';
            this.y < this.diameter * 3 ? dirY = '+' : directionY();
            randomPos()
        }
        if(this.x > canvas.width - this.diameter) {
            dirX = '-';
            this.y > canvas.height - (this.diameter * 3) ? dirY = '-' : directionY();
            randomPos();
        }
    }
}

class PowerItem extends Enemy {
    constructor(x, y, d, speedMin, speedMax, directionChangeSpeed) {
        super(x, y, d, speedMin, speedMax, directionChangeSpeed)
        this.color = 'rgb(110, 221, 20)';
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
}

class AttackItems {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = 'rgb(118, 86, 160)';
        this.diameter = 5;
        this.strokeS = 'black';
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.diameter, 0, Math.PI*2);
        ctx.lineWidth = 5
        ctx.strokeStyle = this.strokeS
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    trayectory(sprite) {
        this.x = sprite.x;
        this.y = sprite.y;
    }
}

class AttackBullet extends AttackItems {
    constructor(x, y) {
        super(x, y);
        this.color = 'yellow'
        this.diameter = 7;
    }

    trayectory(firstEnemy, firstSprite) {
        let xSlope;
        let ySlope;

        let trayectorySlope = () => {
            xSlope = firstEnemy.x - this.x;
            ySlope = firstEnemy.y - this.y;
        }

        trayectorySlope();

        this.x += xSlope/6
        this.y += ySlope/6
    }
}

class spriteShadow extends AttackItems {
    constructor(x, y) {
        super(x, y);
        this.color = 'rgba(154, 35, 209, 0.164)'
        this.diameter = 5;
        this.strokeS = 'rgba(154, 35, 209, 0.164)';
    }

    trayectory() {
        this.diameter += 15;
    }
}