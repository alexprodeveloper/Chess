import { boardLayout } from './board.js';
import { Timer } from './Timer.js';
let whiteMove = true;
let gameOver = true;
let moveBlock = document.querySelector('.text__heading');
let rematch = document.querySelector('.btn__rematch');
let board = {
    a1: 'white-rook-first',
    b1: 'white-knight',
    c1: 'white-bishop',
    d1: 'white-queen',
    e1: 'white-king-first',
    f1: 'white-bishop',
    g1: 'white-knight',
    h1: 'white-rook-first',
    a2: 'white-pawn',
    b2: 'white-pawn',
    c2: 'white-pawn',
    d2: 'white-pawn',
    e2: 'white-pawn',
    f2: 'white-pawn',
    g2: 'white-pawn',
    h2: 'white-pawn',
    a3: '',
    b3: '',
    c3: '',
    d3: '',
    e3: '',
    f3: '',
    g3: '',
    h3: '',
    a4: '',
    b4: '',
    c4: '',
    d4: '',
    e4: '',
    f4: '',
    g4: '',
    h4: '',
    a5: '',
    b5: '',
    c5: '',
    d5: '',
    e5: '',
    f5: '',
    g5: '',
    h5: '',
    a6: '',
    b6: '',
    c6: '',
    d6: '',
    e6: '',
    f6: '',
    g6: '',
    h6: '',
    a7: 'black-pawn',
    b7: 'black-pawn',
    c7: 'black-pawn',
    d7: 'black-pawn',
    e7: 'black-pawn',
    f7: 'black-pawn',
    g7: 'black-pawn',
    h7: 'black-pawn',
    a8: 'black-rook-first',
    b8: 'black-knight',
    c8: 'black-bishop',
    d8: 'black-queen',
    e8: 'black-king-first',
    f8: 'black-bishop',
    g8: 'black-knight',
    h8: 'black-rook-first'
}
let eatenPieces = {
    white: [],
    black: []
};
let keys = Object.keys(board);

