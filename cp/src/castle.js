import squareAttacked from "./squareAttacked";
import * as c from './constants';
/**
 * Check the validity of the chess move. En passant and castling do not call. We already checked that
 * they actually moved a piece and are not taking their own piece. Does not check for check violations.
 * @param {array} rows The rows of the chess board, each row contains the columns, each column specifying the piece there
 * @param {any} fromInfo The rowIndex, columnIndex, and piece relating to the piece being moved from that square
 * @param {int} rindex The row index for where they want to move to
 * @param {int} cindex The column index for where they want to move to
 * @param {boolean} whiteup Whether white is playing up the board
 * @returns {any} Object: castled (bool), newrows (array), fromCheck (bool), thruCheck (bool)
 */
 function handleCastling(rows, fromInfo, rindex, cindex, whiteup) {
    // Detect king side castle for white with white playing up
    if (whiteup &&
        fromInfo.piece === c.WHITE_KING &&
        fromInfo.rowIndex === 7 &&
        fromInfo.columnIndex === 4 &&
        rindex === 7 &&
        cindex === 6 &&
        rows[7].columns[7].piece === c.WHITE_ROOK &&
        rows[7].columns[6].piece === '' &&
        rows[7].columns[5].piece === '')
    {
        let fromCheck = squareAttacked(rows, whiteup, 'black', 7, 4);
        let thruCheck = squareAttacked(rows, whiteup, 'black', 7, 5);
        let intoCheck = squareAttacked(rows, whiteup, 'black', 7, 6);
        let newrows = JSON.parse(JSON.stringify(rows));
        newrows[7].columns[4].piece = '';
        newrows[7].columns[5].piece = c.WHITE_ROOK;
        newrows[7].columns[6].piece = c.WHITE_KING;
        newrows[7].columns[7].piece = '';
        return {castled: true, newrows: newrows, fromCheck: fromCheck, thruCheck: thruCheck, intoCheck: intoCheck};
    }
    // Detect king side castle for black with white playing up
    if (whiteup &&
        fromInfo.piece === c.BLACK_KING &&
        fromInfo.rowIndex === 0 &&
        fromInfo.columnIndex === 4 &&
        rindex === 0 &&
        cindex === 6 &&
        rows[0].columns[7].piece === c.BLACK_ROOK &&
        rows[0].columns[6].piece === '' &&
        rows[0].columns[5].piece === '')
    {
        let fromCheck = squareAttacked(rows, whiteup, 'white', 0, 4);
        let thruCheck = squareAttacked(rows, whiteup, 'white', 0, 5);
        let intoCheck = squareAttacked(rows, whiteup, 'white', 0, 6);
        let newrows = JSON.parse(JSON.stringify(rows));
        newrows[0].columns[4].piece = '';
        newrows[0].columns[5].piece = c.BLACK_ROOK;
        newrows[0].columns[6].piece = c.BLACK_KING;
        newrows[0].columns[7].piece = '';
        return {castled: true, newrows: newrows, fromCheck: fromCheck, thruCheck: thruCheck, intoCheck};
    }
    // Detect queen side castle for white with white playing up
    if (whiteup &&
        fromInfo.piece === c.WHITE_KING &&
        fromInfo.rowIndex === 7 &&
        fromInfo.columnIndex === 4 &&
        rindex === 7 &&
        cindex === 2 &&
        rows[7].columns[0].piece === c.WHITE_ROOK &&
        rows[7].columns[1].piece === '' &&
        rows[7].columns[2].piece === '' &&
        rows[7].columns[3].piece === '')
    {
        let fromCheck = squareAttacked(rows, whiteup, 'black', 7, 4);
        let thruCheck = squareAttacked(rows, whiteup, 'black', 7, 3);
        let intoCheck = squareAttacked(rows, whiteup, 'black', 7, 2);
        let newrows = JSON.parse(JSON.stringify(rows));
        newrows[7].columns[0].piece = '';
        newrows[7].columns[1].piece = '';
        newrows[7].columns[2].piece = c.WHITE_KING;
        newrows[7].columns[3].piece = c.WHITE_ROOK;
        newrows[7].columns[4].piece = '';
        return {castled: true, newrows: newrows, fromCheck: fromCheck, thruCheck: thruCheck, intoCheck: intoCheck};
    }
    // Detect queen side castle for black with white playing up
    if (whiteup &&
        fromInfo.piece === c.BLACK_KING &&
        fromInfo.rowIndex === 0 &&
        fromInfo.columnIndex === 4 &&
        rindex === 0 &&
        cindex === 2 &&
        rows[0].columns[0].piece === c.BLACK_ROOK &&
        rows[0].columns[1].piece === '' &&
        rows[0].columns[2].piece === '' &&
        rows[0].columns[3].piece === '')
    {
        let fromCheck = squareAttacked(rows, whiteup, 'white', 0, 4);
        let thruCheck = squareAttacked(rows, whiteup, 'white', 0, 3);
        let intoCheck = squareAttacked(rows, whiteup, 'white', 0, 2);
        let newrows = JSON.parse(JSON.stringify(rows));
        newrows[0].columns[0].piece = '';
        newrows[0].columns[1].piece = '';
        newrows[0].columns[2].piece = c.BLACK_KING;
        newrows[0].columns[3].piece = c.BLACK_ROOK;
        newrows[0].columns[4].piece = '';
        return {castled: true, newrows: newrows, fromCheck: fromCheck, thruCheck: thruCheck, intoCheck: intoCheck};
    }
    // Detect king side castle for white with black playing up
    if (!whiteup &&
        fromInfo.piece === c.WHITE_KING &&
        fromInfo.rowIndex === 0 &&
        fromInfo.columnIndex === 3 &&
        rindex === 0 &&
        cindex === 1 &&
        rows[0].columns[0].piece === c.WHITE_ROOK &&
        rows[0].columns[1].piece === '' &&
        rows[0].columns[2].piece === '')
    {
        let fromCheck = squareAttacked(rows, whiteup, 'black', 0, 3);
        let thruCheck = squareAttacked(rows, whiteup, 'black', 0, 2);
        let intoCheck = squareAttacked(rows, whiteup, 'black', 0, 1);
        let newrows = JSON.parse(JSON.stringify(rows));
        newrows[0].columns[0].piece = '';
        newrows[0].columns[1].piece = c.WHITE_KING;
        newrows[0].columns[2].piece = c.WHITE_ROOK;
        newrows[0].columns[3].piece = '';
        return {castled: true, newrows: newrows, fromCheck: fromCheck, thruCheck: thruCheck, intoCheck: intoCheck};
    }
    // Detect king side castle for black with black playing up
    if (!whiteup &&
        fromInfo.piece === c.BLACK_KING &&
        fromInfo.rowIndex === 7 &&
        fromInfo.columnIndex === 3 &&
        rindex === 7 &&
        cindex === 1 &&
        rows[7].columns[0].piece === c.BLACK_ROOK &&
        rows[7].columns[1].piece === '' &&
        rows[7].columns[2].piece === '')
    {
        let fromCheck = squareAttacked(rows, whiteup, 'white', 7, 3);
        let thruCheck = squareAttacked(rows, whiteup, 'white', 7, 2);
        let intoCheck = squareAttacked(rows, whiteup, 'white', 7, 1);
        let newrows = JSON.parse(JSON.stringify(rows));
        newrows[7].columns[0].piece = '';
        newrows[7].columns[1].piece = c.BLACK_KING;
        newrows[7].columns[2].piece = c.BLACK_ROOK;
        newrows[7].columns[3].piece = '';
        return {castled: true, newrows: newrows, fromCheck: fromCheck, thruCheck: thruCheck, intoCheck: intoCheck};
    }
    // Detect queen side castle for white with black playing up
    if (!whiteup &&
        fromInfo.piece === c.WHITE_KING &&
        fromInfo.rowIndex === 0 &&
        fromInfo.columnIndex === 3 &&
        rindex === 0 &&
        cindex === 5 &&
        rows[0].columns[7].piece === c.WHITE_ROOK &&
        rows[0].columns[6].piece === '' &&
        rows[0].columns[5].piece === '' &&
        rows[0].columns[4].piece === '')
    {
        let fromCheck = squareAttacked(rows, whiteup, 'black', 0, 3);
        let thruCheck = squareAttacked(rows, whiteup, 'black', 0, 4);
        let intoCheck = squareAttacked(rows, whiteup, 'black', 0, 5);
        let newrows = JSON.parse(JSON.stringify(rows));
        newrows[0].columns[7].piece = '';
        newrows[0].columns[6].piece = '';
        newrows[0].columns[5].piece = c.WHITE_KING;
        newrows[0].columns[4].piece = c.WHITE_ROOK;
        newrows[0].columns[3].piece = '';
        return {castled: true, newrows: newrows, fromCheck: fromCheck, thruCheck: thruCheck, intoCheck: intoCheck};
    }
    // Detect queen side castle for black with black playing up
    if (!whiteup &&
        fromInfo.piece === c.BLACK_KING &&
        fromInfo.rowIndex === 7 &&
        fromInfo.columnIndex === 3 &&
        rindex === 7 &&
        cindex === 5 &&
        rows[7].columns[7].piece === c.BLACK_ROOK &&
        rows[7].columns[6].piece === '' &&
        rows[7].columns[5].piece === '' &&
        rows[7].columns[4].piece === '')
    {
        let fromCheck = squareAttacked(rows, whiteup, 'white', 7, 3);
        let thruCheck = squareAttacked(rows, whiteup, 'white', 7, 4);
        let intoCheck = squareAttacked(rows, whiteup, 'white', 7, 5);
        let newrows = JSON.parse(JSON.stringify(rows));
        newrows[7].columns[7].piece = '';
        newrows[7].columns[6].piece = '';
        newrows[7].columns[5].piece = c.BLACK_KING;
        newrows[7].columns[4].piece = c.BLACK_ROOK;
        newrows[7].columns[3].piece = '';
        return {castled: true, newrows: newrows, fromCheck: fromCheck, thruCheck: thruCheck, intoCheck: intoCheck};
    }
    return {castled: false};
}

export default handleCastling;