class Sprite {
    constructor(x, y, powerOfAttack, powerOnTimer) {
        this.x = x;
        this.y = y;
        this.radius = 110;
        this.color = 'transparent';
        this.speedX = 0;
        this.speedY = 0;
        this.powerOfAttack = powerOfAttack;
        this.powerActive = false;
        this.powerOnTimer = powerOnTimer;
        this.boundary = 50;
        this.image = new Image();
        this.image.src = './images/13.png';
    }

    draw() {
        drawCircle(this.x, this.y, this.radius, 2, this.color, this.color, ctx);
        ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*1.7);
    }

    position() {
        this.y += this.speedY;
        this.x += this.speedX;

        if(this.y < this.radius + this.boundary) {
            this.y = this.radius + this.boundary;}
        if(this.y > canvas.height - this.radius - this.boundary) {
            this.y = canvas.height - this.radius - this.boundary;}
        if(this.x < this.radius + this.boundary) {
            this.x = this.radius + this.boundary;}
        if(this.x > canvas.width - this.radius - this.boundary) {
            this.x = canvas.width - this.radius - this.boundary;}

        if(this.speedX > 1) {
            this.image.src = './images/right.png';
        } else if(this.speedX < -1) {
            this.image.src = './images/left.png';
        }
    }

    attack(enemy) {
        // Ready to attack when special power on
        if(powerOn && enemy.radius > this.powerOfAttack) {
            bulletReady = true;
        }

        // Ready to attack when over the enemy
        if(overAndReady && enemy.radius > this.powerOfAttack) {
            bulletReady = true;
        }
    }

    // Timer to deactivate the special power after a period of time
    deactivatePower() {
        if(powerOn) {
            setTimeout(() => {
                powerOn = false;
                powerShadowOn = false;
            }, powerOnTimer);
        }
    }

    power(powerItem) {
        if(collisionDetector(this, powerItem)) {
            if(powerShadowOn) {return};

            powerOn = true;
            shadowOn = true;
            powerShadowOn = true;
            this.deactivatePower();
        }
    }

    overEnemy(enemy) {
        if(collisionDetector(this, enemy)) {
            if(powerOn) {
                powerOn = true;
                shadowOn = false;
                powerShadowOn = true;
            } else {
                overAndReady = true;
                shadowOn = true;
            }
        } else {
            if(powerOn) {
                powerOn = true;
                shadowOn = false;
                powerShadowOn = true;
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
        this.radius = d;
        this.randomX = 8;
        this.randomY = 2;
        this.speedMin = speedMin;
        this.speedMax = speedMax;
        this.directionChangeSpeed = directionChangeSpeed;
        this.color = 'transparent';

        this.image = new Image();
        this.image.src = './images/ufo1.png';

        this.dirX;
        this.dirY;

        this.boundary = -100;
    }

    draw() {
        drawCircle(this.x, this.y, this.radius, 2, this.color, this.color, ctx);
        ctx.drawImage(this.image, this.x - this.radius/0.9, this.y - this.radius/1.2, this.radius*2.2, this.radius*1.8);
    }

    drawPower() {
        if(powerOn) {
            dUFOPower = false;
            return
        };
        ctx.beginPath();
        ctx.restore();
        ctx.arc(this.x, this.y, this.radius + 200, (Math.PI/180)*70, (Math.PI/180)*110);
        ctx.fillStyle = 'rgba(164, 224, 22, 0.11)';
        ctx.lineWidth = 0;
        ctx.stroke();
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.fill();
        ctx.save();
        ctx.closePath();
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

        // changes the trayectory every period-of-time (directionChangeSpeed) value
        if(frames % this.directionChangeSpeed === 0) {
            directionX();
            directionY();
            randomPos();
        }
        
        this.x += this.randomX;
        this.y += this.randomY;

        if(this.y + this.boundary < this.radius) {
            this.dirY = '+';
            this.x < this.radius * 3 ? this.dirX = '+' : directionX();
            randomPos();
        }
        if(this.y > canvas.height + this.boundary - this.radius) {
            this.dirY = '-';
            this.x > canvas.width - (this.radius * 3) ? this.dirX = '-' : directionX();
            randomPos()
        }
        if(this.x + this.boundary < this.radius) {
            this.dirX = '+';
            this.y < this.radius * 3 ? this.dirY = '+' : directionY();
            randomPos()
        }
        if(this.x > canvas.width + this.boundary - this.radius) {
            this.dirX = '-';
            this.y > canvas.height - (this.radius * 3) ? this.dirY = '-' : directionY();
            randomPos();
        }
    }

    imageSwitch() {
        if(this.dirX === '-') {
            this.image.src = './images/ufo3.png';
        } else if(this.dirX === '+'){
            this.image.src = './images/ufo1.png';
        }
    }
}

class PowerItem extends Enemy {
    constructor(x, y, d, speedMin, speedMax, directionChangeSpeed) {
        super(x, y, d, speedMin, speedMax, directionChangeSpeed)
        this.color = 'rgb(45, 201, 240)';
        this.history = [];
        this.boundary = -400;
    }

    trailDrawing() {
        this.history.push([this.x, this.y]);

        for(let i = 0; i < this.history.length; i++) {
            let pos = this.history[i];
            drawCircle(pos[0], pos[1], ((this.radius/3) + (i*2.5)), 60, 'rgb(9, 37, 58, 0.25)', `rgb(5, 19, 29, 0.15)`, ctx);
        }

        if(this.history.length > 30) {
            this.history.splice(0, 1);
        }
    }

    draw() {
        drawCircle(this.x, this.y, this.radius, 35, 'black', 'rgb(45, 201, 240)', ctx);
    }
}

class AttackBullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = 'yellow'
        this.radius = 10;
        this.strokeColor = 'black';
    }

    draw() {
        drawCircle(this.x, this.y, this.radius, 20, this.strokeColor, this.color, ctx);
    }

    trayectory(firstEnemy, firstSprite) {
        let xSlope;
        let ySlope;

        let trayectorySlope = () => {
            if(dUFOPower && !powerOn) {
                xSlope = firstEnemy.x - this.x;
                ySlope = (firstEnemy.y + firstEnemy.radius*1.7) - this.y;

                this.x += xSlope/10
                this.y += ySlope/10
            } else {
                xSlope = firstEnemy.x - this.x;
                ySlope = firstEnemy.y - this.y;

                this.x += xSlope/4
                this.y += ySlope/4
            }
        }

        trayectorySlope();
    }
}