localStorage.setItem('board', JSON.stringify(board));
localStorage.setItem('pieceScuare', '');
localStorage.setItem('check', '');
document.querySelector('.game__container').addEventListener('click', function (event) {
    if (!gameOver && blackTimer.time > 0 && whiteTimer.time > 0) {
        if (event.target.classList.contains('square__overlay') && localStorage.getItem('pieceScuare') === '') {
            let pieceScuare = event.target.parentNode;
            if (pieceScuare.lastChild.tagName === 'I') {
                let piece = pieceScuare.lastElementChild;
                let pieceType = piece.classList[3].split('-');
                let pieceColor = piece.classList[2].split('__');
                let data = pieceColor[1] + '-' + pieceType[2];
                localStorage.setItem('pieceScuare', pieceScuare.id);
                localStorage.setItem('piece', data);
                if (piece.tagName === 'I') {
                    if (whiteMove && piece.classList.contains('piece__white')) {
                        if (piece.classList.contains('fa-chess-pawn')) {
                            setMove('pawn', pieceScuare.id, 'white');
                        } else if (piece.classList.contains('fa-chess-knight')) {
                            setMove('knight', pieceScuare.id, 'white');
                        } else if (piece.classList.contains('fa-chess-bishop')) {
                            setMove('bishop', pieceScuare.id, 'white');
                        } else if (piece.classList.contains('fa-chess-rook')) {
                            setMove('rook', pieceScuare.id, 'white');
                        } else if (piece.classList.contains('fa-chess-queen')) {
                            setMove('queen', pieceScuare.id, 'white');
                        } else if (piece.classList.contains('fa-chess-king')) {
                            setMove('king', pieceScuare.id, 'white');
                        }
                    } else if (!whiteMove && piece.classList.contains('piece__black')) {
                        if (piece.classList.contains('fa-chess-pawn')) {
                            setMove('pawn', pieceScuare.id, 'black');
                        } else if (piece.classList.contains('fa-chess-knight')) {
                            setMove('knight', pieceScuare.id, 'black');
                        } else if (piece.classList.contains('fa-chess-bishop')) {
                            setMove('bishop', pieceScuare.id, 'black');
                        } else if (piece.classList.contains('fa-chess-rook')) {
                            setMove('rook', pieceScuare.id, 'black');
                        } else if (piece.classList.contains('fa-chess-queen')) {
                            setMove('queen', pieceScuare.id, 'black');
                        } else if (piece.classList.contains('fa-chess-king')) {
                            setMove('king', pieceScuare.id, 'black');
                        }
                    }
                }
            }
        } else if (event.target.classList.contains('square__overlay') || event.target.classList.contains('dot') && localStorage.getItem('pieceScuare') !== '') {
            let moves = JSON.parse(localStorage.getItem('moves'));
            let pieceScuare = event.target.parentNode;
            let eatenPiece = null;
            if (event.target.classList.contains('dot')) {
                pieceScuare = pieceScuare.parentNode;
            }
            if (moves.length > 0) {
                let startId = localStorage.getItem('pieceScuare');
                let data = localStorage.getItem('piece');
                let index = moves.indexOf(pieceScuare.id);
                if (index !== -1) {
                    if (data === 'white-king' && startId === 'e1' && moves.includes('g1') && pieceScuare.id === 'g1') {
                        board.g1 = 'white-king';
                        board.f1 = 'white-rook';
                        board.h1 = '';
                        board.e1 = '';
                    } else if (data === 'white-king' && startId === 'e1' && moves.includes('c1') && pieceScuare.id === 'c1') {
                        board.c1 = 'white-king';
                        board.d1 = 'white-rook';
                        board.a1 = '';
                        board.e1 = '';
                    } else if (data === 'black-king' && startId === 'e8' && moves.includes('g8') && pieceScuare.id === 'g8') {
                        board.g8 = 'black-king';
                        board.f8 = 'black-rook';
                        board.h8 = '';
                        board.e8 = '';
                    } else if (data === 'black-king' && startId === 'e8' && moves.includes('c8') && pieceScuare.id === 'c8') {
                        board.c8 = 'black-king';
                        board.d8 = 'black-rook';
                        board.a8 = '';
                        board.e8 = '';
                    } else if (data === 'white-pawn' || data === 'black-pawn') {
                        let lastMoveInfo = localStorage.getItem('lastMove');
                        let lastMove = lastMoveInfo.slice(2, 4);
                        if (startId[0] !== moves[index][0] && board[moves[index]] === '') {
                            if (data === 'white-pawn') {
                                eatenPieces.white.push(board[lastMove]);
                            } else if (data === 'black-pawn') {
                                eatenPieces.black.push(board[lastMove]);
                            }
                            board[lastMove] = '';
                        }
                        board[startId] = '';
                        if (board[moves[index]] !== '' && whiteMove) {
                            eatenPieces.white.push(board[moves[index]]);
                        } else if (board[moves[index]] !== '' && !whiteMove) {
                            eatenPieces.black.push(board[moves[index]]);
                        }
                        board[moves[index]] = data;
                        if (data === 'white-pawn') {
                            if (isPieceAtLastRow()) {
                                let choiceBlock = document.querySelector('.choose__container');
                                choiceBlock.style.display = 'flex';
                                choiceBlock.style.animation = 'show 1s';
                                choiceBlock.style.opacity = 1;
                                let pieces = Array.from(document.querySelectorAll('.square__choice i'));
                                for (let piece of pieces) {
                                    piece.classList.add('piece__white');
                                }
                                choiceBlock.addEventListener('click', function (event) {
                                    if (event.target.classList.contains('piece__to_choose') || event.target.classList.contains('square__choice')) {
                                        let piece = event.target;
                                        if (event.target.classList.contains('square__choice')) {
                                            piece = piece.childNodes[0];
                                        }
                                        let pieceData = piece.classList[3];
                                        pieceData = pieceData.split('-');
                                        data = 'white-' + pieceData[2] + '-transformed';
                                        if (board[moves[index]] !== '') {
                                            eatenPieces.white.push(board[moves[index]]);
                                        }
                                        board[moves[index]] = data;
                                        choiceBlock.style.animation = 'hide 1s';
                                        choiceBlock.style.opacity = 0;
                                        render();
                                        let color = (whiteMove === true) ? 'white' : 'black';
                                        let colorOpposite = (whiteMove === true) ? 'black' : 'white';
                                        let allMoves = getAllMoves(colorOpposite, board);
                                        let king = getKingId(color);
                                        let check = false;
                                        if (allMoves.includes(king)) {
                                            check = true;
                                            document.getElementById(king).classList.add('check');
                                            localStorage.setItem('check', JSON.stringify([check, king, allMoves]));
                                        }
                                        setTimeout(function () {
                                            choiceBlock.style.display = 'none';
                                        }, 1000);
                                    }
                                });
                            }
                        } else if (data === 'black-pawn') {
                            if (isPieceAtLastRow(1, 'black-pawn')) {
                                let choiceBlock = document.querySelector('.choose__container');
                                choiceBlock.style.display = 'flex';
                                choiceBlock.style.animation = 'show 1s';
                                choiceBlock.style.opacity = 1;
                                let pieces = Array.from(document.querySelectorAll('.square__choice i'));
                                for (let piece of pieces) {
                                    piece.classList.add('piece__black');
                                }
                                choiceBlock.addEventListener('click', function (event) {
                                    if (event.target.classList.contains('piece__to_choose') || event.target.classList.contains('square__choice')) {
                                        let piece = event.target;
                                        if (event.target.classList.contains('square__choice')) {
                                            piece = piece.childNodes[0];
                                        }
                                        let pieceData = piece.classList[3];
                                        pieceData = pieceData.split('-');
                                        data = 'black-' + pieceData[2] + '-transformed';
                                        if (board[moves[index]] !== '') {
                                            eatenPieces.black.push(board[moves[index]]);
                                        }
                                        board[moves[index]] = data;
                                        choiceBlock.style.animation = 'hide 1s';
                                        choiceBlock.style.opacity = 0;
                                        render();
                                        let color = (whiteMove === true) ? 'white' : 'black';
                                        let colorOpposite = (whiteMove === true) ? 'black' : 'white';
                                        let allMoves = getAllMoves(colorOpposite, board);
                                        let king = getKingId(color);
                                        let check = false;
                                        if (allMoves.includes(king)) {
                                            check = true;
                                            document.getElementById(king).classList.add('check');
                                            localStorage.setItem('check', JSON.stringify([check, king, allMoves]));
                                        }
                                        setTimeout(function () {
                                            choiceBlock.style.display = 'none';
                                        }, 1000);
                                    }
                                });
                            }
                        }
                    } else {
                        board[startId] = '';
                        if (board[moves[index]] !== '') {
                            if (whiteMove) {
                                eatenPieces.white.push(board[moves[index]]);
                            } else if (!whiteMove) {
                                eatenPieces.black.push(board[moves[index]]);
                            }
                        }
                        board[moves[index]] = data;
                    }
                    let audio = new Audio('../sounds/move-sound.mp3');
                    audio.play();
                    localStorage.setItem('lastMove', startId + moves[index] + data);
                    render();
                    isCheck(whiteMove);
                    renderInfo();
                    whiteMove = !whiteMove;
                    if (whiteMove) {
                        blackTimer.stop();
                        whiteTimer.start();
                    } else if (!whiteMove) {
                        whiteTimer.stop();
                        blackTimer.start();
                    }
                    let drawBtns = Array.from(document.querySelectorAll('.btn__draw_active'));
                    if (drawBtns.length > 0) {
                        for (let i = 0; i < drawBtns.length; i++) {
                            drawBtns[i].classList.remove('btn__draw_active');
                        }
                    }
                    moveBlock.textContent = (whiteMove) ? 'Ход белых' : 'Ход черных';
                    localStorage.setItem('pieceScuare', '');
                }
            }
        }
    } else if (!gameOver && blackTimer.time === 0) {
        gameOver = true;
        moveBlock.textContent = 'Белые победили';
        let btns = Array.from(document.querySelectorAll('.btn'));
        setAttrForCollection(btns, 'disabled', '');
        rematch.removeAttribute('disabled');
    } else if (!gameOver && whiteTimer.time === 0) {
        gameOver = true;
        moveBlock.textContent = 'Черные победили';
        rematch.removeAttribute('disabled');
        let btns = Array.from(document.querySelectorAll('.btn'));
        setAttrForCollection(btns, 'disabled', '');
        rematch.removeAttribute('disabled');
    }
});

