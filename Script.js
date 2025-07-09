let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const board = document.getElementById('gameBoard');
const statusText = document.getElementById('status');

function drawBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.innerText = cell;
    div.addEventListener('click', () => cellClick(index));
    board.appendChild(div);
  });
}

function cellClick(index) {
  if (!gameActive || cells[index] !== '') return;
  cells[index] = currentPlayer;
  drawBoard();
  if (checkWinner()) {
    statusText.innerText = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }
  if (!cells.includes('')) {
    statusText.innerText = 'It\'s a Draw!';
    gameActive = false;
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.innerText = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winConditions.some(comb => {
    return comb.every(index => cells[index] === currentPlayer);
  });
}

function restartGame() {
  currentPlayer = 'X';
  cells = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusText.innerText = `Player ${currentPlayer}'s turn`;
  drawBoard();
}

drawBoard();
