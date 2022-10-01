import * as c from './constants';

/**
 * Check the validity of the chess move. En passant and castling do not call. We already checked that
 * they actually moved a piece and are not taking their own piece.
 * @param {array} rows The rows of the chess board, each row contains the columns, each column specifying the piece there
 * @param {any} fromInfo The rowIndex, columnIndex, and piece relating to the piece being moved from that square
 * @param {int} rindex The row index for where they want to move to
 * @param {int} cindex The column index for where they want to move to
 * @param {boolean} whiteup Whether white is playing up the board
 * @returns {string} An error message saying what is wrong with the move. Blank if the move is valid.
 */
function validateMove(rows, fromInfo, rindex, cindex, whiteup) {
    if (fromInfo.piece === c.WHITE_ROOK || fromInfo.piece === c.BLACK_ROOK) {
        return checkRookMove(rows, fromInfo, rindex, cindex);
    } else if (fromInfo.piece === c.WHITE_KNIGHT || fromInfo.piece === c.BLACK_KNIGHT) {
        return checkKnightMove(fromInfo, rindex, cindex);
    } else if (fromInfo.piece === c.WHITE_BISHOP || fromInfo.piece === c.BLACK_BISHOP) {
        return checkBishopMove(rows, fromInfo, rindex, cindex);
    } else if (fromInfo.piece === c.WHITE_QUEEN || fromInfo.piece === c.BLACK_QUEEN) {
        return checkQueenMove(rows, fromInfo, rindex, cindex);
    } else if (fromInfo.piece === c.WHITE_KING || fromInfo.piece === c.BLACK_KING) {
        return checkKingMove(fromInfo, rindex, cindex);
    } else if (fromInfo.piece === c.WHITE_PAWN || fromInfo.piece === c.BLACK_PAWN) {
        return checkPawnMove(rows, fromInfo, rindex, cindex, whiteup);
    }
}

function checkRookMove(rows, fromInfo, rindex, cindex) {
    if (fromInfo.rowIndex !== rindex && fromInfo.columnIndex !== cindex) {
        return "Rooks move in straight lines, horizontal or vertical";
    }
    if (fromInfo.rowIndex !== rindex) {
        // Rook moved row-wise
        let lowrow = fromInfo.rowIndex < rindex ? fromInfo.rowIndex + 1 : rindex + 1;
        let highrow = fromInfo.rowIndex > rindex ? fromInfo.rowIndex - 1 : rindex - 1;
        for (let ri = lowrow; ri <= highrow; ri++) {
            if (rows[ri].columns[cindex].piece !== '') {
                return "There is a piece in the way of your rook move";
            }           
        }
    } else {
        // Rook moved column-wise
        let lowcolumn = fromInfo.columnIndex < cindex ? fromInfo.columnIndex + 1 : cindex + 1;
        let highcolumn = fromInfo.columnIndex > cindex ? fromInfo.columnIndex - 1 : cindex - 1;
        for (let ci = lowcolumn; ci <= highcolumn; ci++) {
            if (rows[rindex].columns[ci].piece !== '') {
                return "There is a piece in the way of your rook move";
            }           
        }
    }
}

function checkKnightMove(fromInfo, rindex, cindex) {
    if (Math.abs(fromInfo.rowIndex - rindex) * Math.abs(fromInfo.columnIndex - cindex) !== 2) {
        return "Invalid knight move";
    }
}

function checkBishopMove(rows, fromInfo, rindex, cindex) {
    if (Math.abs(fromInfo.rowIndex - rindex) !== Math.abs(fromInfo.columnIndex - cindex)) {
        return "Bishops move in diagonal lines";
    }
    let rowdir = fromInfo.rowIndex < rindex ? 1 : -1;
    let coldir = fromInfo.columnIndex < cindex ? 1 : -1;
    for (let ri = fromInfo.rowIndex + rowdir, ci = fromInfo.columnIndex + coldir; ri !== rindex; ri+=rowdir, ci+=coldir) {
        if (rows[ri].columns[ci].piece !== '') {
            return "There is a piece in the way of your bishop move";
        }
    }
}