function render(dataObject = board) {
    document.querySelector('.game__container').innerHTML = boardLayout;
    for (let i = 0; i < keys.length; i++) {
        if (dataObject[keys[i]] !== '') {
            let square = document.getElementById(keys[i]);
            let piece = document.createElement('i');
            let data = dataObject[keys[i]].split('-');
            piece.classList.add('fas');
            piece.classList.add('piece');
            if (data[0] === 'white') {
                piece.classList.add('piece__white');
            } else {
                piece.classList.add('piece__black')
            }
            piece.classList.add('fa-chess-' + data[1]);
            square.appendChild(piece);
        }
    }
    let checkInfo = localStorage.getItem('check');
    if (checkInfo !== '') {
        checkInfo = JSON.parse(checkInfo);
    }
    if (checkInfo[0] === true) {
        document.getElementById(checkInfo[1]).classList.add('check');
    }
}

function renderInfo() {
    let whitePieces = eatenPieces.white;
    let blackPieces = eatenPieces.black;
    if (whiteMove && whitePieces.length > 0) {
        whitePieces = filterPieces(whitePieces);
        let blackContainer = document.querySelector('.pieces__container_black');
        blackContainer.innerHTML = '';
        for (let i = 0; i < whitePieces.length; i++) {
            let element = document.createElement('i');
            element.classList.add('fas', 'piece', 'piece__black');
            let data = whitePieces[i].split('-');
            if (data.length === 2 || data[2] === 'first') {
                element.classList.add('fa-chess-' + data[1]);
            } else {
                element.classList.add('fa-chess-pawn');
            }
            blackContainer.appendChild(element);
        }
    } else if (!whiteMove && blackPieces.length > 0) {
        blackPieces = filterPieces(blackPieces);
        let whiteContainer = document.querySelector('.pieces__container_white');
        whiteContainer.innerHTML = '';
        for (let i = 0; i < blackPieces.length; i++) {
            let element = document.createElement('i');
            element.classList.add('fas', 'piece', 'piece__white');
            let data = blackPieces[i].split('-');
            if (data.length === 2 || data[2] === 'first') {
                element.classList.add('fa-chess-' + data[1]);
            } else {
                element.classList.add('fa-chess-pawn');
            }
            whiteContainer.appendChild(element);
        }
    }
}

