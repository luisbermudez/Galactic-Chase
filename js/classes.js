class Sprite {
    constructor(x, y, powerOfAttack, powerOnTimer) {
        this.x = x;
        this.y = y;
        this.diameter = 45;
        this.color = 'transparent';
        this.speedX = 0;
        this.speedY = 0;
        this.powerOfAttack = powerOfAttack;
        this.powerActive = false;
        this.powerOnTimer = powerOnTimer;

        this.image = new Image();
        this.image.src = './images/13.png';
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.diameter, 0, Math.PI*2);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'transparent';
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.drawImage(this.image, this.x - this.diameter, this.y - this.diameter, this.diameter*2, this.diameter*1.7);
    }

    position() {
        this.y += this.speedY;
        this.x += this.speedX;
        if(this.y < this.diameter + 40) {
            this.y = this.diameter + 40;
        }
        if(this.y > canvas.height - this.diameter - 40) {
            this.y = canvas.height - this.diameter - 40;
        }
        if(this.x < this.diameter + 40) {
            this.x = this.diameter + 40;
        }
        if(this.x > canvas.width - this.diameter - 40) {
            this.x = canvas.width - this.diameter - 40;
        }

        console.log(this.x);
        if(this.speedX > 1) {
            this.image.src = './images/right.png';
        } else if(this.speedX < -1) {
            this.image.src = './images/left.png';
        } else if(this.x === 85 || this.x === canvas.width - 85) {
            this.image.src = './images/13.png';
        }
    }

    attack(enemy) {
        // Ready to attack when special power on
        if(powerOn && enemy.diameter > this.powerOfAttack) {
            bulletReady = true;
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
            // this.color = 'rgb(184, 81, 166)';
            // this.image.src = './images/134.png';
            powerOn = true;
            shadowOn = true;
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
                shadowOn = true;
            } else {
                overAndReady = true;
                shadowOn = true;
            }
        } else {
            if(powerOn) {
                powerOn = true;
                shadowOn = true;
            } else {
                overAndReady = false;
                bulletReady = false;
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
        this.color = 'transparent';

        this.image = new Image();
        this.image.src = './images/ufo3.png';

        this.dirX;
        this.dirY;

        this.boundary = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.diameter, 0, Math.PI*2);
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.drawImage(this.image, this.x - this.diameter/0.9, this.y - this.diameter, this.diameter*2.2, this.diameter*2);
        // ctx.translate(200, 80);
    }

    randomPosition() {
        // to randomly get a sign for direction
        let directionX = () => {
            this.dirX = Math.floor(Math.random() * 2) ? '-' : '+';
        }

        let directionY = () => {
            this.dirY = Math.floor(Math.random() * 2) ? '-' : '+';
        }

        // randomly gets a value to be added to x and y 
        // the values determine the speed of the enemy
        // the difference of the values to be added to x & y respectively, determine the trayectory
        let randomPos = () => {
            this.randomX = Number(this.dirX + Math.floor(Math.random() * (this.speedMax) + this.speedMin));
            this.randomY = Number(this.dirY + Math.floor(Math.random() * (this.speedMax) + this.speedMin));
        }

        // changes the trayectory every directionChangeSpeed value
        if(frames % this.directionChangeSpeed === 0) {
            directionX();
            directionY();
            randomPos();
        }
        
        this.x += this.randomX;
        this.y += this.randomY;

        if(this.y + this.boundary < this.diameter) {
            this.dirY = '+';
            this.x < this.diameter * 3 ? this.dirX = '+' : directionX();
            randomPos();
        }
        if(this.y > canvas.height + this.boundary - this.diameter) {
            this.dirY = '-';
            this.x > canvas.width - (this.diameter * 3) ? this.dirX = '-' : directionX();
            randomPos()
        }
        if(this.x + this.boundary < this.diameter) {
            this.dirX = '+';
            this.y < this.diameter * 3 ? this.dirY = '+' : directionY();
            randomPos()
        }
        if(this.x > canvas.width + this.boundary - this.diameter) {
            this.dirX = '-';
            this.y > canvas.height - (this.diameter * 3) ? this.dirY = '-' : directionY();
            randomPos();
        }
    }

    imageSwitch() {
        if(this.dirX === '-') {
            this.image.src = './images/ufo3.png';
        } else if(this.dirX === '+'){
            this.image.src = './images/ufo1.png';
        } else {
            this.image.src = './images/ufo3.png';
        }
    }
}

class PowerItem extends Enemy {
    constructor(x, y, d, speedMin, speedMax, directionChangeSpeed) {
        super(x, y, d, speedMin, speedMax, directionChangeSpeed)
        this.color = 'rgb(45, 201, 240)';
        this.boundary = 0;
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
        this.color = 'gray';
        this.diameter = 5;
        this.strokeS = 'black';
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y + 20, this.diameter, 0, Math.PI*2);
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

        this.x += xSlope/4
        this.y += ySlope/4
    }
}

class Shadow extends AttackItems {
    constructor(x, y, color) {
        super(x, y);
        this.color = color;
        this.diameter = 5;
        this.strokeS = color;
        this.diameterGrowth = 17;
    }

    trayectory() {
        this.diameter += this.diameterGrowth;
    }
}

class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
    }

    draw() {
        let positionX = this.x;
        let positionY = this.y;

        ctx.lineWidth = 3;
        ctx.fillStyle = 'rgb(243, 241, 98)';
        ctx.beginPath();
        ctx.moveTo(positionX, positionY);
        ctx.lineTo(positionX + 3, positionY + 9);
        ctx.stroke();
        ctx.lineTo(positionX + 16, positionY + 14);
        ctx.stroke();
        ctx.lineTo(positionX + 3, positionY + 20);
        ctx.stroke();
        ctx.lineTo(positionX + 4, positionY + 30);
        ctx.stroke();
        ctx.lineTo(positionX - 7, positionY + 20);
        ctx.stroke();
        ctx.lineTo(positionX - 23, positionY + 30);
        ctx.stroke();
        ctx.lineTo(positionX - 16, positionY + 18);
        ctx.stroke();
        ctx.lineTo(positionX - 25, positionY + 11);
        ctx.stroke();
        ctx.lineTo(positionX - 10, positionY + 10);
        ctx.stroke();
        ctx.lineTo(positionX, positionY);
        ctx.stroke();
        ctx.fill();
    }

    position() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}