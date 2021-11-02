class Sprite {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.diameter = 10;
        this.color = 'rgb(37, 136, 228)';
        this.speedX = 0;
        this.speedY = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.diameter, 0, Math.PI*2);
        ctx.lineWidth = 7;
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
            enemy.diameter -= 25;
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
    constructor(x, y, d) {
        this.x = x;
        this.y = y;
        this.diameter = d;
        this.randomX = -2;
        this.randomY = 0;
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
        let dirX;
        let dirY;

        let direction = () => {
            dirX = Math.floor(Math.random() * 2) ? '-' : '+';
            dirY = Math.floor(Math.random() * 2) ? '-' : '+';
        }

        let randomPos = () => {
            this.randomX = Number(dirX + Math.floor(Math.random() * 8));
            this.randomY = Number(dirY + Math.floor(Math.random() * 8));
        }

        if(frames % 50 === 0) {
            direction();
            randomPos();
        }
        
        this.x += this.randomX;
        this.y += this.randomY;

        if(this.y < this.diameter) {
            dirY = '+';
            dirX = '+';
            randomPos();
        }
        if(this.y > canvas.height - this.diameter) {
            dirY = '-';
            dirX = '-';
            randomPos()
        }
        if(this.x < this.diameter) {
            dirX = '+';
            dirY = '+';
            randomPos()
        }
        if(this.x > canvas.width - this.diameter) {
            dirX = '-';
            dirY = '-';
            randomPos();
        }
    }
}