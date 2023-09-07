import { 
    foodCount,
    update as updateFood,
    draw as drawFood,
    score
 } from "./foodScript.js";

import { 
    snakeSpeed,
    update as updateSnake,
    draw as drawSnake,
    getStatus,
 } from "./snakeScript.js"

let reqFrame;
let lastRenderTime = 0;
const gameGrid = document.getElementById('gameGrid');
const gameScore = document.getElementById('score')
const startButton = document.getElementById('start');

let hscore;

function main(currentTime) {
    reqFrame = window.requestAnimationFrame(main);

    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if(secondsSinceLastRender < 1 / snakeSpeed) return

    lastRenderTime = currentTime;

    console.log(secondsSinceLastRender);

    update();
    draw();
};  

function update() {
    if (getStatus()) {
        gameOver();
    } else {
        if (foodCount == 0) {
            updateFood();
        };
        updateSnake(); 

        if (score > localStorage.getItem('hscore')) {
            localStorage.setItem('hscore', score);
        } else {
            hscore = localStorage.getItem('hscore');
        };

        document.getElementById('score').innerHTML = "Score: " + score;
    };
};

function draw() {
    let html1 = ""
    for (let x = 0; x < 30; x++) {
        for (let y = 0; y < 30; y++) {
            html1 += "<div class='gridBox'></div>"
        };
    };

    gameGrid.innerHTML = html1;
    drawSnake(gameGrid);
    drawFood(gameGrid);
};

function gameOver() {
        let html1 = `<p class='end_display'>YOU LOST!</p>
        <p id='score' class='end'>Score: ${score}</p>
        <p id='score' class='hend'>Highscore: ${hscore}</p>
        <button class='gameButton' id='retryButton' onclick='reset()'>RETRY</button>`
        document.body.innerHTML = html1; 

        window.cancelAnimationFrame(reqFrame);
};

startButton.addEventListener("click", () => {
    start()
});

function start() {
    document.getElementById('start').remove();
    gameGrid.classList.toggle('off');
    gameScore.classList.toggle('off');
    setTimeout(() => {
        reqFrame = window.requestAnimationFrame(main);
    }, 100);
};