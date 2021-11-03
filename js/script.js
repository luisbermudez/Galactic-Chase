window.onload = () => {
    let firstSprite;
    let firstEnemy;

    const gameArea = document.getElementById('gameArea');
    const introArea = document.getElementById('introArea');
    const userInfo = document.getElementById('info');
    const level = document.getElementById('level');
    const instructs = document.getElementById('instructions');

    document.getElementById('start').onclick = () => {
        introArea.style.display = 'none';
        
        if(rightClientWindowSize()) {
                level.style.display = 'block';
            } else {
                userInfo.style.display = 'flex';
                document.getElementById('gotit').onclick = () => {
                    userInfo.style.display = 'none';
                    level.style.display = 'block';
                }
            }
    }

    document.getElementById('buttonInstructions').onclick  = () => {
        instructs.style.display = 'block';
        level.style.display = 'none';
    }

    document.getElementById('toLevels').onclick = () => {
        instructs.style.display = 'none';
        level.style.display = 'block';
    }

    document.getElementById('mild').onclick = () => {
        if(requestID) {
            return;
        }

        enemySpeedMax = 2;
        enemySpeedMin = 1;
        enemyDirectionChangeSpeed = 200;
        enemyDiameterGrowth = 4;
        spriteSpeed = 2;
        spritePower = 10;
        winDiameterParameter = 30;
        lostDiameterParameter = 150;

        level.style.display = 'none';
        gameArea.style.display = 'inline';
        gameArea.style.display = 'flex';
        gameArea.style.justifyContent = 'center';

        startGame();
    }

    document.getElementById('medium').onclick = () => {
        if(requestID) {
            return;
        }

        enemySpeedMax = 4;
        enemySpeedMin = 1;
        enemyDirectionChangeSpeed = 80;
        enemyDiameterGrowth = 5;
        spriteSpeed = 4;
        spritePower = 15;
        winDiameterParameter = 15;
        lostDiameterParameter = 150;

        level.style.display = 'none';
        gameArea.style.display = 'inline';
        gameArea.style.display = 'flex';
        gameArea.style.justifyContent = 'center';

        startGame();
    }
    
    document.getElementById('spicy').onclick = () => {
        if(requestID) {
            return;
        }

        enemySpeedMax = 6;
        enemySpeedMin = 3;
        enemyDirectionChangeSpeed = 65;
        enemyDiameterGrowth = 4;
        spriteSpeed = 5;
        spritePower = 15;
        winDiameterParameter = 10;
        lostDiameterParameter = 160;

        level.style.display = 'none';
        gameArea.style.display = 'inline';
        gameArea.style.display = 'flex';
        gameArea.style.justifyContent = 'center';

        startGame();
    }

    function startGame () {
        introArea.style.display = 'none';
        firstSprite = new Sprite(50, 670, spritePower);
        firstEnemy = new Enemy(700, 100, 50, enemySpeedMin, enemySpeedMax, enemyDirectionChangeSpeed);
        firstSprite.draw();
        firstEnemy.draw();
        requestID = requestAnimationFrame(update);
    }

    function status() {
        if(firstEnemy.diameter < winDiameterParameter) {
            aWin();
        }
        if(firstEnemy.diameter > lostDiameterParameter) {
            gameOver();
        }
    }

    function rightClientWindowSize() {
        if(document.documentElement.clientWidth > 1100 && document.documentElement.clientHeight > 730) {
            return true;
        } else {
            return false;
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
        frames++;
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
                firstEnemy.diameter += enemyDiameterGrowth;
                break;
            case 87:
                firstSprite.speedY -= 5;
                firstEnemy.diameter += enemyDiameterGrowth;
                break;
            case 68:
                firstSprite.speedX += 5;
                firstEnemy.diameter += enemyDiameterGrowth;
                break;
            case 65:
                firstSprite.speedX -= 5;
                firstEnemy.diameter += enemyDiameterGrowth;
                break;
            case 76:
                firstSprite.attack(firstEnemy);
        }
    });

    addEventListener('keyup', (e) => {
        switch(e.keyCode) {
            case 83:
                firstSprite.speedY = spriteSpeed;
                break;
            case 87:
                firstSprite.speedY = - spriteSpeed;
                break;
            case 68:
                firstSprite.speedX = spriteSpeed;
                break;
            case 65:
                firstSprite.speedX = - spriteSpeed;
                break;
        }
    });
}