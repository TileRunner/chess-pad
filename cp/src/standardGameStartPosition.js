import * as c from './constants';

export default function standardGameStartRows(whiteup=true) {
    let rows = Array(8).fill({columns: Array(8).fill({piece: ''})});
    rows = JSON.parse(JSON.stringify(rows));
    if (whiteup) {
        rows[0].columns[0].piece = c.BLACK_ROOK;
        rows[0].columns[1].piece = c.BLACK_KNIGHT;
        rows[0].columns[2].piece = c.BLACK_BISHOP;
        rows[0].columns[3].piece = c.BLACK_QUEEN;
        rows[0].columns[4].piece = c.BLACK_KING;
        rows[0].columns[5].piece = c.BLACK_BISHOP;
        rows[0].columns[6].piece = c.BLACK_KNIGHT;
        rows[0].columns[7].piece = c.BLACK_ROOK;
        rows[1].columns[0].piece = c.BLACK_PAWN;
        rows[1].columns[1].piece = c.BLACK_PAWN;
        rows[1].columns[2].piece = c.BLACK_PAWN;
        rows[1].columns[3].piece = c.BLACK_PAWN;
        rows[1].columns[4].piece = c.BLACK_PAWN;
        rows[1].columns[5].piece = c.BLACK_PAWN;
        rows[1].columns[6].piece = c.BLACK_PAWN;
        rows[1].columns[7].piece = c.BLACK_PAWN;
        rows[6].columns[0].piece = c.WHITE_PAWN;
        rows[6].columns[1].piece = c.WHITE_PAWN;
        rows[6].columns[2].piece = c.WHITE_PAWN;
        rows[6].columns[3].piece = c.WHITE_PAWN;
        rows[6].columns[4].piece = c.WHITE_PAWN;
        rows[6].columns[5].piece = c.WHITE_PAWN;
        rows[6].columns[6].piece = c.WHITE_PAWN;
        rows[6].columns[7].piece = c.WHITE_PAWN;
        rows[7].columns[0].piece = c.WHITE_ROOK;
        rows[7].columns[1].piece = c.WHITE_KNIGHT;
        rows[7].columns[2].piece = c.WHITE_BISHOP;
        rows[7].columns[3].piece = c.WHITE_QUEEN;
        rows[7].columns[4].piece = c.WHITE_KING;
        rows[7].columns[5].piece = c.WHITE_BISHOP;
        rows[7].columns[6].piece = c.WHITE_KNIGHT;
        rows[7].columns[7].piece = c.WHITE_ROOK;
    } else {
        rows[0].columns[0].piece = c.WHITE_ROOK
        rows[0].columns[1].piece = c.WHITE_KNIGHT;
        rows[0].columns[2].piece = c.WHITE_BISHOP;
        rows[0].columns[3].piece = c.WHITE_KING;
        rows[0].columns[4].piece = c.WHITE_QUEEN;
        rows[0].columns[5].piece = c.WHITE_BISHOP;
        rows[0].columns[6].piece = c.WHITE_KNIGHT;
        rows[0].columns[7].piece = c.WHITE_ROOK;
        rows[1].columns[0].piece = c.WHITE_PAWN;
        rows[1].columns[1].piece = c.WHITE_PAWN;
        rows[1].columns[2].piece = c.WHITE_PAWN;
        rows[1].columns[3].piece = c.WHITE_PAWN;
        rows[1].columns[4].piece = c.WHITE_PAWN;
        rows[1].columns[5].piece = c.WHITE_PAWN;
        rows[1].columns[6].piece = c.WHITE_PAWN;
        rows[1].columns[7].piece = c.WHITE_PAWN;
        rows[6].columns[0].piece = c.BLACK_PAWN;
        rows[6].columns[1].piece = c.BLACK_PAWN;
        rows[6].columns[2].piece = c.BLACK_PAWN;
        rows[6].columns[3].piece = c.BLACK_PAWN;
        rows[6].columns[4].piece = c.BLACK_PAWN;
        rows[6].columns[5].piece = c.BLACK_PAWN;
        rows[6].columns[6].piece = c.BLACK_PAWN;
        rows[6].columns[7].piece = c.BLACK_PAWN;
        rows[7].columns[0].piece = c.BLACK_ROOK;
        rows[7].columns[1].piece = c.BLACK_KNIGHT;
        rows[7].columns[2].piece = c.BLACK_BISHOP;
        rows[7].columns[3].piece = c.BLACK_KING;
        rows[7].columns[4].piece = c.BLACK_QUEEN;
        rows[7].columns[5].piece = c.BLACK_BISHOP;
        rows[7].columns[6].piece = c.BLACK_KNIGHT;
        rows[7].columns[7].piece = c.BLACK_ROOK;
   }
    return rows;
}