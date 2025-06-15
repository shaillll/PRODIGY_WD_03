const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let gameActive = true;
const winCombos = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

function handleClick(e){
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (!gameActive || cell.textContent !== '') return;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin()){
        statusText.textContent = 'Player $ {currentPlayer} wins!';
        gameActive = false;
        return;
    }
    if (isDraw()) {
        statusText.textContent = `It's a Draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? '0' : 'X';
    statusText.textContent = `Player $ {currentPlayer}'s turn`;
}

function checkWin() {
    return winCombos.some(combos => {
        return combos.every(index => {
            return cells[index].textContent === currentPlayer;
        })
    })
}

function isDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', '0');
    });
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = `Player $ {currentPlayer}'s Turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));