function checkQueenMove(rows, fromInfo, rindex, cindex) {
    if (Math.abs(fromInfo.rowIndex - rindex) === Math.abs(fromInfo.columnIndex - cindex)) {
        // Moved like a bishop
        let rowdir = fromInfo.rowIndex < rindex ? 1 : -1;
        let coldir = fromInfo.columnIndex < cindex ? 1 : -1;
        for (let ri = fromInfo.rowIndex + rowdir, ci = fromInfo.columnIndex + coldir; ri !== rindex; ri+=rowdir, ci+=coldir) {
            if (rows[ri].columns[ci].piece !== '') {
                return "There is a piece in the way of your queen move";
            }
        }
    }
    else if (fromInfo.rowIndex === rindex || fromInfo.columnIndex === cindex) {
        // Moved like a rook
        if (fromInfo.rowIndex !== rindex) {
            // Queen moved row-wise
            let lowrow = fromInfo.rowIndex < rindex ? fromInfo.rowIndex + 1 : rindex + 1;
            let highrow = fromInfo.rowIndex > rindex ? fromInfo.rowIndex - 1 : rindex - 1;
            for (let ri = lowrow; ri <= highrow; ri++) {
                if (rows[ri].columns[cindex].piece !== '') {
                    return "There is a piece in the way of your queen move";
                }
            }
        } else {
            // Queen moved column-wise
            let lowcolumn = fromInfo.columnIndex < cindex ? fromInfo.columnIndex + 1 : cindex + 1;
            let highcolumn = fromInfo.columnIndex > cindex ? fromInfo.columnIndex - 1 : cindex - 1;
            for (let ci = lowcolumn; ci <= highcolumn; ci++) {
                if (rows[rindex].columns[ci].piece !== '') {
                    return "There is a piece in the way of your queen move";
                }
            }
        }
    }
    else {
        return "Queens move in straight lines or diagonals"
    }
}

function checkKingMove(fromInfo, rindex, cindex) {
    if (Math.abs(fromInfo.rowIndex - rindex) > 1 || Math.abs(fromInfo.columnIndex - cindex) > 1) {
        return "The king moves 1 square in any direction, except when castling";
    }
}

function checkPawnMove(rows, fromInfo, rindex, cindex, whiteup) {
    let rowdir = fromInfo.piece === c.WHITE_PAWN ? whiteup ? -1 : 1 : whiteup ? 1 : -1;
    let startrow = fromInfo.piece === c.WHITE_PAWN ? whiteup ? 6 : 1 : whiteup ? 1 : 6;
    if ((fromInfo.rowIndex <= rindex && rowdir === -1) || (fromInfo.rowIndex >= rindex && rowdir === 1)) {
        return "Pawn must advance";
    }
    if (fromInfo.rowIndex === startrow && rindex !== startrow + rowdir && rindex !== startrow + rowdir + rowdir) {
        return "Pawn moved too far";
    }
    if (fromInfo.rowIndex !== startrow && rindex !== fromInfo.rowIndex + rowdir) {
        return "Pawn moved too far";
    }
    if (fromInfo.columnIndex === cindex) {
        // Stayed in same column, not taking a piece
        if (rows[rindex].columns[cindex].piece !== '') {
            return "Pawns take by adavancing one square diagonally ahead";
        }
        if (fromInfo.rowIndex === startrow && rindex === startrow + rowdir + rowdir && rows[startrow + rowdir].columns[cindex].piece !== '') {
            return "Pawn cannot advance over a piece";
        }
    } else if (Math.abs(fromInfo.columnIndex - cindex) === 1) {
        // Moved one column, should be taking a piece
        if (rows[rindex].columns[cindex].piece === '') {
            return "There is nothing there to take";
        }
        if (Math.abs(fromInfo.rowIndex - rindex) !== 1) {
            return "Pawns take by adavancing one square diagonally ahead";
        }
    } else {
        return "Pawns advance in the same column or take a piece one square diagonally ahead";
    }
}

export default validateMove;