function filterPieces(pieces) {
    let pawns = getCurrentPieceType(pieces, 'pawn');
    let knights = getCurrentPieceType(pieces, 'knight');
    let bishops = getCurrentPieceType(pieces, 'bishop');
    let rooks = getCurrentPieceType(pieces, 'rook');
    let queen = getCurrentPieceType(pieces, 'queen');
    let result = [];
    result.push(pawns, knights, bishops, rooks, queen);
    result = result.filter(function (res) {
        if (res) {
            return res;
        }
    });
    return result.flat();
}

function getCurrentPieceType(pieces, type) {
    let result = pieces.filter(function (piece) {
        let data = piece.split('-')
        if (data[1] === type) {
            return piece;
        }
    });
    return result;
}

function move(pieceType, id, color) {
    let idClone = id;
    let num = parseInt(id[1]);
    let result = [];
    let colorOpposite = (color === 'white') ? 'black' : 'white';
    let allMoves = getAllMoves(colorOpposite, board)
    let checkInfo = localStorage.getItem('check');
    if (checkInfo !== '') {
        checkInfo = JSON.parse(checkInfo);
    }
    if (pieceType === 'pawn') {
        if (color === 'white') {
            let iter = iteration(id, '+');
            if (document.querySelector('#' + id[0] + (num + 1)).lastChild.tagName !== 'I') {
                result.push(id[0] + (num + 1));
            }
            if (num === 2) {
                if (document.querySelector('#' + id[0] + (num + 2)).lastChild.tagName !== 'I') {
                    result.push(id[0] + (num + 2));
                }
            }
            if (num === 5) {
                let lastMoveInfo = localStorage.getItem('lastMove');
                let lastMoveCords = lastMoveInfo.slice(0, 4)
                if (lastMoveInfo.includes('black-pawn')) {
                    let numericId = convertToNumbers(id);
                    let neighbors = [convertToField((parseInt(numericId[0]) + 1) + numericId[1]), convertToField((parseInt(numericId[0]) - 1) + numericId[1])];
                    neighbors = neighbors.filter(function (neighbor) {
                        if (neighbor) {
                            return neighbor;
                        }
                    });
                    for (let i = 0; i < neighbors.length; i++) {
                        if (lastMoveCords === neighbors[i][0] + '7' + neighbors[i][0] + 5) {
                            result.push(neighbors[i][0] + (parseInt(neighbors[i][1]) + 1));
                        }
                    }
                }
            }
            for (let i = 0; i < iter.length; i++) {
                let elem = document.getElementById(iter[i]);
                if (elem.lastChild.tagName === 'I' && elem.lastChild.classList.contains('piece__black')) {
                    result.push(iter[i]);
                }
            }
        } else if (color === 'black') {
            if (document.querySelector('#' + id[0] + (num - 1)).lastChild.tagName !== 'I') {
                result.push(id[0] + (num - 1));
            }
            if (num === 7) {
                if (document.querySelector('#' + id[0] + (num - 2)).lastChild.tagName !== 'I') {
                    result.push(id[0] + (num - 2));
                }
            }
            let iter = iteration(id, '-');
            if (num === 4) {
                let lastMoveInfo = localStorage.getItem('lastMove');
                let lastMoveCords = lastMoveInfo.slice(0, 4)
                if (lastMoveInfo.includes('white-pawn')) {
                    let numericId = convertToNumbers(id);
                    let neighbors = [convertToField((parseInt(numericId[0]) + 1) + numericId[1]), convertToField((parseInt(numericId[0]) - 1) + numericId[1])];
                    neighbors = neighbors.filter(function (neighbor) {
                        if (neighbor) {
                            return neighbor;
                        }
                    });
                    for (let i = 0; i < neighbors.length; i++) {
                        if (lastMoveCords === neighbors[i][0] + '2' + neighbors[i][0] + '4') {
                            result.push(neighbors[i][0] + (parseInt(neighbors[i][1]) - 1));
                        }
                    }
                }
            }
            for (let i = 0; i < iter.length; i++) {
                let elem = document.getElementById(iter[i]);
                if (elem.lastChild.tagName === 'I' && elem.lastChild.classList.contains('piece__white')) {
                    result.push(iter[i]);
                }
            }
        }
    } else if (pieceType === 'knight') {
        id = convertToNumbers(id);
        let id1 = parseInt(id[0]);
        let id2 = parseInt(id[1]);
        result.push(convertToField((id1 + 2) + '' + (id2 + 1)));
        result.push(convertToField((id1 + 2) + '' + (id2 - 1)));
        result.push(convertToField((id1 + 1) + '' + (id2 + 2)));
        result.push(convertToField((id1 + 1) + '' + (id2 - 2)));
        result.push(convertToField((id1 - 2) + '' + (id2 - 1)));
        result.push(convertToField((id1 - 2) + '' + (id2 + 1)));
        result.push(convertToField((id1 - 1) + '' + (id2 + 2)));
        result.push(convertToField((id1 - 1) + '' + (id2 - 2)));
        result = result.filter(function (res) {
            if (res && board.hasOwnProperty(res)) {
                let element = document.getElementById(res);
                if (color === 'white') {
                    if (element.lastChild.tagName !== 'I') {
                        return res;
                    } else if (element.lastChild.tagName === 'I' && element.lastChild.classList.contains('piece__black')) {
                        return res;
                    }
                } else if (color === 'black') {
                    if (element.lastChild.tagName !== 'I') {
                        return res;
                    } else if (element.lastChild.tagName === 'I' && element.lastChild.classList.contains('piece__white')) {
                        return res;
                    }
                }
            }
        });
    } else if (pieceType === 'bishop') {
        result = getBishopMoves(id, color);
    } else if (pieceType === 'rook') {
        result = getRookMoves(id, color);
    } else if (pieceType === 'queen') {
        result = getQueenMoves(id, color);
    } else if (pieceType === 'king') {
        id = convertToNumbers(id);
        let id1 = parseInt(id[0]);
        let id2 = parseInt(id[1]);
        result.push(convertToField((id1 - 1) + '' + (id2 + 1)));
        result.push(convertToField(id1 + '' + (id2 + 1)));
        result.push(convertToField((id1 + 1) + '' + (id2 + 1)));
        result.push(convertToField((id1 + 1) + '' + id2));
        result.push(convertToField((id1 + 1) + '' + (id2 - 1)));
        result.push(convertToField(id1 + '' + (id2 - 1)));
        result.push(convertToField((id1 - 1) + '' + id2));
        result.push(convertToField((id1 - 1) + '' + (id2 - 1)));
        if (color === 'white' && isShortCastlingPossible('white', allMoves)) {
            result.push('g1');
        } else if (color === 'black' && isShortCastlingPossible('black', allMoves)) {
            result.push('g8');
        }
        if (color === 'white' && isLongCastlingPossible('white', allMoves)) {
            result.push('c1');
        } else if (color === 'black' && isLongCastlingPossible('black', allMoves)) {
            result.push('c8');
        }
        result = result.filter(function (elem) {
            if (elem) {
                let square = document.getElementById(elem);
                if (!allMoves.includes(elem)) {
                    if (square.lastChild.tagName !== 'I') {
                        return elem;
                    } else if (square.lastChild.tagName === 'I' && color === 'white' && square.lastChild.classList.contains('piece__black')) {
                        return elem;
                    } else if (square.lastChild.tagName === 'I' && color === 'black' && square.lastChild.classList.contains('piece__white')) {
                        return elem;
                    }
                }
            }
        });
    }

    if (checkInfo[0] === true && result.length > 0 && pieceType !== 'king') {
        result = checkValidate(result, idClone, color);
    }
    else if (result.length > 0 && pieceType !== 'king') {
        result = checkValidate(result, idClone, color);
    }
    return result;
}

