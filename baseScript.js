var turn = 1;
var idSet = new Set([]);
var gameArray = [[null, null, null], [null, null, null], [null, null, null]]; 


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
            return displayFunc(element);
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
            return displayFunc(element);
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

    if (turn == 10) {
        gameDraw();
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
            return displayFunc(element);
        };
    };
};


function displayFunc(element) {
    html1 = `
    <p style="font-size:100px;font-family:Verdana;"><b>${element} has won!</b><p>
    <button class="RetryButton" id="retry" onclick="refreshPage()">Retry!</button>  
    `;
    document.getElementById("grid").innerHTML = html1;
};


function refreshPage() {
    location.reload();
};


function gameDraw() {
    document.getElementById("grid").innerHTML = "<p>DRAW</p>"
};