// Starting the game it will start with X
let currentPlayer = 'X'; 
let gameBoard = ['', '', '', '', '', '', '', '', '']; 
let gameActive = true; 

// How to win with 3 in a row
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
];

// Function to check if a player has won
const checkWin = () => {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        // Check if cells have the same symbol to win.
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a]; 
        }
    }
    return null; // Return null if no winner
};

// Function to check for a draw (all cells are filled)
const checkDraw = () => {
    return !gameBoard.includes(''); 
};

// Function to handle player moves
const playerMove = (cell) => {
    const cellIndex = Array.from(cell.parentNode.children).indexOf(cell); 
    if (gameActive && gameBoard[cellIndex] === '') { 
        gameBoard[cellIndex] = currentPlayer; 
        cell.textContent = currentPlayer; 
        
        const winner = checkWin(); // Check if a player has won
        if (winner) {
            // Display winner 
            document.getElementById('winnerAlert').innerHTML = `
                <div class="alert alert-success" role="alert">
                    ${winner} wins!
                </div>`;
            gameActive = false; 
        } else if (checkDraw()) {
            // Display draw 
            document.getElementById('winnerAlert').innerHTML = `
                <div class="alert alert-info" role="alert">
                    It's a draw!
                </div>`;
            gameActive = false; 
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch players for the next move
        }
    }
};

// Function to reset the game
const resetGame = () => {
    gameBoard.fill(''); // Clear all cells in the game board
    currentPlayer = 'X'; // Reset current player to X
    gameActive = true; // Set game state back to active
    // Clear cell contents and alert messages
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    document.getElementById('winnerAlert').innerHTML = '';
};