window.onload = () => {
    let firstSprite;
    let firstEnemy;
    // let star1;
    // let star2;
    // let star3;
    // let star4;
    // let star5;
    // let star6;
    
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
        spritePower = 5;
        winDiameterParameter = 30;
        lostDiameterParameter = 150;
        powerItemSpeedMax = 4;
        powerItemSpeedMin = 1;
        powerOnTimer = 3500;


        level.style.display = 'none';
        gameArea.style.display = 'flex';

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
        spritePower = 9;
        winDiameterParameter = 15;
        lostDiameterParameter = 150;
        powerItemSpeedMax = 4;
        powerItemSpeedMin = 2;
        powerOnTimer = 3000;

        level.style.display = 'none';
        gameArea.style.display = 'flex';

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
        spritePower = 8;
        winDiameterParameter = 10;
        lostDiameterParameter = 160;
        powerItemSpeedMax = 8;
        powerItemSpeedMin = 6;
        powerOnTimer = 2000;

        level.style.display = 'none';
        gameArea.style.display = 'flex';

        startGame();
    }

    function startGame () {
        introArea.style.display = 'none';
        // star1 = new Stars(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));
        // star2 = new Stars(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));
        // star3 = new Stars(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));
        // star4 = new Stars(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));
        // star5 = new Stars(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));
        firstSprite = new Sprite(50, 670, spritePower, powerOnTimer);
        firstEnemy = new Enemy(700, 100, 50, enemySpeedMin, enemySpeedMax, enemyDirectionChangeSpeed);
        poweritem1 = new PowerItem(700, 650, 8, powerItemSpeedMax, powerItemSpeedMin, 200);
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
        document.getElementById('toLevelsGA').onclick = () => {
            level.style.display = 'block';
            requestID = undefined;
            gameArea.style.display = 'none';

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
        gameArea.style.display = 'none';
        document.getElementById('gameOver').style.display = 'flex';
        document.getElementById('playAgainGO').onclick = () => {
            document.getElementById('gameOver').style.display = 'none';
            level.style.display = 'block';
        }
    }

    function aWin() {
        requestID = undefined;
        gameArea.style.display = 'none';
        document.getElementById('aWin').style.display = 'flex';
        document.getElementById('playAgain').onclick = () => {
            document.getElementById('aWin').style.display = 'none';
            level.style.display = 'block';
        }
    }

    function update() {
        frames++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // star1.draw();
        // star2.draw();
        // star3.draw();
        // star4.draw();
        // star5.draw();
        firstEnemy.draw();
        firstEnemy.randomPosition();
        poweritem1.draw();
        poweritem1.randomPosition();
        firstSprite.draw();
        firstSprite.position();
        firstSprite.overEnemy(firstEnemy);
        firstSprite.power(poweritem1);
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