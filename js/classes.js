class Sprite {
    constructor(x, y, powerOfAttack, powerOnTimer) {
        this.x = x;
        this.y = y;
        this.diameter = 20;
        this.color = 'rgb(80, 152, 173)';
        this.speedX = 0;
        this.speedY = 0;
        this.powerOfAttack = powerOfAttack;
        this.powerActive = false;
        this.powerOnTimer = powerOnTimer;
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
        if(this.y < this.diameter + 5) this.y = this.diameter + 3;
        if(this.y > canvas.height - this.diameter - 5) this.y = canvas.height - this.diameter - 3;
        if(this.x < this.diameter + 5) this.x = this.diameter + 3;
        if(this.x > canvas.width - this.diameter - 5)this.x = canvas.width - this.diameter - 3;
    }

    attack(enemy) {
        if(this.color === 'tomato') {
            if(enemy.diameter > 3) {
                enemy.diameter -= 3;
                bulletReady = true;
            }
        }

        if(overAndReady) {
            if(enemy.diameter > this.powerOfAttack) {
                enemy.diameter -= this.powerOfAttack;
                bulletReady = true;
            }
        }
    }

    deactivatePower() {
        if(this.color === 'tomato') {
            setTimeout(() => {
                this.color = 'rgb(184, 81, 166)';
            }, powerOnTimer);
        }
    }

    power(powerItem) {
        if((
            this.x - this.diameter < powerItem.x + powerItem.diameter && 
            this.x + this.diameter > powerItem.x - powerItem.diameter &&
            this.y - this.diameter < powerItem.y + powerItem.diameter &&
            this.y + this.diameter > powerItem.y - powerItem.diameter
        )) {
            this.color = 'tomato';
            this.deactivatePower();
        }
    }

    overEnemy(enemy) {
        if((
            this.x - this.diameter < enemy.x + enemy.diameter && 
            this.x + this.diameter > enemy.x - enemy.diameter &&
            this.y - this.diameter < enemy.y + enemy.diameter &&
            this.y + this.diameter > enemy.y - enemy.diameter
        )) {
            if(this.color === 'tomato') {
                this.color = 'tomato';
            } else {
                overAndReady = true;
                this.color = 'rgb(184, 81, 166)';
            }
        } else {
            if(this.color === 'tomato') {
                this.color = 'tomato';
            } else {
                overAndReady = false;
                bulletReady = false;
                this.color = 'rgb(80, 152, 173)';
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
        this.color = 'rgb(147, 206, 188)';
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

// class Stars {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }

//     draw() {
//         let positionX = this.x;
//         let positionY = this.y;
//         ctx.lineWidth = 3;
//         ctx.fillStyle = 'yellow';
//         ctx.beginPath();
//         ctx.moveTo(positionX, positionY);
//         ctx.lineTo(positionX + 5, positionY + 14);
//         ctx.stroke();
//         ctx.lineTo(positionX + 22, positionY + 16);
//         ctx.stroke();
//         ctx.lineTo(positionX + 5, positionY + 28);
//         ctx.stroke();
//         ctx.lineTo(positionX + 5, positionY + 40);
//         ctx.stroke();
//         ctx.lineTo(positionX - 7, positionY + 30);
//         ctx.stroke();
//         ctx.lineTo(positionX - 23, positionY + 39);
//         ctx.stroke();
//         ctx.lineTo(positionX - 16, positionY + 25);
//         ctx.stroke();
//         ctx.lineTo(positionX - 30, positionY + 16);
//         ctx.stroke();
//         ctx.lineTo(positionX - 14, positionY + 15);
//         ctx.stroke();
//         ctx.lineTo(positionX, positionY);
//         ctx.stroke();
//         ctx.fill();
//     }

//     position() {
//         this.x += this.x;
//         this.y += this.y;
//     }
// }

class PowerItem extends Enemy {
    constructor(x, y, d, speedMin, speedMax, directionChangeSpeed) {
        super(x, y, d, speedMin, speedMax, directionChangeSpeed)
        this.color = 'tomato';
    }
}

class AttackItems {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = 'rgb(118, 86, 160)';
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI*2);
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black'
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
    }

    trayectory(firstEnemy, firstSprite) {

        let dirX;
        let dirY;

        let direction = () => {
            dirX = Math.floor(Math.random() * 2) ? '-' : '+';
            dirY = Math.floor(Math.random() * 2) ? '-' : '+';
        }

        direction();

        this.x += Number(dirX + '12');
        this.y += Number(dirY + '12');

        if(this.x > firstSprite.x) {
            if(this.x - firstSprite.x > 10) {
                if(this.x > firstEnemy.x) {
                    dirX = '-';
                } else {
                    dirX = '+';
                }
                if(this.y > firstEnemy.y) {
                    dirY = '-';
                } else {
                    dirY = '+';
                }
                this.x += Number(dirX + '12');
                this.y += Number(dirY + '12');
            }
        } else {
            if(this.x + firstSprite.x > 10) {
                if(this.x > firstEnemy.x) {
                    dirX = '-';
                } else {
                    dirX = '+';
                }
                if(this.y > firstEnemy.y) {
                    dirY = '-';
                } else {
                    dirY = '+';
                }
                this.x += Number(dirX + '12');
                this.y += Number(dirY + '12');
            }
        }
    }
}