class Shadow extends AttackBullet {
    constructor(x, y, color) {
        super(x, y);
        this.color = color;
        this.radius = 5;
        this.strokeColor = color;
        this.radiusGrowth = 17;
    }

    trayectory() {
        this.radius += this.radiusGrowth;
    }
}

class Star {
    constructor(x, y, color, maxSize, minSize) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.maxSize = maxSize;
        this.minSize = minSize;
        this.speedX = 0;
        this.speedY = 0;
    }

    draw() {
        let size = (Math.random() * (this.maxSize + this.minSize) + this.minSize);
        drawCircle(this.x, this.y, size, 5, this.color, this.color, ctx);
    }

    position() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

// Functions
function drawCircle(x, y, d, dLineWidth, dLineStroke, color, context) {
    context.beginPath();
    context.arc(x, y, d, 0, Math.PI*2);
    context.lineWidth = dLineWidth;
    context.strokeStyle = dLineStroke;
    context.stroke();
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

function collisionDetector(itself, object) {
    return (
        itself.x - itself.radius < object.x + object.radius && 
        itself.x + itself.radius > object.x - object.radius &&
        itself.y - itself.radius < object.y + object.radius &&
        itself.y + itself.radius > object.y - object.radius
    )
}

// Intro canvas
class IntroAstron {
    constructor(){
        this.x = document.documentElement.clientWidth*4/2 - 200;
        this.y = 49;
        this.speedY = 0;
        this.image = new Image();
        this.image.src = './images/astro3.png';
    }

    draw() {
        introCTX.drawImage(this.image, this.x, this.y, 400, 340);
    }

    position() {
        if(this.y > 200) {
            this.speedY = -6;
        }
        if(this.y < 70) {
            this.speedY = 6;
        }

        this.y += this.speedY;
        this.x = document.documentElement.clientWidth*4/2 - 200;
    }
}

class ShootingStar {
    constructor() {
        this.x = document.documentElement.clientWidth*4/2;
        this.y = document.documentElement.clientHeight*4 - 400;
        this.radius = 250;
        this.randomX = -15;
        this.randomY = -10;
        this.speedMin = 10;
        this.speedMax = 15;
        this.directionChangeSpeed = 100;
        this.color = 'transparent';

        this.dirX;
        this.dirY;

        this.boundary = 800;
        this.history = [];

        this.image = new Image();
        this.image.src = './images/ufo3.png'
    }

    draw() {
        drawCircle(this.x, this.y, this.radius, 2, this.color, this.color, introCTX);
        introCTX.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*1.7);
    }

    randomPosition() {
        let directionX = () => {
            this.dirX = Math.floor(Math.random() * 2) ? '-' : '+';
        }

        let directionY = () => {
            this.dirY = Math.floor(Math.random() * 2) ? '-' : '+';
        }

        let randomNum = () => {
            this.randomX = Number(this.dirX + Math.floor(Math.random() * (this.speedMax) + this.speedMin));
            this.randomY = Number(this.dirY + Math.floor(Math.random() * (this.speedMax) + this.speedMin));
        }

        if(this.x + this.boundary < 300) {
            this.dirX = '+';
            directionY();
            randomNum();
        }
        if(this.x > dIntroCanvas.width + this.boundary - 300) {
            this.dirX = '-';
            directionY();
            randomNum();
        }
        if(this.y + this.boundary < 300) {
            this.dirY = '+';
            directionX();
            randomNum();
        }
        if(this.y > dIntroCanvas.height + this.boundary - 300) {
            this.dirY = '-';
            directionX();
            randomNum();
        }

        this.x += this.randomX;
        this.y += this.randomY;

        if(introFrames % this.directionChangeSpeed === 0) {
            directionX();
            directionY();
            randomNum();
        }
    }

    imageSwitch() {
        if(this.dirX === '-') {
            this.image.src = './images/ufo3.png';
        } else if(this.dirX === '+'){
            this.image.src = './images/ufo1.png';
        }
    }
}