function isCheck(whiteMove, toReturn = false) {
    let color = (whiteMove === true) ? 'white' : 'black';
    let colorOpposite = (whiteMove === true) ? 'black' : 'white';
    let allMoves = getAllMoves(color, board);
    let king = getKingId(colorOpposite);
    let check = false;
    if (allMoves.includes(king)) {
        check = true;
        document.getElementById(king).classList.add('check');
        localStorage.setItem('check', JSON.stringify([check, king, allMoves]));
    } else {
        let checkSquare = document.querySelector('.check');
        if (checkSquare) {
            checkSquare.classList.remove('check');
            localStorage.setItem('check', '')
        }
    }
    if (toReturn === true) {
        return king;
    }
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function setDots(dots) {
    if (dots.length > 0) {
        for (let i = 0; i < dots.length; i++) {
            let dot = document.querySelector('#' + dots[i] + ' .square__overlay .dot');
            dot.classList.remove('hidden');
        }
    }
}

function removeDots() {
    let dots = Array.from(document.querySelectorAll('.square__overlay .dot:not(.hidden)'));
    if (dots.length > 0) {
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.add('hidden');
        }
    }
}

function convertToNumbers(field) {
    let result = '';
    switch (field[0]) {
        case 'a':
            result = '1' + field[1];
            break;
        case 'b':
            result = '2' + field[1];
            break;
        case 'c':
            result = '3' + field[1];
            break;
        case 'd':
            result = '4' + field[1];
            break;
        case 'e':
            result = '5' + field[1];
            break;
        case 'f':
            result = '6' + field[1];
            break;
        case 'g':
            result = '7' + field[1];
            break;
        case 'h':
            result = '8' + field[1];
            break;
        default:
            result = false;
            break;
    }
    return result;
}

function convertToField(number) {
    number = String(number);
    let num = number[0];
    if (number[1] === '-' || number[1] === '0' || number.length > 2 || number[1] === '9') {
        return false;
    }
    switch (num) {
        case '1':
            return ('a' + number[1]);
        case '2':
            return ('b' + number[1]);
        case '3':
            return ('c' + number[1]);
        case '4':
            return ('d' + number[1]);
        case '5':
            return ('e' + number[1]);
        case '6':
            return ('f' + number[1]);
        case '7':
            return ('g' + number[1]);
        case '8':
            return ('h' + number[1]);
        default:
            return false;
    }
}

