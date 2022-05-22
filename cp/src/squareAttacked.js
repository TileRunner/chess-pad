/**
 * Whether the specified square is attacked by the specified color on the specified board
 * @param {array[any]} rows The board position
 * @param {string} bycolor Attacked by 'white' or 'black'
 * @param {bool} whiteup Whether white is playing upwards
 * @param {int} rowIndex The row index of the square to check
 * @param {int} columnIndex The column index of the square to check
 * @returns {bool} Whether square is attacked
 */
function squareAttacked(rows, whiteup, bycolor, rowIndex, columnIndex) {
    let bywhite = (bycolor === 'white');
    // Check for pawn attack
    let opponentPawn = bycolor + '-pawn';
    let pawnDir = bywhite ? (whiteup ? -1 : 1) : (whiteup ? 1 : -1);
    let pawnFromRowIndex = rowIndex - pawnDir;
    if (inRange(pawnFromRowIndex) && inRange(columnIndex - 1) && rows[pawnFromRowIndex].columns[columnIndex - 1].piece === opponentPawn) {
        return true;
    }
    if (inRange(pawnFromRowIndex) && inRange(columnIndex + 1) && rows[pawnFromRowIndex + pawnDir].columns[columnIndex + 1].piece === opponentPawn) {
        return true;
    }
    // Check for knight attack
    let opponentKnight = bycolor + '-knight';
    if (inRange(rowIndex + 2) && inRange(columnIndex + 1) && rows[rowIndex + 2].columns[columnIndex + 1].piece === opponentKnight) {
        return true;
    }
    if (inRange(rowIndex + 2) && inRange(columnIndex - 1) && rows[rowIndex + 2].columns[columnIndex - 1].piece === opponentKnight) {
        return true;
    }
    if (inRange(rowIndex + 1) && inRange(columnIndex + 2) && rows[rowIndex + 1].columns[columnIndex + 2].piece === opponentKnight) {
        return true;
    }
    if (inRange(rowIndex + 1) && inRange(columnIndex - 2) && rows[rowIndex + 1].columns[columnIndex - 2].piece === opponentKnight) {
        return true;
    }
    if (inRange(rowIndex - 2) && inRange(columnIndex + 1) && rows[rowIndex - 2].columns[columnIndex + 1].piece === opponentKnight) {
        return true;
    }
    if (inRange(rowIndex - 2) && inRange(columnIndex - 1) && rows[rowIndex - 2].columns[columnIndex - 1].piece === opponentKnight) {
        return true;
    }
    if (inRange(rowIndex - 1) && inRange(columnIndex + 2) && rows[rowIndex - 1].columns[columnIndex + 2].piece === opponentKnight) {
        return true;
    }
    if (inRange(rowIndex - 1) && inRange(columnIndex - 2) && rows[rowIndex - 1].columns[columnIndex - 2].piece === opponentKnight) {
        return true;
    }
    // Check for king attack
    let opponentKing = bycolor + '-king';
    if (inRange(rowIndex - 1) && inRange(columnIndex - 1) && rows[rowIndex - 1].columns[columnIndex - 1].piece === opponentKing) {
        return true;
    }
    if (inRange(rowIndex - 1) && inRange(columnIndex + 1) && rows[rowIndex - 1].columns[columnIndex + 1].piece === opponentKing) {
        return true;
    }
    if (inRange(rowIndex - 1) && rows[rowIndex - 1].columns[columnIndex].piece === opponentKing) {
        return true;
    }
    if (inRange(columnIndex - 1) && rows[rowIndex].columns[columnIndex - 1].piece === opponentKing) {
        return true;
    }
    if (inRange(columnIndex + 1) && rows[rowIndex].columns[columnIndex + 1].piece === opponentKing) {
        return true;
    }
    if (inRange(rowIndex + 1) && inRange(columnIndex - 1) && rows[rowIndex + 1].columns[columnIndex - 1].piece === opponentKing) {
        return true;
    }
    if (inRange(rowIndex + 1) && inRange(columnIndex + 1) && rows[rowIndex + 1].columns[columnIndex + 1].piece === opponentKing) {
        return true;
    }
    if (inRange(rowIndex + 1) && rows[rowIndex + 1].columns[columnIndex].piece === opponentKing) {
        return true;
    }
    // Check for rook or queen attack
    let opponentRook = bycolor + '-rook';
    let opponentQueen = bycolor + '-queen';
    // Increasing row
    let blocked = false;
    for (let r = rowIndex + 1; r < 8 && !blocked; r++) {
        const p = rows[r].columns[columnIndex].piece;
        if (p === opponentRook || p === opponentQueen) {
            return true;
        }
        blocked = p !== '';
    }
    // Decreasing row
    blocked = false;
    for (let r = rowIndex - 1; r > -1 && !blocked; r--) {
        const p = rows[r].columns[columnIndex].piece;
        if (p === opponentRook || p === opponentQueen) {
            return true;
        }
        blocked = p !== '';
    }
    // Increasing column
    blocked = false;
    for (let c = columnIndex + 1; c < 8 && !blocked; c++) {
        const p = rows[rowIndex].columns[c].piece;
        if (p === opponentRook || p === opponentQueen) {
            return true;
        }
        blocked = p !== '';
    }
    // Decreasing column
    blocked = false;
    for (let c = columnIndex - 1; c > -1 && !blocked; c--) {
        const p = rows[rowIndex].columns[c].piece;
        if (p === opponentRook || p === opponentQueen) {
            return true;
        }
        blocked = p !== '';
    }
    // Check for bishop or queen attack
    let opponentBishop = bycolor + '-bishop';
    // Increasing row with increasing column
    blocked = false;
    for (let r = rowIndex + 1, c = columnIndex + 1; r < 8 && c < 8 && !blocked; r++, c++) {
        const p = rows[r].columns[c].piece;
        if (p === opponentBishop || p === opponentQueen) {
            return true;
        }
        blocked = p !== '';
    }
    // Increasing row with decreasing column
    blocked = false;
    for (let r = rowIndex + 1, c = columnIndex - 1; r < 8 && c > -1 && !blocked; r++, c--) {
        const p = rows[r].columns[c].piece;
        if (p === opponentBishop || p === opponentQueen) {
            return true;
        }
        blocked = p !== '';
    }
    // Decreasing row with increasing column
    blocked = false;
    for (let r = rowIndex - 1, c = columnIndex + 1; r > -1 && c < 8 && !blocked; r--, c++) {
        const p = rows[r].columns[c].piece;
        if (p === opponentBishop || p === opponentQueen) {
            return true;
        }
        blocked = p !== '';
    }
    // Decreasing row with decreasing column
    blocked = false;
    for (let r = rowIndex - 1, c = columnIndex - 1; r > -1 && c > -1 && !blocked; r--, c--) {
        const p = rows[r].columns[c].piece;
        if (p === opponentBishop || p === opponentQueen) {
            return true;
        }
        blocked = p !== '';
    }
    return false;
}

function inRange(value) {
    return (value >-1 && value < 7);
}

export default squareAttacked;