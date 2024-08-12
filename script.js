function Gameboard() {
    const board = new Array(9).fill("");

    const getBoard = () => board;

    const setToken = (value, index) => (board[index] = value);

    return { getBoard, setToken };
}

function Player(name, token) {
    const playerName = name;
    const playerToken = token;
    const getName = () => playerName;
    const getToken = () => playerToken;

    return { getName, getToken };
}

function DisplayController() {
    const renderResult = () => {};

    const renderBoard = (board, callback, turn) => {
        // document.getElementById("player-form").classList = "form";

        renderTurn(turn)

        const boardElement = document.getElementById("board");

        boardElement.textContent = "";

        board.forEach((cell, index) => {
            const cellElement = document.createElement("div");
            cellElement.classList = "cell";
            cellElement.dataset.cell = index;
            cellElement.textContent = cell;
            if (cell) cellElement.classList = "cell clicked";
            if (!cell) cellElement.addEventListener("click", callback);
            boardElement.appendChild(cellElement);
        });
    };

    const renderStart = () => {};

    const renderTurn = (turn) => {
      const turnEle = document.getElementById("turn")
      turnEle.textContent = `Turn: ${turn.toUpperCase()}`
    }

    return { renderBoard };
}

function Game() {
    let turn = undefined;
    let player1 = undefined;
    let player2 = undefined;
    const board = Gameboard();
    const controller = DisplayController();

    const makeMove = (event) => {
        const id = event.target.dataset.cell;

        board.setToken(turn, id);

        toggleTurn();
        
        controller.renderBoard(board.getBoard(), makeMove, turn);
    };

    const check = () => {};

    const setPlayers = () => {
        player1 = Player(document.getElementById("player1").value, "x");
        player2 = Player(document.getElementById("player2").value, "o");
    };

    const toggleTurn = () => (turn === "x" ? (turn = "o") : (turn = "x"));

    const startGame = (event) => {
        turn = "x";
        event.preventDefault();
        setPlayers();
        controller.renderBoard(board.getBoard(), makeMove, turn);
        document.getElementById("board").style.display = "grid";
        document.getElementById("turn").style.display = "block"
        document.getElementById("welcome").style.display = "none";
    };

    const resetGame = () => {};

    document
        .getElementById("player-form")
        .addEventListener("submit", startGame);
}

Game();
