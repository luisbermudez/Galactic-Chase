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
        enemyDirectionChangeSpeed = 150;
        enemyDiameterGrowth = 3;
        spriteZeroGravity = 3.5;
        spritePower = 5;
        winDiameterParameter = 30;
        lostDiameterParameter = 220;
        powerItemSpeedMax = 4;
        powerItemSpeedMin = 3;
        powerOnTimer = 3000;


        level.style.display = 'none';
        gameArea.style.display = 'flex';

        startGame();
    }

    document.getElementById('medium').onclick = () => {
        if(requestID) {
            return;
        }

        enemySpeedMax = 4;
        enemySpeedMin = 2;
        enemyDirectionChangeSpeed = 150;
        enemyDiameterGrowth = 4;
        spriteZeroGravity = 4;
        spritePower = 5;
        winDiameterParameter = 30;
        lostDiameterParameter = 220;
        powerItemSpeedMax = 4;
        powerItemSpeedMin = 3;
        powerOnTimer = 2000;

        level.style.display = 'none';
        gameArea.style.display = 'flex';

        startGame();
    }
    
    document.getElementById('spicy').onclick = () => {
        if(requestID) {
            return;
        }

        enemySpeedMax = 5;
        enemySpeedMin = 4;
        enemyDirectionChangeSpeed = 100;
        enemyDiameterGrowth = 4;
        spriteZeroGravity = 4;
        spritePower = 5;
        winDiameterParameter = 30;
        lostDiameterParameter = 220;
        powerItemSpeedMax = 4;
        powerItemSpeedMin = 3;
        powerOnTimer = 6000;

        level.style.display = 'none';
        gameArea.style.display = 'flex';

        startGame();
    }

    function startGame () {
        introArea.style.display = 'none';
        attackItems = [];
        spriteShadowArr = [];
        powerOn = false;
        firstSprite = new Sprite(50, 670, spritePower, powerOnTimer);
        firstEnemy = new Enemy(700, 100, 70, enemySpeedMin, enemySpeedMax, enemyDirectionChangeSpeed);
        poweritem1 = new PowerItem(700, 650, 6, powerItemSpeedMax, powerItemSpeedMin, 150);
        attackItem1 = new AttackItems(firstSprite.x, firstSprite.y);
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

    function createBullets() {
        if(bulletReady && shootABullet) {
            const firstBullet = new AttackBullet(firstSprite.x, firstSprite.y); // Trayectory test
            attackItems.push(firstBullet);
            shootABullet = false;
        }
    }

    function drawBullets() {
        attackItems.forEach((bullet, index) => {
            bullet.draw();
            bullet.trayectory(firstEnemy, firstSprite);
            if(bullet.x < firstEnemy.x + firstEnemy.diameter/3 && bullet.x > firstEnemy.x - firstEnemy.diameter/3 &&
                bullet.y < firstEnemy.y + firstEnemy.diameter/3 && bullet.y > firstEnemy.y - firstEnemy.diameter/3) {
                    attackItems.splice(index, 1);
                    firstEnemy.diameter -= spritePower;
                }
        });
    }

    function createspriteShadow() {
        if((!shootABullet) && shadowOn) {
            const aExpansiveBullet = new spriteShadow(firstSprite.x, firstSprite.y)
            spriteShadowArr.push(aExpansiveBullet);
        }
    }

    function drawspriteShadow() {
        spriteShadowArr.forEach((bullet, index) => {
            bullet.draw();
            bullet.trayectory();
            if(bullet.diameter > firstSprite.diameter * 3) {
                spriteShadowArr.splice(index, 1);
            }
        });
    }

    function update() {
        frames++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        createspriteShadow()
        createBullets();
        firstEnemy.draw();
        drawspriteShadow()
        firstEnemy.randomPosition();
        poweritem1.draw();
        poweritem1.randomPosition();
        firstSprite.draw();
        drawBullets();
        attackItem1.draw();
        attackItem1.trayectory(firstSprite);
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
                if (!shootABullet) return;
                shootABullet = false;
                break;
        }
    });

    addEventListener('keyup', (e) => {
        switch(e.keyCode) {
            case 83:
                firstSprite.speedY = spriteZeroGravity;
                break;
            case 87:
                firstSprite.speedY = - spriteZeroGravity;
                break;
            case 68:
                firstSprite.speedX = spriteZeroGravity;
                break;
            case 65:
                firstSprite.speedX = - spriteZeroGravity;
                break;
            case 76:
                shootABullet = true;
                break;
        }
    });
}