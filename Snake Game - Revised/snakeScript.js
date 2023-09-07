import { 
    getFoodPosition,
    increaseSnakeSize,
    reduceFoodCount,
    score
 } from "./foodScript.js";

import {
    getInputDirection
} from "./inputsScript.js"

var gameOver = false;
export var snakeSpeed = 20/3; 
export const snakeBody = [{x : 16, y : 15}];
const amount = 1;

export function update() {
    switch (score) {
        case 5:
            snakeSpeed = 8;
            break;
        case 10:
            snakeSpeed = 10;
            break;
        case 15:
            snakeSpeed = 15;
            break;
        case 20:
            snakeSpeed = 20;
            break;
    };

    const inputDirection = getInputDirection();

    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = {... snakeBody[i] };
    };

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;

    if (snakeBody[0].x > 30 || snakeBody[0].y > 30 || snakeBody[0].x < 1 || snakeBody[0].y < 1) {
        gameOver = true;
    };

    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeBody[0].x == snakeBody[i].x && snakeBody[0].y == snakeBody[i].y) {
            gameOver = true;
            console.log(snakeBody[0], snakeBody[i])
            return;
        };
    };

    let foodPos = getFoodPosition();

    if (snakeBody[0].x == foodPos.x && snakeBody[0].y == foodPos.y) {
        reduceFoodCount();
        // snakeBody.unshift(foodPos);
        increaseSnakeSize(amount)
    };
};

export function draw(gameGrid) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        if (segment == snakeBody[0]) {
            snakeElement.classList.add('snakeHead');
        } else {
            snakeElement.classList.add('snake');
        };
        gameGrid.appendChild(snakeElement);
    });
};

export function getStatus() {
    return gameOver;
};

function showSnake() {
    for (let x of snakeBody) {
        console.log(x);
    };
};
