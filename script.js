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

  const renderBoard = (board, callback) => {
    document.getElementById("player-form").classList = "form hidden";
    const boardElement = document.getElementById("board");
    boardElement.textContent = ""
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

  return { renderBoard };
}

function Game() {
  let turn = "x";
  let player1 = undefined;
  let player2 = undefined;
  const board = Gameboard();
  const controller = DisplayController();

  const makeMove = (event) => {
    console.log({turn, board: board.getBoard()});
    const id = event.target.dataset.cell
    board.setToken(turn, id)
    controller.renderBoard(board.getBoard())
    toggleTurn()
  };
  const check = () => {};
  const setPlayers = () => {
    player1 = Player(document.getElementById("player1").value, "x");
    player2 = Player(document.getElementById("player2").value, "o");
  };

  const toggleTurn = () => (turn === "x" ? (turn = "o") : (turn = "x"));

  const startGame = (event) => {
    event.preventDefault();
    setPlayers();
    controller.renderBoard(board.getBoard(), makeMove);
  };

  document.getElementById("player-form").addEventListener("submit", startGame);
}

Game();
