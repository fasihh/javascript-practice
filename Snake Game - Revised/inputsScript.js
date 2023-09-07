let inputDirection = {x : 0, y : -1};
let lastInputDirection = {x : 0, y : 0};

window.addEventListener("keydown", e => {
    console.log(e.key.toLowerCase());
    switch (e.key.toLowerCase()) {
        case "a" || "arrowleft":
            if (lastInputDirection.x === 1) break;
            inputDirection = { x : -1, y : 0};
            break;
        case "s" || "arrowdown":
            if (lastInputDirection.y === -1) break;
            inputDirection = { x : 0, y : 1};
            break;
        case "d" || "arrowright":
            if (lastInputDirection.x === -1) break;
            inputDirection = { x : 1, y : 0};
            break;
        case "w" || "arrowup":
            if (lastInputDirection.y === 1) break;
            inputDirection = { x : 0, y : -1};
            break;
    };
});

export function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
};