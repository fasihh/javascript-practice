var turn = 1;
var idSet = new Set([]);
var gameArray = [[null, null, null], [null, null, null], [null, null, null]]; 
const gameDisplay = document.querySelector("#grid");
const gameButton = document.querySelector("#game_start");
var gameStarted = false;


gameButton.addEventListener('click', function() {
    gameDisplay.classList.toggle('active');
    gameButton.classList.toggle('deactive');
});


function panelFunc(panelID) {
    
    if (idSet.has(panelID) == false) {
        if (turn % 2 == 0) {
            document.getElementById(panelID).innerHTML = '<img src="circle.png">';
            circleObj = { 
                type: "circle",
            };
            gameArray[Number(panelID.charAt(0))][Number(panelID.charAt(1))] = circleObj;

            gameFunc(circleObj.type);
        } else {
            document.getElementById(panelID).innerHTML = '<img src="tick.png">';
            tickObj = {
                type: "tick",
            };
            gameArray[Number(panelID.charAt(0))][Number(panelID.charAt(1))] = tickObj;

            gameFunc(tickObj.type);
        };

        idSet.add(panelID);
        turn++;

        if (turn == 10) {
            gameDraw();
        };
    };

    console.log(turn);
};


function gameFunc(element) {
    var count = 0;

    // checking for rows
    for (let i = 0; i < gameArray.length; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameArray[i][j] != null) {
                if (gameArray[i][j].type == element) {
                    count++;
                } else {
                    break;
                };
            };
        };

        if (count == 3) {
            return gameWin(element);
        } else {
            count = 0;
        };
    };

    // checking for coloumns
    for (let q = 0; q < gameArray.length; q++) {
        for (let r = 0; r < 3; r++) {
            if (gameArray[r][q] != null) {
                if (gameArray[r][q].type == element) {
                    count++;
                } else {
                    break;
                };
            };
        };

        if (count == 3) {
            return gameWin(element);
        } else {
            count = 0;
        };
    };  

    // checking for diagnol 1
    let diagnol1 = ["00", "11", "22"];
    checkDiagnol(diagnol1, element);

    // checking for diagnol 2
    let diagnol2 = ["02", "11", "20"];
    checkDiagnol(diagnol2, element);

    for (let x of gameArray) {
        console.log(x);
    };
};


function checkDiagnol(diagnolArray, element) {
    let count = 0;
    for (let y = 0; y < 3; y++) {
        if (gameArray[diagnolArray[y].charAt(0)][diagnolArray[y].charAt(1)] != null) {
            if (gameArray[Number(diagnolArray[y].charAt(0))][Number(diagnolArray[y].charAt(1))].type == element) {
                count++;
            } else {
                break;
            };
        };

        if (count == 3) {
            return gameWin(element);
        };
    };
};


function gameWin(element) {
    let html1 = `
    <div id="grid" class="end">
        <div class="end_text"><b>${element} has won!</b></div>
        <button class="RetryButton" id="retry" onclick="refreshGame()">Retry!</button>  
    </div>
    `;
    document.getElementById("grid").innerHTML = html1;
};


function refreshGame() {
    idSet.clear();
    turn = 1;
    
    for (let x = 0; x < 3; x++) {
        gameArray[x] = [null, null, null]
    }

    console.log(idSet);
    console.log(turn);
    for (let x of gameArray) {
        console.log(x);
    };

    remakeGrid();
};


function gameDraw() {
    let html1 = `
    <div id="grid" class="end">
        <div class="end_text"><b>DRAW</b><div>
        <button class="RetryButton" id="retry" onclick="refreshGame()">Retry!</button>
    </div>  
    `;
    document.getElementById("grid").innerHTML = html1;
};

function remakeGrid() {
    let gridHtml = `
    <button class="GridButton" id="00" onclick="panelFunc(id)">
        <img src="blank.png">
    </button>
    <button class="GridButton" id="01" onclick="panelFunc(id)">
        <img src="blank.png">
    </button>
    <button class="GridButton" id="02" onclick="panelFunc(id)">
        <img src="blank.png">
    </button>

    <br>

    <button class="GridButton" id="10" onclick="panelFunc(id)">
        <img src="blank.png">
    </button>
    <button class="GridButton" id="11" onclick="panelFunc(id)">
        <img src="blank.png">
    </button>
    <button class="GridButton" id="12" onclick="panelFunc(id)">
        <img src="blank.png">
    </button>

    <br>

    <button class="GridButton" id="20" onclick="panelFunc(id)">
        <img src="blank.png">
    </button>
    <button class="GridButton" id="21" onclick="panelFunc(id)">
        <img src="blank.png">
    </button>
    <button class="GridButton" id="22" onclick="panelFunc(id)">
        <img src="blank.png">
    </button>
    `;
    document.getElementById("grid").innerHTML = gridHtml;
};