/**
 * Check the validity of the chess move. En passant and castling do not call. We already checked that
 * they actually moved a piece and are not taking their own piece. Does not check for check violations.
 * @param {array} rows The rows of the chess board, each row contains the columns, each column specifying the piece there
 * @param {any} fromInfo The rowIndex, columnIndex, and piece relating to the piece being moved from that square
 * @param {int} rindex The row index for where they want to move to
 * @param {int} cindex The column index for where they want to move to
 * @returns {string} An error message saying what is wrong with the move. Blank if the move is valid.
 */
function validateMove(rows, fromInfo, rindex, cindex) {
    if (fromInfo.piece === 'white-rook' || fromInfo.piece === 'black-rook') {
        return checkRookMove(rows, fromInfo, rindex, cindex);
    }
    else if (fromInfo.piece === 'white-knight' || fromInfo.piece === 'black-knight') {
        return checkKnightMove(fromInfo, rindex, cindex);
    }
    else if (fromInfo.piece === 'white-bishop' || fromInfo.piece === 'black-bishop') {
        return checkBishopMove(rows, fromInfo, rindex, cindex);
    }
    else if (fromInfo.piece === 'white-queen' || fromInfo.piece === 'black-queen') {
        return checkQueenMove(rows, fromInfo, rindex, cindex);
    }
    else if (fromInfo.piece === 'white-king' || fromInfo.piece === 'black-king') {
        return checkKingMove(fromInfo, rindex, cindex);
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

export default validateMove;