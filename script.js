document.getElementById('startBtn').addEventListener('click', solveQueens);

function solveQueens() {
    const size = 8;
    const boardContainer = document.getElementById('boardContainer');

    // 초기화하기
    boardContainer.innerHTML = '';
    const board = createEmptyBoard(size);
    displayBoard(board);

    // 문제 풀기
    const cols = Array(size).fill(false);
    const diag1 = Array(2 * size - 1).fill(false);
    const diag2 = Array(2 * size - 1).fill(false);
    backtrack([], size, board, cols, diag1, diag2, boardContainer);
}

function createEmptyBoard(size) {
    return Array.from({ length: size }, () => Array(size).fill(0));
}

function displayBoard(board) {
    const size = board.length;
    const table = document.createElement('table');
    table.classList.add('board');
    for (let row = 0; row < size; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < size; col++) {
            const td = document.createElement('td');
            if (board[row][col] === 1) {
                td.classList.add('queen');
                td.textContent = 'Q';
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    const boardContainer = document.getElementById('boardContainer');
    boardContainer.innerHTML = '';
    boardContainer.appendChild(table);
}

async function backtrack(current, size, board, cols, diag1, diag2, boardContainer) {
    const row = current.length;
    if (row === size) {
        displayBoard(board);
        return true;
    }
    for (let col = 0; col < size; col++) {
        if (!cols[col] && !diag1[row - col + size - 1] && !diag2[row + col]) {
            current.push(col);
            board[row][col] = 1;
            cols[col] = diag1[row - col + size - 1] = diag2[row + col] = true;
            displayBoard(board);
            await new Promise(r => setTimeout(r, 500)); // 0.5초 대기
            if (await backtrack(current, size, board, cols, diag1, diag2, boardContainer)) {
                return true;
            }
            cols[col] = diag1[row - col + size - 1] = diag2[row + col] = false;
            board[row][col] = 0;
            current.pop();
        }
    }
    return false;
}
