window.onload = () => {
    let firstSprite;
    let firstEnemy;

    

    const gameArea = document.getElementById('gameArea');
    const introArea = document.getElementById('introArea');
    const userInfo = document.getElementById('info');
    const level = document.getElementById('level');
    const levels = document.getElementById('levels')

    introArea.style.display = 'flex';
    introArea.style.flexDirection = 'column';
    introArea.style.alignItems = 'center';

    document.getElementById('start').onclick = () => {
        introArea.style.display = 'none';
        
        if(document.documentElement.clientWidth > 1100 &&
            document.documentElement.clientHeight > 730) {
                level.style.display = 'inline';
            } else {
                userInfo.style.display = 'flex';
                userInfo.style.flexDirection = 'column';
                userInfo.style.alignItems = 'center';
                document.getElementById('gotit').onclick = () => {
                    userInfo.style.display = 'none';
                    level.style.display = 'inline';
                }
            }
    }

    levels.addEventListener('click', (e) => {
        if(requestID) {
            return;
        }

        switch(e.target.innerHTML) {
            case 'Mild':
                enemySpeedMax = 1;
                enemySpeedMin = 0;
                enemyDirectionChangeSpeed = 200;
                enemyDiameterGrowth = 4;
                spriteSpeed = 2;
                spritePower = 10;
                winDiameterParameter = 30;
                lostDiameterParameter = 150;
                break;
            case 'Medium':
                enemySpeedMax = 4;
                enemySpeedMin = 1;
                enemyDirectionChangeSpeed = 80;
                enemyDiameterGrowth = 5;
                spriteSpeed = 4;
                spritePower = 15;
                winDiameterParameter = 15;
                lostDiameterParameter = 150;
                break;
            case 'Spicy':
                enemySpeedMax = 6;
                enemySpeedMin = 3;
                enemyDirectionChangeSpeed = 65;
                enemyDiameterGrowth = 4;
                spriteSpeed = 8;
                spritePower = 15;
                winDiameterParameter = 10;
                lostDiameterParameter = 160;
                break;
        }


        level.style.display = 'none';
        
        gameArea.style.display = 'inline';
        gameArea.style.background = 'white';
        gameArea.style.display = 'flex';
        gameArea.style.justifyContent = 'center';

        startGame();
    });

    function startGame () {
        
        introArea.style.display = 'none';
        firstSprite = new Sprite(50, 600, spritePower);
                enemySpeedMax = 7;
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