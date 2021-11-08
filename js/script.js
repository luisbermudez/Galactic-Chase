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
        arenaSetup(3, 2, 150, 3, 3.5, 4, 70, 320, 4, 3, 3000);
    }

    document.getElementById('medium').onclick = () => {
        if(requestID) {
            return;
        }
        arenaSetup(4, 2, 150, 4, 4, 4, 50, 320, 4, 3, 3000);
    }
    
    document.getElementById('spicy').onclick = () => {
        if(requestID) {
            return;
        }
        arenaSetup(5, 4, 100, 6, 4, 4, 30, 320, 4, 3, 3000)
    }

    function startGame () {
        introArea.style.display = 'none';
        attackItems = [];
        spriteShadowArr = [];
        powerOn = false;
        firstSprite = new Sprite(50, 670, spritePower, powerOnTimer);
        firstEnemy = new Enemy(700, 100, 100, enemySpeedMin, enemySpeedMax, enemyDirectionChangeSpeed);
        poweritem1 = new PowerItem(700, 650, 6, powerItemSpeedMax*2, powerItemSpeedMin*2, 150);
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

    let arenaSetup = (a, b, c, d, e, f, g, h, i, j, k) => {
        enemySpeedMax = a;
        enemySpeedMin = b;
        enemyDirectionChangeSpeed = c;
        enemyDiameterGrowth = d;
        spriteZeroGravity = e;
        spritePower = f;
        winDiameterParameter = g;
        lostDiameterParameter = h;
        powerItemSpeedMax = i;
        powerItemSpeedMin = j;
        powerOnTimer = k;

        level.style.display = 'none';
        gameArea.style.display = 'flex';

        startGame();
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
                    createImpact();
                    firstSprite.x < firstEnemy.x ? firstEnemy.x += 10 : firstEnemy.x -= 10;
                    firstSprite.y < firstEnemy.y ? firstEnemy.y += 10 : firstEnemy.y -= 10;
                }
        });
    }

    function createShadow() {
        if(shadowOn) {
            const aExpansiveBullet = new Shadow(firstSprite.x, firstSprite.y, 'rgba(142, 43, 199, 0.15)')
            spriteShadowArr.push(aExpansiveBullet);
        }
    }

    function drawShadow(arr, object, multip) {
        arr.forEach((bullet, index) => {
            bullet.draw();
            bullet.trayectory();
            if(bullet.diameter > object.diameter * multip) {
                arr.splice(index, 1);
            }
        });
    }

    function createImpact() {
        const anImpact = new Shadow(firstEnemy.x, firstEnemy.y, 'rgba(110, 110, 110, 0.15)');
        enemyImpactShadow.push(anImpact);
    }

    function update() {
        frames++;
        // ctx.fillStyle = "rgb(18, 24, 34)";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
        createShadow()
        createBullets();
        firstEnemy.draw();
        drawShadow(enemyImpactShadow, firstEnemy, 1);
        drawShadow(spriteShadowArr, firstSprite, 3);
        firstEnemy.randomPosition();
        firstEnemy.imageSwitch();
        poweritem1.randomPosition();
        firstSprite.draw();
        poweritem1.draw();
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
            case 75:
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
            case 75:
                shootABullet = true;
                break;
        }
    });
}