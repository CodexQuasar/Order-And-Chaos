document.addEventListener('DOMContentLoaded', () => {
            const board = document.getElementById('game-board');
            const playerTurnDisplay = document.getElementById('player-turn');
            const winMessage = document.getElementById('win-message');
            const resetBtn = document.getElementById('reset-btn');
            
            let currentPlayer = 'order';
            let gameBoard = Array(6).fill().map(() => Array(6).fill(''));
            let gameActive = true;
            
            
            function initializeBoard() {
                board.innerHTML = '';
                
                for (let row = 0; row < 6; row++) {
                    for (let col = 0; col < 6; col++) {
                        const cell = document.createElement('div');
                        cell.classList.add('cell');
                        cell.dataset.row = row;
                        cell.dataset.col = col;
                        
                        cell.addEventListener('click', () => handleCellClick(row, col));
                        
                        board.appendChild(cell);
                    }
                }
            }
            
            
            function handleCellClick(row, col) {
                if (!gameActive || gameBoard[row][col] !== '') return;
                
                const symbol = currentPlayer === 'order' ? 'X' : 'O';
                gameBoard[row][col] = symbol;
                
                updateBoard();
                
                if (checkWin()) {
                    winMessage.textContent = currentPlayer === 'order' ? 'Order Wins!' : 'Chaos Wins!';
                    winMessage.classList.add(currentPlayer === 'order' ? 'order-win' : 'chaos-win');
                    gameActive = false;
                    return;
                }
                
                
                currentPlayer = currentPlayer === 'order' ? 'chaos' : 'order';
                updatePlayerTurn();
            }
            
            
            function updateBoard() {
                const cells = document.querySelectorAll('.cell');
                
                cells.forEach(cell => {
                    const row = parseInt(cell.dataset.row);
                    const col = parseInt(cell.dataset.col);
                    
                    if (gameBoard[row][col] !== '') {
                        cell.textContent = gameBoard[row][col];
                        cell.classList.add(gameBoard[row][col].toLowerCase());
                        cell.style.cursor = 'default';
                    }
                });
            }
            
            
            function updatePlayerTurn() {
                playerTurnDisplay.textContent = currentPlayer === 'order' 
                    ? 'Order\'s Turn (X)' 
                    : 'Chaos\'s Turn (O)';
                
                playerTurnDisplay.className = 'player-turn ' + (currentPlayer === 'order' ? 'order-turn' : 'chaos-turn');
            }
            
            
            function checkWin() {
                
                if (checkFiveInARow('X')) {
                    return true;
                }
                
                
                if (isBoardFull()) {
                    winMessage.textContent = 'Chaos Wins! (Board Full)';
                    winMessage.classList.add('chaos-win');
                    gameActive = false;
                    return true;
                }
                
                return false;
            }
            
            function checkFiveInARow(symbol) {
               
                for (let row = 0; row < 6; row++) {
                    for (let col = 0; col <= 1; col++) {
                        if (gameBoard[row][col] === symbol &&
                            gameBoard[row][col+1] === symbol &&
                            gameBoard[row][col+2] === symbol &&
                            gameBoard[row][col+3] === symbol &&
                            gameBoard[row][col+4] === symbol) {
                            return true;
                        }
                    }
                }
                
                
                for (let col = 0; col < 6; col++) {
                    for (let row = 0; row <= 1; row++) {
                        if (gameBoard[row][col] === symbol &&
                            gameBoard[row+1][col] === symbol &&
                            gameBoard[row+2][col] === symbol &&
                            gameBoard[row+3][col] === symbol &&
                            gameBoard[row+4][col] === symbol) {
                            return true;
                        }
                    }
                }
                
            
                for (let row = 0; row <= 1; row++) {
                    for (let col = 0; col <= 1; col++) {
                        if (gameBoard[row][col] === symbol &&
                            gameBoard[row+1][col+1] === symbol &&
                            gameBoard[row+2][col+2] === symbol &&
                            gameBoard[row+3][col+3] === symbol &&
                            gameBoard[row+4][col+4] === symbol) {
                            return true;
                        }
                    }
                }
                
                
                for (let row = 0; row <= 1; row++) {
                    for (let col = 4; col < 6; col++) {
                        if (gameBoard[row][col] === symbol &&
                            gameBoard[row+1][col-1] === symbol &&
                            gameBoard[row+2][col-2] === symbol &&
                            gameBoard[row+3][col-3] === symbol &&
                            gameBoard[row+4][col-4] === symbol) {
                            return true;
                        }
                    }
                }
                
                return false;
            }
            
            function isBoardFull() {
                for (let row = 0; row < 6; row++) {
                    for (let col = 0; col < 6; col++) {
                        if (gameBoard[row][col] === '') {
                            return false;
                        }
                    }
                }
                return true;
            }
            
            
            function resetGame() {
                currentPlayer = 'order';
                gameBoard = Array(6).fill().map(() => Array(6).fill(''));
                gameActive = true;
                
                winMessage.textContent = '';
                winMessage.className = 'win-message';
                
                initializeBoard();
                updatePlayerTurn();
            }
            
            
            resetBtn.addEventListener('click', resetGame);
            
            
            initializeBoard();
            updatePlayerTurn();
        });