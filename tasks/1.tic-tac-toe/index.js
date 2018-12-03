const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let stepCounter = 0;
let size = 3;
let map = [];
let isGameOver = false;
const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame() {
    size = prompt('Write size of map: ', '3');
    if (size < 3) size = 3;
    renderGrid(size);
    resetMap();
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    let mark = stepCounter % 2 === 0 ? CROSS : ZERO;
    if (map[row][col] !== EMPTY || isGameOver) return;
    map[row][col] = mark;
    renderSymbolInCell(mark, row, col);
    checkWin(mark);
    stepCounter++;
    if (stepCounter === size * size)
        alert('Победила я');
    console.log(`Clicked on cell: ${row}, ${col}`);
}

function checkWin(mark) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size - 2; j++) {
            if (map[i][j] !== EMPTY && map[i][j] === map[i][1 + j]
                && map[i][1 + j] === map[i][2 + j]) {
                renderSymbolInCell(mark, i, j, 'red');
                renderSymbolInCell(mark, i, 1 + j, 'red');
                renderSymbolInCell(mark, i, 2 + j, 'red');
                isGameOver = true;
                alert('Win:' + mark);
                return;
            }
            if (map[j][i] !== EMPTY && map[j][i] === map[1 + j][i]
                && map[1 + j][i] === map[2 + j][i]) {
                renderSymbolInCell(mark, j, i, 'red');
                renderSymbolInCell(mark, 1 + j, i, 'red');
                renderSymbolInCell(mark, 2 + j, i, 'red');
                isGameOver = true;
                alert('Win:' + mark);
                return;
            }
        }
    }
    for (let i = 0; i < size - 2; i++) {
        if (map[1 + i][1 + i] !== EMPTY && map[i][i] === map[1 + i][1 + i]
            && map[1 + i][1 + i] === map[2 + i][2 + i]) {
            renderSymbolInCell(mark, i, i, 'red');
            renderSymbolInCell(mark, 1 + i, 1 + i, 'red');
            renderSymbolInCell(mark, 2 + i, 2 + i, 'red');
            isGameOver = true;
            alert('Win:' + mark);
            return;
        }
        if (map[1 + i][1 + i] !== EMPTY && map[0 + i][2 + i] === map[1 + i][1 + i]
            && map[1 + i][1 + i] === map[2 + i][0 + i]) {
            renderSymbolInCell(mark, 2 + i, i, 'red');
            renderSymbolInCell(mark, 1 + i, 1 + i, 'red');
            renderSymbolInCell(mark, i, 2 + i, 'red');
            isGameOver = true;
            alert('Win:' + mark);
            return;
        }
    }
}

function  checkCells(x,y,dx,dy) {

}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    console.log('reset!');
    stepCounter = 0;
    isGameOver = false;
    resetMap();
}

function resetMap() {
    map = [];
    for (let row = 0; row < size; row++) {
        map[row] = [];
        for (let col = 0; col < size; col++) {
            map[row][col] = EMPTY;
            renderSymbolInCell(EMPTY, row, col);
        }
    }
}

function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}