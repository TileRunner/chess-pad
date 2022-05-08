/**
 * Check the validity of the chess move. En passant and castling do not call. We already checked that
 * they actually moved a piece and are not taking their own piece. Does not check for check violations.
 * @param {array} rows The rows of the chess board, each row contains the columns, each column specifying the piece there
 * @param {any} fromInfo The rowIndex, columnIndex, and piece relating to the piece being moved from that square
 * @param {int} rindex The row index for where they want to move to
 * @param {int} cindex The column index for where they want to move to
 * @param {boolean} whiteup Whether white is playing up the board
 * @returns {any} Object: castled (bool), newrows
 */
 function handleCastling(rows, fromInfo, rindex, cindex, whiteup) {
    // Detect king side castle for white with white playing up
    if (whiteup &&
        fromInfo.piece === 'white-king' &&
        fromInfo.rowIndex === 7 &&
        fromInfo.columnIndex === 4 &&
        rindex === 7 &&
        cindex === 6 &&
        rows[7].columns[7].piece === 'white-rook' &&
        rows[7].columns[6].piece === '' &&
        rows[7].columns[5].piece === '')
    {
        let newrows = JSON.parse(JSON.stringify(rows));
        newrows[7].columns[4].piece = '';
        newrows[7].columns[5].piece = 'white-rook';
        newrows[7].columns[6].piece = 'white-king';
        newrows[7].columns[7].piece = '';
        return {castled: true, newrows: newrows};
    }
    // Detect king side castle for black with white playing up
    if (whiteup &&
        fromInfo.piece === 'black-king' &&
        fromInfo.rowIndex === 0 &&
        fromInfo.columnIndex === 4 &&
        rindex === 0 &&
        cindex === 6 &&
        rows[0].columns[7].piece === 'black-rook' &&
        rows[0].columns[6].piece === '' &&
        rows[0].columns[5].piece === '')
    {
        let newrows = JSON.parse(JSON.stringify(rows));
        newrows[0].columns[4].piece = '';
        newrows[0].columns[5].piece = 'black-rook';
        newrows[0].columns[6].piece = 'black-king';
        newrows[0].columns[7].piece = '';
        return {castled: true, newrows: newrows};
    }
    // Detect queen side castle for white with white playing up
    if (whiteup &&
        fromInfo.piece === 'white-king' &&
        fromInfo.rowIndex === 7 &&
        fromInfo.columnIndex === 4 &&
        rindex === 7 &&
        cindex === 2 &&
        rows[7].columns[0].piece === 'white-rook' &&
        rows[7].columns[1].piece === '' &&
        rows[7].columns[2].piece === '' &&
        rows[7].columns[3].piece === '')
    {
        let newrows = JSON.parse(JSON.stringify(rows));
        newrows[7].columns[0].piece = '';
        newrows[7].columns[1].piece = '';
        newrows[7].columns[2].piece = 'white-king';
        newrows[7].columns[3].piece = 'white-rook';
        newrows[7].columns[4].piece = '';
        return {castled: true, newrows: newrows};
    }
    // Detect queen side castle for black with white playing up
    if (whiteup &&
        fromInfo.piece === 'black-king' &&
        fromInfo.rowIndex === 0 &&
        fromInfo.columnIndex === 4 &&
        rindex === 0 &&
        cindex === 2 &&
        rows[0].columns[0].piece === 'black-rook' &&
        rows[0].columns[1].piece === '' &&
        rows[0].columns[2].piece === '' &&
        rows[0].columns[3].piece === '')
    {
        let newrows = JSON.parse(JSON.stringify(rows));
        newrows[0].columns[0].piece = '';
        newrows[0].columns[1].piece = '';
        newrows[0].columns[2].piece = 'black-king';
        newrows[0].columns[3].piece = 'black-rook';
        newrows[0].columns[4].piece = '';
        return {castled: true, newrows: newrows};
    }
    // Detect king side castle for white with black playing up
    if (!whiteup &&
        fromInfo.piece === 'white-king' &&
        fromInfo.rowIndex === 0 &&
        fromInfo.columnIndex === 3 &&
        rindex === 0 &&
        cindex === 1 &&
        rows[0].columns[0].piece === 'white-rook' &&
        rows[0].columns[1].piece === '' &&
        rows[0].columns[2].piece === '')
    {
        let newrows = JSON.parse(JSON.stringify(rows));
        newrows[0].columns[0].piece = '';
        newrows[0].columns[1].piece = 'white-king';
        newrows[0].columns[2].piece = 'white-rook';
        newrows[0].columns[3].piece = '';
        return {castled: true, newrows: newrows};
    }
    // Detect king side castle for black with black playing up
    if (!whiteup &&
        fromInfo.piece === 'black-king' &&
        fromInfo.rowIndex === 7 &&
        fromInfo.columnIndex === 3 &&
        rindex === 7 &&
        cindex === 1 &&
        rows[7].columns[0].piece === 'black-rook' &&
        rows[7].columns[1].piece === '' &&
        rows[7].columns[2].piece === '')
    {
        let newrows = JSON.parse(JSON.stringify(rows));
        newrows[7].columns[0].piece = '';
        newrows[7].columns[1].piece = 'black-king';
        newrows[7].columns[2].piece = 'black-rook';
        newrows[7].columns[3].piece = '';
        return {castled: true, newrows: newrows};
    }
    // Detect queen side castle for white with black playing up
    if (!whiteup &&
        fromInfo.piece === 'white-king' &&
        fromInfo.rowIndex === 0 &&
        fromInfo.columnIndex === 3 &&
        rindex === 0 &&
        cindex === 5 &&
        rows[0].columns[7].piece === 'white-rook' &&
        rows[0].columns[6].piece === '' &&
        rows[0].columns[5].piece === '' &&
        rows[0].columns[4].piece === '')
    {
        let newrows = JSON.parse(JSON.stringify(rows));
        newrows[0].columns[7].piece = '';
        newrows[0].columns[6].piece = '';
        newrows[0].columns[5].piece = 'white-king';
        newrows[0].columns[4].piece = 'white-rook';
        newrows[0].columns[3].piece = '';
        return {castled: true, newrows: newrows};
    }
    // Detect queen side castle for black with black playing up
    if (!whiteup &&
        fromInfo.piece === 'black-king' &&
        fromInfo.rowIndex === 7 &&
        fromInfo.columnIndex === 3 &&
        rindex === 7 &&
        cindex === 5 &&
        rows[7].columns[7].piece === 'black-rook' &&
        rows[7].columns[6].piece === '' &&
        rows[7].columns[5].piece === '' &&
        rows[7].columns[4].piece === '')
    {
        let newrows = JSON.parse(JSON.stringify(rows));
        newrows[7].columns[7].piece = '';
        newrows[7].columns[6].piece = '';
        newrows[7].columns[5].piece = 'black-king';
        newrows[7].columns[4].piece = 'black-rook';
        newrows[7].columns[3].piece = '';
        return {castled: true, newrows: newrows};
    }
    return {castled: false};
}

export default handleCastling;