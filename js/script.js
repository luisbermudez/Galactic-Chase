window.onload = () => {
    // Event listeners for buttons when clicked
    introCanvasFunction();

    document.getElementById('start').onclick = () => {
        introArea.style.display = 'none';
        fullScreenMessageDisplay();
    }

    document.getElementById('buttonInstructions').onclick  = () => {
        dIntroCanvas.style.display = 'none';
        instructs.style.display = 'block';
        level.style.display = 'none';
    }

    document.getElementById('toLevels').onclick = () => {
        dIntroCanvas.style.display = 'block';
        instructs.style.display = 'none';
        level.style.display = 'block';
    }

    document.getElementById('mild').onclick = () => {
        if(requestID) {
            return;
        }
        arenaSetup(5, 2, 190, 5, 3.5, 3, 10, 370, 4, 3, 3000);
    }

    document.getElementById('medium').onclick = () => {
        if(requestID) {
            return;
        }
        arenaSetup(6, 2, 150, 3, 4, 4, 90, 370, 4, 3, 3000);
    }
    
    document.getElementById('spicy').onclick = () => {
        if(requestID) {
            return;
        }
        arenaSetup(7, 4, 100, 3, 4, 4, 90, 370, 4, 3, 3000)
    }

    document.getElementById('toLevelsGA').onclick = () => {
        introCanvasFunction();
        dIntroCanvas.style.display = 'block';
        body.style.backgroundColor = 'transparent';
        level.style.display = 'block';
        requestID = undefined;
        gameArea.style.display = 'none';
    }

    // This modulates the game level of difficulty
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

        clearInterval(intervalID);
        dIntroCanvas.style.display = 'none';
        level.style.display = 'none';
        canvas.width = (document.documentElement.clientWidth - 2)*3;
        canvas.height = (document.documentElement.clientHeight - 5)*3;
        canvas.style.width = document.documentElement.clientWidth - 2 + 'px';
        canvas.style.height = document.documentElement.clientHeight - 5 + 'px';
        body.style.backgroundColor = 'green';
        gameArea.style.display = 'flex';

        startGame();
        createStars();
    }

    // Assignes values to variables needed to begin the game
    function startGame () {
        frames = 0;
        introArea.style.display = 'none';
        attackItems = [];
        spriteShadowArr = [];
        startsArr = [];
        powerOn = false;

        firstSprite = new Sprite(300,900, spritePower, powerOnTimer);
        firstEnemy = new Enemy(1200, 900, 190, enemySpeedMin, enemySpeedMax, enemyDirectionChangeSpeed, canvas);
        poweritem1 = new PowerItem(700, 650, 300, powerItemSpeedMax*3, powerItemSpeedMin*3, 150, canvas, ctx);
        aStar = new Star(500, 500);

        firstSprite.draw();
        firstEnemy.draw();

        requestID = requestAnimationFrame(update);
    }

    // Checks user's window's size to display full screen message
    function rightClientWindowSize() {
        if(document.documentElement.clientWidth > 1100 && document.documentElement.clientHeight > 730) {
            return true;
        } else {
            return false;
        }
    }

    // continuously checks the diameter of the enemy to call either aWin or gameOver
    function status() {
        if(firstEnemy.diameter < winDiameterParameter) {
            aWin();
        }
        if(firstEnemy.diameter > lostDiameterParameter) {
            gameOver();
        }
    }

    function reset() {
        startsArr = [];
        attackItems = [];
        spriteShadowArr = [];
        enemyImpactShadow = [];
        frames = 0;
        requestID = undefined;
    }

    function gameOver() {
        reset();
        body.style.backgroundColor = 'transparent';
        gameArea.style.display = 'none';
        document.getElementById('gameOver').style.display = 'flex';
        document.getElementById('playAgainGO').onclick = () => {
            introCanvasFunction();
            dIntroCanvas.style.display = 'block';
            document.getElementById('gameOver').style.display = 'none';
            level.style.display = 'block';
        }
    }

    function aWin() {
        reset()
        body.style.backgroundColor = 'transparent';
        gameArea.style.display = 'none';
        document.getElementById('aWin').style.display = 'flex';
        document.getElementById('playAgain').onclick = () => {
            introCanvasFunction();
            dIntroCanvas.style.display = 'block';
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
            const aExpansiveBullet = new Shadow(firstSprite.x, firstSprite.y, 'rgba(45, 201, 240, 0.17)')
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
        const anImpact = new Shadow(firstEnemy.x, firstEnemy.y, 'rgba(230, 230, 230, 0.15)');
        enemyImpactShadow.push(anImpact);
    }

    function createStars() {
        for(let i = 0; i < 40; i++) {
            const x = Math.floor(Math.random() * (canvas.width + 25 - ( - 25)) + ( - 25));
            const y = Math.floor(Math.random() * (canvas.height + 25 - ( - 25)) + ( - 25));
            const aStar = new Star(x, y, 'rgb(70, 70, 70, 0.92)', 2.7, 0.6);
            startsArr.push(aStar);
        }

        for(let i = 0; i < 4; i++) {
            const x = Math.floor(Math.random() * (canvas.width + 25 - ( - 25)) + ( - 25));
            const y = Math.floor(Math.random() * (canvas.height + 25 - ( - 25)) + ( - 25));
            const aStar = new Star(x, y, 'rgba(100, 100, 100, 0.75)', 4.5, 1);
            startsArr.push(aStar);
        }

        for(let i = 0; i < 3; i++) {
            const x = Math.floor(Math.random() * (canvas.width + 25 - ( - 25)) + ( - 25));
            const y = Math.floor(Math.random() * (canvas.height + 25 - ( - 25)) + ( - 25));
            const aStar = new Star(x, y, 'rgba(100, 100, 100, 0.75)', 5.5, 3);
            startsArr.push(aStar);
        }
    }

    function drawStars() {
        startsArr.forEach((star, index) => {
            star.draw();
            star.position();
        });
    }

    function checkStarsPositioin() {
        startsArr.forEach(star => {
            if(star.x < -30) {
                star.x = canvas.width + 30;
                star.y = Math.floor(Math.random() * (canvas.height + 25 - ( - 25)) + ( - 25));
            }
            if(star.x > canvas.width + 30) {
                star.x = -30;
                star.y = Math.floor(Math.random() * (canvas.height + 25 - ( - 25)) + ( - 25));
            }
            if(star.y < -30) {
                star.y = canvas.height + 30;
                star.x = Math.floor(Math.random() * (canvas.width + 25 - ( - 25)) + ( - 25));
            }
            if(star.y > canvas.height + 30) {
                star.y = -30;
                star.x = Math.floor(Math.random() * (canvas.width + 25 - ( - 25)) + ( - 25));
            }
        });
    }

    function fullScreenMessageDisplay() {
        if(rightClientWindowSize()) {
            level.style.display = 'block';
        } else {
            dIntroCanvas.style.display = 'none'
            userInfo.style.display = 'flex';
            document.getElementById('gotit').onclick = () => {
                userInfo.style.display = 'none';
                level.style.display = 'block';
                dIntroCanvas.style.display = 'block'
            }
        }
    }

    function introCanvasFunction() {
        let anIntroAstro = new IntroAstron();

        intervalID = setInterval(() => {
            introCTX.clearRect(0, 0, dIntroCanvas.width, dIntroCanvas.height);

            anIntroAstro.draw();
            anIntroAstro.position();
        }, 40);
    }

    function update() {
        frames++;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        checkStarsPositioin();
        drawStars();
        createShadow()
        createBullets();
        if(frames % 1800 > 1100) {
            poweritem1.trailDrawing();
            poweritem1.draw();
            firstSprite.power(poweritem1);
        }
        firstEnemy.draw();
        drawShadow(enemyImpactShadow, firstEnemy, 1);
        drawShadow(spriteShadowArr, firstSprite, 2);
        firstEnemy.randomPosition();
        firstEnemy.imageSwitch();
        poweritem1.randomPosition();
        firstSprite.draw();
        drawBullets();
        firstSprite.position();
        firstSprite.overEnemy(firstEnemy);
        status();

        if(requestID) {
            requestID = requestAnimationFrame(update);
        }
    }

    // Event listeners for keyboard when playing
    addEventListener('keydown', (e) => {
        switch(e.keyCode) {
            case 83:
                firstSprite.speedY += 6.5;
                firstEnemy.diameter += enemyDiameterGrowth;
                startsArr.forEach(star => {
                    star.speedY-= 0.4;
                })
                break;
            case 87:
                firstSprite.speedY -= 6.5;
                firstEnemy.diameter += enemyDiameterGrowth;
                startsArr.forEach(star => {
                    star.speedY+= 0.4;
                })
                break;
            case 68:
                firstSprite.speedX += 6.5;
                firstEnemy.diameter += enemyDiameterGrowth;
                startsArr.forEach(star => {
                    star.speedX-= 0.4;
                })
                break;
            case 65:
                firstSprite.speedX -= 6.5;
                firstEnemy.diameter += enemyDiameterGrowth;
                startsArr.forEach(star => {
                    star.speedX+= 0.4;
                })
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
                startsArr.forEach(star => {
                    star.speedY-= 0.4;
                })
                break;
            case 87:
                firstSprite.speedY = - spriteZeroGravity;
                startsArr.forEach(star => {
                    star.speedY+= 0.4;
                })
                break;
            case 68:
                firstSprite.speedX = spriteZeroGravity;
                startsArr.forEach(star => {
                    star.speedX-= 0.4;
                })
                break;
            case 65:
                firstSprite.speedX = - spriteZeroGravity;
                startsArr.forEach(star => {
                    star.speedX+= 0.4;
                })
                break;
            case 75:
                shootABullet = true;
                break;
        }
    });

    window.addEventListener('deviceorientation', (e) => {
        document.getElementById('Orientation_a').innerHTML = `Alpha: ${e.alpha}`;
        document.getElementById('Orientation_b').innerHTML = `Beta: ${e.beta}`;
        document.getElementById('Orientation_g').innerHTML = `Gamma: ${e.gamma}`;
    });
}