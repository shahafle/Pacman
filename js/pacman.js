'use strict'
const PACMAN = '🐤';

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false,
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === FOOD) {
        updateScore(1);
        if (gGame.score === 56) gameOver(true)
    }
    // if (nextCell === POWER_FOOD && !gPacman.isSuper) {
    //     gPacman.isSuper = true;
    //     updateScore(1);
    //     setTimeout(function () { gPacman.isSuper = false; }, 5000);
    // }
    if (nextCell === POWER_FOOD) {
        if (!gPacman.isSuper) {
            gPacman.isSuper = true;
            setTimeout(function () {
                gPacman.isSuper = false;
                gGhosts = gGhosts.concat(gDeathGhosts);
                gDeathGhosts = [];
            }, 5000);
        } else {
            return
        }
    }
    else if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            var killedGhost = gGhosts.splice(getDeathGhostIdx(nextLocation), 1)[0];
            gDeathGhosts.push(killedGhost);
        } else {
            gameOver(false);
            renderCell(gPacman.location, EMPTY)
            return;
        }
    } else if (nextCell === CHERRY) {
        updateScore(10);
        if (gGame.score === 56) gameOver(true)
    }

    // update the 
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN);

}


function getNextLocation(eventKeyboard) {
    var degrees = 0;
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            degrees = 90;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            degrees = 270;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            degrees = 0;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            degrees = 180;
            break;
        default:
            return null;
    }

    if (gBoard[nextLocation.i][nextLocation.j] !== WALL) {
        var prevSelector = getClassName({ i: gPacman.location.i, j: gPacman.location.j });
        document.querySelector('.' + prevSelector).style.transform = `rotate(0deg)`;
        var selector = getClassName(nextLocation);
        document.querySelector('.' + selector).style.transform = `rotate(${degrees}deg)`;
    }
    return nextLocation;
}