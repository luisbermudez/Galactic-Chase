class Sprite {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.diameter = 15;
        this.speedX = 0;
        this.speedY = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.diameter, 0, Math.PI*2);
        ctx.lineWidth = 7;
        ctx.strokeStyle = 'black'
        ctx.stroke();
        ctx.fillStyle = 'rgb(37, 136, 228)';
        ctx.fill();
        ctx.closePath();
    }

    position() {
        this.y += this.speedY;
        this.x += this.speedX;
        if(this.y < 23) this.y = 23;
        if(this.y > 677) this.y = 677;
        if(this.x < 23) this.x = 23;
        if(this.x > 1327)this.x = 1327;
    }

    attack() {
        ctx.fillStyle = 'tomato';
        console.log('something');
    }

    overEnemy(enemy) {
        return (
            this.x - this.diameter < enemy.x + enemy.diameter && 
            this.x + this.diameter > enemy.x - enemy.diameter &&
            this.y - this.diameter < enemy.y + enemy.diameter &&
            this.y + this.diameter > enemy.y - enemy.diameter
        )
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
            this.randomX = Number(dirX + Math.random() * 4);
            this.randomY = Number(dirY + Math.random() * 4);
        }

        if(frames % 250 === 0) {
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