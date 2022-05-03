const playerShip = document.querySelector('.spaceship');
const yourArea = document.querySelector('#main-play-game');

//movimentação e interação

function flyShip(event) {
    if(event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    }
    else if(event.key === 'ArrowDown') {
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
    if(topPosition === '0px') {
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
    if(topPosition === "540px") {
        return;
    }
    else {
        let position = parseInt(topPosition);
        position += 50;
        playerShip.style.top = `${position}px`;
    }
}

window.addEventListener('keydown', flyShip);