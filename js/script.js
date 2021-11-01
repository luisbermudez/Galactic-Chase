

window.onload = () => {

    const firstSprite = new Sprite(0, 0);
    const firstEnemy = new Enemy(700, 100, 10);

    document.getElementById('start').onclick = () => {
        firstSprite.draw();
        firstEnemy.draw();
        startGame();
    }

    function startGame () {
        requestID = requestAnimationFrame(update);
    }

    function update() {
        frames++
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        firstEnemy.draw();
        firstEnemy.randomPosition()
        firstSprite.draw();
        firstSprite.position();

        if(firstSprite.overEnemy(firstEnemy)) {
            firstSprite.attack();
        }
        if(requestID) {
            requestID = requestAnimationFrame(update);
        }
    }

    addEventListener('keydown', (e) => {
        switch(e.keyCode) {
            case 83:
                firstSprite.speedY += 5;
                firstEnemy.diameter += 2;
                break;
            case 87:
                firstSprite.speedY -= 5;
                firstEnemy.diameter += 2;
                break;
            case 68:
                firstSprite.speedX += 5;
                firstEnemy.diameter += 2;
                break;
            case 65:
                firstSprite.speedX -= 5;
                firstEnemy.diameter += 2;
                break;
        }
    });

    addEventListener('keyup', (e) => {
        switch(e.keyCode) {
            case 83:
                firstSprite.speedY = 2;
                break;
            case 87:
                firstSprite.speedY = -2;
                break;
            case 68:
                firstSprite.speedX = 2;
                break;
            case 65:
                firstSprite.speedX = -2;
                break;
        }
    });
}