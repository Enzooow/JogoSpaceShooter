const playerShip = document.querySelector('.spaceship');
const playerArea = document.querySelector('#main-play-area');
const bossesImg = ['img/boss1.png', 'img/boss2.png', 'img/boss3.png'];
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');
let bossInterval;
var pontuacao = document.querySelector('.pontuacao');

//movimentação e interação

function flyShip(event) {
    if(event.key === "ArrowUp") {
        event.preventDefault();
        moveUp();
    }
    else if(event.key === "ArrowDown") {
        event.preventDefault();
        moveDown();
    }
    else if(event.key === " ") {
        event.preventDefault();
        fireLaser();
    }
}

//movimento de subir

function moveUp() {
    let topPosition = getComputedStyle(playerShip).getPropertyValue('top');
    if(topPosition === "0px") {
        return;
    }
    else {
        let position = parseInt(topPosition);
        position -= 50;
        playerShip.style.top = `${position}px`;    
    }
}

//movimento de descer

function moveDown() {
    let topPosition = getComputedStyle(playerShip).getPropertyValue('top');
    if(topPosition === "550px") {
        return;
    }
    else {
        let position = parseInt(topPosition);
        position += 50;
        playerShip.style.top = `${position}px`;
    }
}

//funções de tiro

function fireLaser() {
    let laser = createLaserElement();
    playerArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement() {
    let xPos = parseInt(window.getComputedStyle(playerShip).getPropertyValue('left'));
    let yPos = parseInt(window.getComputedStyle(playerShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'img/ChargeShot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPos}px`;
    newLaser.style.top = `${yPos - 10}px`;
    return newLaser;
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPos = parseInt(laser.style.left);
        let boss = document.querySelectorAll('.boss');

        boss.forEach((boss) => {
            if(checkLaserColision(laser, boss)) {
                boss.src = 'img/explosion.png';
                boss.classList.remove('boss');
                boss.classList.add('dead-boss');
                var currentScore = parseInt(pontuacao.innerText);
                currentScore++;
                pontuacao.innerText = currentScore;
            }
        })
        
        if(xPos === 340) {
            laser.remove();
        }
        else {
            laser.style.left = `${xPos + 8}px`;
        }
    }, 10);
}

//função de criação de inimigos

function createBoss() {
    let newBoss = document.createElement('img');
    let BossShuffle = bossesImg[Math.floor(Math.random() * bossesImg.length)]; //Sorteio bosses
    newBoss.src = BossShuffle;
    newBoss.classList.add('boss');
    newBoss.classList.add('boss-transition');
    newBoss.style.left = '370px';
    newBoss.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    playerArea.appendChild(newBoss);
    moveBoss(newBoss);
}

//função de movimento do inimigo

function moveBoss(boss) {
    let moveBossInterval = setInterval(() => {
        let xPos = parseInt(window.getComputedStyle(boss).getPropertyValue('left'));
        if(xPos <= 50) {
            if(Array.from(boss.classList).includes('dead-boss')) {
                boss.remove();
            }
            else{
                gameOver();
            }
        }
        else {
            boss.style.left = `${xPos - 4}px`;
        }
    }, 30);
}

//função de colisão

function checkLaserColision(laser, boss) {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;
    let bossTop = parseInt(boss.style.top);
    let bossLeft = parseInt(boss.style.left);
    let bossBottom = bossTop - 30;
    if(laserLeft != 340 && laserLeft + 40 >= bossLeft) {
        if(laserTop <= bossTop && laserTop >= bossBottom) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

//ínicio do game
startButton.addEventListener('click', (event) => {
    playGame();
})

function playGame() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown', flyShip);
    bossInterval = setInterval(() => {
        createBoss();
    }, 2000);
}

//função de game over

function gameOver() {
    window.removeEventListener('keydown', flyShip);
    clearInterval(bossInterval);
    let boss = document.querySelectorAll('.boss');
    boss.forEach((boss) => boss.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    setTimeout(() => {
        alert('Game Over!!!');
        playerShip.style.top = "250px";
        playerShip.style.display = "block";
        instructionsText.style.display = "block";
    });
}