function isShortCastlingPossible(color, allMoves) {
    if (color === 'white') {
        if (board.e1 === 'white-king-first' && board.h1 === 'white-rook-first' && board.f1 === '' && board.g1 === '') {
            if (!allMoves.includes('e1') && !allMoves.includes('f1') && !allMoves.includes('g1')) {
                return true;
            }
        }
    } else if (color === 'black') {
        if (board.e8 === 'black-king-first' && board.h8 === 'black-rook-first' && board.f8 === '' && board.g8 === '') {
            if (!allMoves.includes('e8') && !allMoves.includes('f8') && !allMoves.includes('g8')) {
                return true;
            }
        }
    }
    return false;
}

function isLongCastlingPossible(color, allMoves) {
    if (color === 'white') {
        if (board.e1 === 'white-king-first' && board.a1 === 'white-rook-first' && board.b1 === '' && board.c1 === '' && board.d1 === '') {
            if (!allMoves.includes('e1') && !allMoves.includes('c1') && !allMoves.includes('d1')) {
                return true;
            }
        }
    }
    else if (color === 'black') {
        if (board.e8 === 'black-king-first' && board.a8 === 'black-rook-first' && board.b8 === '' && board.c8 === '' && board.d8 === '') {
            if (!allMoves.includes('e8') && !allMoves.includes('c8') && !allMoves.includes('d8')) {
                return true;
            }
        }
    }
    return false;
}

function iteration(data, type) {
    data = convertToNumbers(data);
    let result = [];
    if (type === '+') {
        result.push(convertToField((parseInt(data[0]) + 1) + '' + (parseInt(data[1]) + 1)));
        result.push(convertToField((parseInt(data[0]) - 1) + '' + (parseInt(data[1]) + 1)));
        for (let i = 0; i < result.length; i++) {
            if (result[i] === false) {
                result.splice(i, 1);
            }
        }
    } else if (type === '-') {
        result.push(convertToField((parseInt(data[0]) + 1) + '' + (parseInt(data[1]) - 1)));
        result.push(convertToField((parseInt(data[0]) - 1) + '' + (parseInt(data[1]) - 1)));
        for (let i = 0; i < result.length; i++) {
            if (result[i] === false) {
                result.splice(i, 1);
            }
        }
    }
    return result;
}

function getBishopDiagonalMoves(id, color, diagonal, toDefense = false) {
    let result = [];
    id = convertToNumbers(id);
    let id1 = parseInt(id[0]);
    let id2 = parseInt(id[1]);
    while (true) {
        switch (diagonal) {
            case '++':
                id1 += 1;
                id2 += 1;
                break;
            case '+-':
                id1 += 1;
                id2 -= 1;
                break;
            case '-+':
                id1 -= 1;
                id2 += 1;
                break;
            case '--':
                id1 -= 1;
                id2 -= 1;
                break;
            default:
                return false;
        }
        let field = convertToField(id1 + '' + id2);
        if (field) {
            let square = document.getElementById(field);
            if (square && square.lastChild.tagName === 'I') {
                if (color === 'white' && square.lastChild.classList.contains('piece__black')) {
                    result.push(field);
                    break;
                } else if (color === 'white' && square.lastChild.classList.contains('piece__white')) {
                    if (toDefense) {
                        result.push(field);
                    }
                    break;
                } else if (color === 'black' && square.lastChild.classList.contains('piece__black')) {
                    if (toDefense) {
                        result.push(field);
                    }
                    break;
                } else if (color === 'black' && square.lastChild.classList.contains('piece__white')) {
                    result.push(field);
                    break;
                }
            } else if (square && square.lastChild.tagName !== 'I') {
                result.push(field);
            }
        } else {
            break;
        }
    }
    return result;
}

function getBishopMoves(id, color, toDefense = false) {
    let result = getBishopDiagonalMoves(id, color, '++', toDefense);
    result = result.concat(getBishopDiagonalMoves(id, color, '+-', toDefense));
    result = result.concat(getBishopDiagonalMoves(id, color, '-+', toDefense));
    result = result.concat(getBishopDiagonalMoves(id, color, '--', toDefense));
    return result;
}

function getRookLinerMoves(id, color, line, toDefense = false) {
    let result = [];
    id = convertToNumbers(id);
    let id1 = parseInt(id[0]);
    let id2 = parseInt(id[1]);
    while (true) {
        switch (line) {
            case '++':
                id2 += 1;
                break;
            case '+-':
                id2 -= 1;
                break;
            case '-+':
                id1 += 1;
                break;
            case '--':
                id1 -= 1;
                break;
            default:
                return false;
        }
        let field = convertToField(id1 + '' + id2);
        if (field) {
            let square = document.getElementById(field);
            if (square && square.lastChild.tagName === 'I') {
                if (color === 'white' && square.lastChild.classList.contains('piece__black')) {
                    result.push(field);
                    break;
                } else if (color === 'white' && square.lastChild.classList.contains('piece__white')) {
                    if (toDefense) {
                        result.push(field);
                    }
                    break;
                } else if (color === 'black' && square.lastChild.classList.contains('piece__black')) {
                    if (toDefense) {
                        result.push(field);
                    }
                    break;
                } else if (color === 'black' && square.lastChild.classList.contains('piece__white')) {
                    result.push(field);
                    break;
                }
            } else if (square && square.lastChild.tagName !== 'I') {
                result.push(field);
            }
        } else {
            break;
        }
    }
    return result;
}

