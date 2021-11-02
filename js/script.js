

window.onload = () => {
    let firstSprite;
    let firstEnemy;

    document.getElementById('start').onclick = () => {
        if(requestID) {
            return;
        }

        startGame();
    }

    function startGame () {
        firstSprite = new Sprite(50, 600);
        firstEnemy = new Enemy(700, 100, 100);
        firstSprite.draw();
        firstEnemy.draw();
        requestID = requestAnimationFrame(update);
    }

    function status() {
        if(firstEnemy.diameter < 8) {
            aWin();
        }
        if(firstEnemy.diameter > 300) {
            gameOver();
        }
    }

    function gameOver() {
        requestID = undefined;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '250 Calibri';
        ctx.fillText('Try again!', 100, 100);
    }

    function aWin() {
        requestID = undefined;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '250 Calibri';
        ctx.fillText('You won!', 100, 100);
    }

    function update() {
        frames++
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        firstEnemy.draw();
        firstEnemy.randomPosition()
        firstSprite.draw();
        firstSprite.position();
        firstSprite.overEnemy(firstEnemy);
        status();

        if(requestID) {
            requestID = requestAnimationFrame(update);
        }
    }

    addEventListener('keydown', (e) => {
        switch(e.keyCode) {
            case 83:
                firstSprite.speedY += 5;
                firstEnemy.diameter += 10;
                break;
            case 87:
                firstSprite.speedY -= 5;
                firstEnemy.diameter += 10;
                break;
            case 68:
                firstSprite.speedX += 5;
                firstEnemy.diameter += 10;
                break;
            case 65:
                firstSprite.speedX -= 5;
                firstEnemy.diameter += 10;
                break;
            case 76:
                firstSprite.attack(firstEnemy);
        }
    });

    addEventListener('keyup', (e) => {
        switch(e.keyCode) {
            case 83:
                firstSprite.speedY = 5;
                break;
            case 87:
                firstSprite.speedY = -5;
                break;
            case 68:
                firstSprite.speedX = 5;
                break;
            case 65:
                firstSprite.speedX = -5;
                break;
        }
    });
}