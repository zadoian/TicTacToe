let XTurn = true;
let gameOver = false;
let xScore = 0;
let oScore = 0;

function play(event) {
    if (gameOver || event.target.innerHTML !== "-") return;

    event.target.innerHTML = XTurn ? "X" : "O";
    display.innerHTML = `Player ${(XTurn ? "O" : "X")} Turn`;
    if (checkWin()) {
        display.innerHTML = `Player ${XTurn ? "X" : "O"} Wins!`;
        updateScore(XTurn ? "X" : "O");
        gameOver = true;
        return;
    } else if (isBoardFull()) {
        display.innerHTML = "It's a Draw!";
        gameOver = true;
        return;
    }

    XTurn = !XTurn;
}

function checkWin() {
    const buttons = document.querySelectorAll("#game-board button");
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return buttons[a].innerHTML !== "-" &&
            buttons[a].innerHTML === buttons[b].innerHTML &&
            buttons[a].innerHTML === buttons[c].innerHTML;
    });
}

function isBoardFull() {
    const buttons = document.querySelectorAll("#game-board button");
    return Array.from(buttons).every(button => button.innerHTML !== "-");
}

function updateScore(winner) {
    if (winner === "X") {
        xScore++;
        document.getElementById("x-score").innerText = xScore;
    } else {
        oScore++;
        document.getElementById("o-score").innerText = oScore;
    }
}

function resetGame() {
    const buttons = document.querySelectorAll("#game-board button");
    buttons.forEach(button => button.innerHTML = "-");
    display.innerHTML = "Click 'Start Game' to begin!";
    gameOver = false;
    XTurn = true;
}

function resetScore() {
    xScore = 0;
    oScore = 0;
    document.getElementById("x-score").innerText = xScore;
    document.getElementById("o-score").innerText = oScore;
    resetGame();
}

function startRandom() {
    XTurn = Math.random() < 0.5;
    resetGame();
    display.innerHTML = `Player ${(XTurn ? "X" : "O")} Starts!`;
}

document.querySelectorAll("#game-board button").forEach(button => {
    button.addEventListener("click", play);
});