function getRookMoves(id, color, toDefense = false) {
    let result = getRookLinerMoves(id, color, '++', toDefense);
    result = result.concat(getRookLinerMoves(id, color, '+-', toDefense));
    result = result.concat(getRookLinerMoves(id, color, '-+', toDefense));
    result = result.concat(getRookLinerMoves(id, color, '--', toDefense));
    return result;
}

function getQueenMoves(id, color, toDefense = false) {
    let result = getBishopMoves(id, color, toDefense);
    result = result.concat(getRookMoves(id, color, toDefense));
    return result;
}

function getEnemyPieces(color, data) {
    let enemyPieces = [];
    for (let key in data) {
        let keyData = (data[key]).split('-');
        if (keyData[0] === color) {
            enemyPieces.push(key);
        }
    }
    return enemyPieces;
}

function getKingId(color) {
    let kingId = findKey(board, color + '-king');
    if (!kingId) {
        kingId = findKey(board, color + '-king-first');
    }
    return kingId;
}

function getAllMoves(color, data) {
    let nodeList = getEnemyPieces(color, data);
    let possibleMoves = [];
    for (let i = 0; i < nodeList.length; i++) {
        let piece = data[nodeList[i]];
        piece = piece.split('-');
        let moves = move2(piece[1], nodeList[i], piece[0]);
        if (moves.length > 0) {
            possibleMoves.push(moves);
        }
    }
    return possibleMoves.flat();
}


function findKey(object, value) {
    for (let key in object) {
        if (value === object[key]) {
            return key;
        }
    }
}

document.addEventListener('load', render());

document.addEventListener('keydown', function (event) {
    if (event.code === 'Escape') {
        localStorage.setItem('pieceScuare', '');
        render();
    }
});

function setMove(type, pieceScuare, color) {
    let moves = move(type, pieceScuare, color);
    localStorage.setItem('moves', JSON.stringify(moves));
    setDots(moves);
}

function checkValidate(result, id, color) {
    let colorOpposite = (color === 'white') ? 'black' : 'white';
    result = result.filter(function (res) {
        let boardClone = clone(board);
        let data = boardClone[id];
        boardClone[id] = '';
        boardClone[res] = data;
        let king = getKingId(color)
        render(boardClone);
        let allMovesCheck = getAllMoves(colorOpposite, boardClone);
        if (!allMovesCheck.includes(king)) {
            return res;
        }
    });
    render();
    return result;
}

function isPieceAtLastRow(row = 8, piece = 'white-pawn') {
    let data = ['a' + row, 'b' + row, 'c' + row, 'd' + row, 'e' + row, 'f' + row, 'g' + row, 'h' + row];
    for (let i = 0; i < data.length; i++) {
        if (board[data[i]] === piece) {
            return data[i];
        }
    }
    return false;
}

function move2(pieceType, id, color) {
    let num = parseInt(id[1]);
    let result = [];
    if (pieceType === 'pawn') {
        if (color === 'white') {
            let iter = iteration(id, '+');
            result = result.concat(iter);
        } else if (color === 'black') {
            let iter = iteration(id, '-');
            result = result.concat(iter)
        }
    } else if (pieceType === 'knight') {
        id = convertToNumbers(id);
        let id1 = parseInt(id[0]);
        let id2 = parseInt(id[1]);
        let res = [];
        res.push(convertToField((id1 + 2) + '' + (id2 + 1)));
        res.push(convertToField((id1 + 2) + '' + (id2 - 1)));
        res.push(convertToField((id1 + 1) + '' + (id2 + 2)));
        res.push(convertToField((id1 + 1) + '' + (id2 - 2)));
        res.push(convertToField((id1 - 2) + '' + (id2 - 1)));
        res.push(convertToField((id1 - 2) + '' + (id2 + 1)));
        res.push(convertToField((id1 - 1) + '' + (id2 + 2)));
        res.push(convertToField((id1 - 1) + '' + (id2 - 2)));
        for (let i = 0; i < res.length; i++) {
            if (res[i] && board.hasOwnProperty(res[i])) {
                result.push(res[i]);
            }
        }
    } else if (pieceType === 'bishop') {
        result = getBishopMoves(id, color, true);
    } else if (pieceType === 'rook') {
        result = getRookMoves(id, color, true);
    } else if (pieceType === 'queen') {
        result = getQueenMoves(id, color, true);
    }
    else if (pieceType === 'king') {
        id = convertToNumbers(id);
        let id1 = parseInt(id[0]);
        let id2 = parseInt(id[1]);
        result.push(convertToField((id1 - 1) + '' + (id2 + 1)));
        result.push(convertToField(id1 + '' + (id2 + 1)));
        result.push(convertToField((id1 + 1) + '' + (id2 + 1)));
        result.push(convertToField((id1 + 1) + '' + id2));
        result.push(convertToField((id1 + 1) + '' + (id2 - 1)));
        result.push(convertToField(id1 + '' + (id2 - 1)));
        result.push(convertToField((id1 - 1) + '' + id2));
        result.push(convertToField((id1 - 1) + '' + (id2 - 1)));
    }
    return result;
}

