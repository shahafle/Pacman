'use strict'
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const POWER_FOOD = '🍪';
const CHERRY = '🍒'

var gCherryInterval;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gCherryInterval = setInterval(addCherry, 10000);
    gGame.isOn = true
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    board[1][1] = board[1][8] = board[8][1] = board[8][8] = POWER_FOOD;
    return board;
}



function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver(isWin) {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    document.querySelector('.modal').style.display = 'inline';
    var message = (isWin) ? 'Well done!' : 'The ghost caught you';
    document.querySelector('.modal p').innerText = message;
}

function restart() {
    gGame = {
        score: 0,
        isOn: false
    }
    init();
    document.querySelector('h2 span').innerText = 0;
    document.querySelector('.modal').style.display = 'none';
}

function addCherry() {
    var isFound = false;
    // debugger
    while (!isFound) {
        var rowIdx = getRandomIntInt(1, gBoard.length - 1);
        var colIdx = getRandomIntInt(1, gBoard[0].length - 1);
        var location = { i: rowIdx, j: colIdx };
        if (gBoard[location.i][location.j] === EMPTY) {
            gBoard[location.i][location.j] = CHERRY;
            renderCell(location, CHERRY)
            break
        }
    }
}