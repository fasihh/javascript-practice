import { snakeBody } from "./snakeScript.js";

export let foodCount = 0;
export let score = 0;
let foodPosition = { x : 0, y : 0};

export function update() {
    foodPosition.x = Math.floor(Math.random() * 30) + 1;
    foodPosition.y = Math.floor(Math.random() * 30) + 1;
    foodCount++;
};

export function draw(gameGrid) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodPosition.y;
    foodElement.style.gridColumnStart = foodPosition.x;
    foodElement.classList.add('food');
    gameGrid.appendChild(foodElement);
};

export function getFoodPosition() {
    return foodPosition;
};

export function increaseSnakeSize(amount) {
    for (let i = 0; i < amount; i++) {
        snakeBody.push({ x : foodPosition.x, y : foodPosition.y});
    }
    
    score += amount;
};

export function reduceFoodCount() {
    foodCount--;
};