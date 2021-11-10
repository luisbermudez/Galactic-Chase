class Sprite {
    constructor(x, y, powerOfAttack, powerOnTimer) {
        this.x = x;
        this.y = y;
        this.diameter = 110;
        this.color = 'transparent';
        this.speedX = 0;
        this.speedY = 0;
        this.powerOfAttack = powerOfAttack;
        this.powerActive = false;
        this.powerOnTimer = powerOnTimer;

        this.image = new Image();
        this.image.src = './images/13.png';

        this.history = [];
    }

    draw() {
        drawCircle(this.x, this.y, this.diameter, 2, this.color, this.color, ctx);
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
            this.x - this.diameter < powerItem.x + powerItem.diameter/3.7 && 
            this.x + this.diameter > powerItem.x - powerItem.diameter/3.7 &&
            this.y - this.diameter < powerItem.y + powerItem.diameter/3.7 &&
            this.y + this.diameter > powerItem.y - powerItem.diameter/3.7
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
    constructor(x, y, d, speedMin, speedMax, directionChangeSpeed, dCanvas) {
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
        this.dCanvas = dCanvas;
    }

    draw() {
        drawCircle(this.x, this.y, this.diameter, 2, this.color, this.color, ctx);
        ctx.drawImage(this.image, this.x - this.diameter/0.9, this.y - this.diameter/1.2, this.diameter*2.2, this.diameter*1.8);
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
    constructor(x, y, d, speedMin, speedMax, directionChangeSpeed, dCanvas, ctx) {
        super(x, y, d, speedMin, speedMax, directionChangeSpeed, dCanvas)
        this.color = 'rgb(45, 201, 240)';
        this.history = [];
        this.context = ctx;
        this.boundary = 100;
    }

    trailDrawing() {
        this.history.push([this.x, this.y]);

        for(let i = 0; i < this.history.length; i++) {
            let pos = this.history[i];
            drawCircle(pos[0], pos[1], (5 + (i*1.5)), 50, 'rgb(8, 35, 53, 0.51)', `rgb(8, 35, 53, 0.81)`, this.context);
        }

        if(this.history.length > 30) {
            this.history.splice(0, 1);
        }
    }

    draw() {
        drawCircle(this.x, this.y, 15, 45, 'black', 'rgb(45, 201, 240)', this.context);
    }
}

class AttackBullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = 'yellow'
        this.diameter = 10;
        this.strokeColor = 'black';
    }

    draw() {
        drawCircle(this.x, this.y, this.diameter, 10, this.strokeColor, this.color, ctx);
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

class Shadow extends AttackBullet {
    constructor(x, y, color) {
        super(x, y);
        this.color = color;
        this.diameter = 5;
        this.strokeColor = color;
        this.diameterGrowth = 17;
    }

    trayectory() {
        this.diameter += this.diameterGrowth;
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
    }
}