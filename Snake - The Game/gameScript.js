var speed = 150;
var up = false;
var right = false;
var left = false;
var down = false;
var movement;

class Snake {
    constructor() {
        this.startLength = 1;
    };

    createSnake(pos) {
        this.snake = [];

        let posObj = {
            x : pos,
            y : pos
        };

        for (let i = 0; i < this.startLength; i++) {
            this.snake.push(posObj);
        };
    };

    addToSnake(position) {
        this.snake.unshift(position);
    };

    getLength() {
        return this.snake.length;
    };

    setSnake(snake) {
        this.snake = snake;
    };

    getSnake() {
        return this.snake;
    };
};


class Game {
    constructor(maxlength) {
        this.maxLength = maxlength
        this.startPos = this.maxLength / 2;

        this.createGrid();
        this.snakeObj = new Snake(this.startPos);
    };

    createGrid() {
        this.GridArray = [];
        for (let i = 0; i < this.maxLength; i++) {
            let tempList = [];
        
            for (let j = 0; j < this.maxLength; j++) {
                tempList.push(-1);
            };
        
            this.GridArray.push(tempList);
        };

        let html1 = "";

        for (let i = 0; i < this.maxLength; i++) {
            for (let j = 0; j < this.maxLength; j++) {
                html1 += `<div id="${String(j) + '-' + String(i)}"></div>`;
            };
        };
        document.getElementById('grid').innerHTML = html1;
    }

    showGrid() {
        try {
            for (let i = 0; i < this.maxLength; i++) {
                for (let j = 0; j < this.maxLength; j++) {
    
                    if (this.GridArray[i][j] == 1000) {
                        let styles = {
                            "background-color" : "#D72323",
                            "border" : "1px solid #F5EDED",    
                            "width": "25px",
                            "height": "25px"
                        };
                
                        let obj = document.getElementById(String(j) + "-" + String(i));
                        
                        Object.assign(obj.style, styles);
    
                    } else if (this.GridArray[i][j] == 999) {
                        let styles = {
                            "background-color" : "#3E3636",
                            "border" : "1px solid #F5EDED",
                            "width": "25px",
                            "height": "25px"
                        };
    
                        let obj = document.getElementById(String(j) + "-" + String(i));
                        Object.assign(obj.style, styles);
    
    
                        let headStyle = {
                            "background-color" : "#1c1111",
                            "border" : "1px solid white",
                            "width": "25px",
                            "height": "25px"
                        };
    
                        let snake = this.snakeObj.getSnake();
                        let objHead = document.getElementById(String(snake[0].x) + "-" + String(snake[0].y));
                        Object.assign(objHead.style, headStyle);
    
                    } else {
                        let styles = {
                            "background-color" : "#000000",
                            "width" : "25px",
                            "height" : "25px",
                            "border" : "1px solid #151514"
                        };
    
                        let obj = document.getElementById(String(j) + "-" + String(i));
            
                        Object.assign(obj.style, styles);
                    }; 
                };
            };
        } catch {
            return null;
        };
    };

    consoleGrid() {
        for (let x of this.GridArray) {
            console.log(x);
        };
    };

    spawnSnake() {
        this.snakeObj.createSnake(this.startPos);
        this.GridArray[this.startPos][this.startPos] = 999;
    };

    newFoodPos(gridLength) {
        let posObj = {
            randX : Math.floor(Math.random() * (gridLength)),
            randY : Math.floor(Math.random() * (gridLength))
        }

        return posObj;
    };

    createFood() {
        let posObj;
        do {
            posObj = this.newFoodPos(this.maxLength);
        } while (this.GridArray[posObj.randX][posObj.randY] == 999)

        this.GridArray[posObj.randX][posObj.randY] = 1000;
        
        document.getElementById('score').innerHTML = `<div id="score">Score: ${this.snakeObj.getLength() - 1}</div>`
    };