function setAttrForCollection(collection, attr, value) {
    if (collection.length > 0) {
        for (let i = 0; i < collection.length; i++) {
            if (!collection[i].hasAttribute(attr)) {
                collection[i].setAttribute(attr, value);
            }
        }
    }
}

function removeAttrFromCollection(collection, attr) {
    if (collection.length > 0) {
        for (let i = 0; i < collection.length; i++) {
            if (collection[i].hasAttribute(attr)) {
                collection[i].removeAttribute(attr);
            }
        }
    }
}

function removeClassFromCollection(collection, className) {
    if (collection.length > 0) {
        for (let i = 0; i < collection.length; i++) {
            collection[i].classList.remove(className);
        }
    }
}

document.querySelector('.buttons__container').addEventListener('click', function (event) {
    let element = event.target;
    if (element.classList.contains('btn')) {
        if (element.classList.contains('btn__draw')) {
            element.classList.toggle('btn__draw_active');
            let drawButtons = document.querySelectorAll('.btn__draw_active');
            if (drawButtons.length === 2) {
                let btns = Array.from(document.querySelectorAll('.btn'));
                setAttrForCollection(btns, 'disabled', '');
                gameOver = true;
                moveBlock.textContent = 'Ничья';
                removeDots();
                blackTimer.stop();
                whiteTimer.stop();
            }
        } else if (element.classList.contains('btn__giveUp')) {
            let isGivingUp = confirm('Вы действительно хотите сдаться?');
            if (isGivingUp) {
                let btns = Array.from(document.querySelectorAll('.btn'));
                setAttrForCollection(btns, 'disabled', '');
                element.classList.add('btn__giveUp_active');
                gameOver = true;
                moveBlock.textContent = (element.id === 'giveUp__white') ? 'Черные победили' : 'Белые победили';
                removeDots();
                blackTimer.stop();
                whiteTimer.stop();
            }
        } else if (element.classList.contains('btn__rematch')) {
            board = JSON.parse(localStorage.getItem('board'));
            let btns = Array.from(document.querySelectorAll('.btn'));
            removeAttrFromCollection(btns, 'disabled');
            localStorage.setItem('pieceScuare', '');
            localStorage.setItem('check', '');
            localStorage.setItem('moves', '');
            let giveUp = Array.from(document.querySelectorAll('.btn__giveUp_active'));
            removeClassFromCollection(giveUp, 'btn__giveUp_active');
            let draw = Array.from(document.querySelectorAll('.btn__draw_active'));
            removeClassFromCollection(draw, 'btn__draw_active');
            element.setAttribute('disabled', '');
            gameOver = false;
            whiteMove = true;
            moveBlock.textContent = 'Ход белых';
            document.querySelector('.pieces__container_white').innerHTML = '';
            document.querySelector('.pieces__container_black').innerHTML = '';
            eatenPieces.white = [];
            eatenPieces.black = [];
            let timerData = getTimerData();
            window.whiteTimer = new Timer(timerData[0] * 60, timerData[1], '.timer__text_white');
            window.blackTimer = new Timer(timerData[0] * 60, timerData[1], '.timer__text_black');
            whiteTimer.start();
            render();
        }
    }
    if (!gameOver) {
        rematch.setAttribute('disabled', '');
    }
});


let inputTime = document.querySelector('.input__time');
inputTime.addEventListener('input', function () {
    if (gameOver) {
        let value = parseInt(inputTime.value);
    if (value && value > 0 && value <= 60) {
        let blocks = Array.from(document.querySelectorAll('.timer__text'));
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].textContent = value + ':00';
        }
        document.querySelector('.text__error_time').style.visibility = 'hidden';
    } else {
        document.querySelector('.text__error_time').style.visibility = 'visible';
    }
    }
});

let inputAdd = document.querySelector('.input__add');
inputAdd.addEventListener('input', function () {
    if (gameOver) {
        let value = parseInt(inputAdd.value);
        if (value && value >= 0 && value <= 30) {
            let block = document.querySelector('.time__add');
            block.textContent = value;
            document.querySelector('.text__error_add').style.visibility = 'hidden';
        } else {
            document.querySelector('.text__error_add').style.visibility = 'visible';
        }
    }
});

function getTimerData() {
    let time = document.querySelector('.timer__text').textContent.split(':');
    time = time[0];
    let timeAdd = document.querySelector('.time__add').textContent;
    return [parseInt(time), parseInt(timeAdd)];
}