    run(move) {
        let newPos = this.setNewPos(move)

        let snake = this.snakeObj.getSnake();

        if (newPos.x >= this.maxLength || newPos.y >= this.maxLength || newPos.x < 0 || newPos.y < 0) {
            this.gameOver();
        } else {
            if (this.snakeObj.getLength() > 1) {
                let tail;
    
                if (this.GridArray[newPos.y][newPos.x] == 1000) {
                    this.snakeObj.addToSnake(newPos);
                    this.createFood();
                } else if (this.GridArray[newPos.y][newPos.x] == 999) {
                    this.gameOver();
                } else {
                    snake.unshift(newPos);
                    tail = snake.pop();
                    this.GridArray[tail.y][tail.x] = -1;
                }
                
            } else {
    
                if (this.GridArray[newPos.y][newPos.x] == 1000) {
                    this.snakeObj.addToSnake(newPos);
                    this.createFood();
                } else {
                    this.snakeObj.setSnake([newPos]);
                    this.GridArray[snake[0].y][snake[0].x] = -1;
                };
            };
    
            this.GridArray[newPos.y][newPos.x] = 999;
            console.log(this.snakeObj.getSnake());
        }
    }

    setNewPos(move) {
        let newHeadPos = {
            x : this.snakeObj.getSnake()[0].x,
            y : this.snakeObj.getSnake()[0].y
        };

        switch(move) {
            case "right":
                newHeadPos['x'] += 1;
                return newHeadPos;

            case "up":
                newHeadPos['y'] -= 1;
                return newHeadPos;

            case "down":
                newHeadPos['y'] += 1;
                return newHeadPos;

            case "left":
                newHeadPos['x'] -= 1;
                return newHeadPos;
        }; 
    };

    gameOver() {
        clearInterval(movement)
        let html1 = `<p class='end_display'>YOU LOST!</p>
        <p id='score' class='end'>Score: ${this.snakeObj.getLength() - 1}</p>
        <button class='gameButton' id='retryButton' onclick='reset()'>RETRY</button>`
        document.body.innerHTML = html1;

        movement = undefined;
    };

    setup() {
        this.createGrid();
        this.spawnSnake();
        this.createFood();
        this.consoleGrid();
        this.showGrid();
    };
};

var game = new Game(30);

game.setup(); 

function start() {
    const startBtn = document.getElementById('startButton');
    const gameGrid = document.querySelector("#grid");
    const gameScore = document.querySelector("#score");
    const disclaiemr = document.querySelector("#disclaimer");

    startBtn.addEventListener("click", function() {
        gameGrid.classList.toggle("deactive");
        gameScore.classList.toggle("deactive");
        
        setTimeout(() => {
            up = true;

            movement = setInterval(() => {
                direction("up");
            }, speed);
        }, speed);

        disclaiemr.remove();
        startBtn.remove();
    });
};

function reset() {
    document.body.innerHTML = `<div id="score"></div>
    <div id="grid"></div>`;

    game.setup();

    setTimeout(() => {
        up = true;

        movement = setInterval(() => {
            direction("up");
        }, speed);
    }, speed);
};

function direction(move) {
    game.run(move);
    game.showGrid();
    game.consoleGrid();
    console.log(up, down, left, right, move);
};


window.addEventListener("keydown", e => {
    if (movement !== undefined) {
        switch (e.key) {
            case "a":
                if (right == true) {
                    break;
                } else {
                    left = true;
                    right = false;
                    up = false;
                    down = false;
    
                    clearInterval(movement)
                    movement = setInterval(() => {
                        direction("left");
                    }, speed);
                };

                    break;
            case "d":
                if (left == true) {
                    break;
                } else {
                    right = true;
                    left = false;
                    up = false;
                    down = false;
    
                    clearInterval(movement)
                    movement = setInterval(() => {
                        direction("right");
                    }, speed);

                    break;
                };
            case "s":
                if (up == true) {
                    break;
                } else {
                    down = true;
                    up = false;
                    left = false;
                    right = false;
    
                    clearInterval(movement)
                    movement = setInterval(() => {
                        direction("down");
                    }, speed);
                };

                break;
            case "w":
                if (down == true) {
                    break;
                } else {
                    up = true;
                    down = false;   
                    left = false;
                    right = false;
    
                    clearInterval(movement)
                    movement = setInterval(() => {
                        direction("up");
                    }, speed);
                };

                break;
        };
    };
});


