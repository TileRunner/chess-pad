import * as c from './constants';

const Pieces = ({piece, setPiece}) => {
    return (
        <div>
            <h1>Pieces</h1>
            <table className="piece board">
                <tbody>
                    <tr>
                        <td square-color='white' piece={c.WHITE_ROOK} square-selected={piece === c.WHITE_ROOK ? 'Y' : 'N'} onClick={() => {setPiece(c.WHITE_ROOK);}}></td>
                        <td square-color='black' piece={c.BLACK_ROOK} square-selected={piece === c.BLACK_ROOK ? 'Y' : 'N'} onClick={() => {setPiece(c.BLACK_ROOK);}}></td>
                    </tr>
                    <tr>
                        <td square-color='black' piece={c.WHITE_KNIGHT} square-selected={piece === c.WHITE_KNIGHT ? 'Y' : 'N'} onClick={() => {setPiece(c.WHITE_KNIGHT);}}></td>
                        <td square-color='white' piece={c.BLACK_KNIGHT} square-selected={piece === c.BLACK_KNIGHT ? 'Y' : 'N'} onClick={() => {setPiece(c.BLACK_KNIGHT);}}></td>
                    </tr>
                    <tr>
                        <td square-color='white' piece={c.WHITE_BISHOP} square-selected={piece === c.WHITE_BISHOP ? 'Y' : 'N'} onClick={() => {setPiece(c.WHITE_BISHOP);}}></td>
                        <td square-color='black' piece={c.BLACK_BISHOP} square-selected={piece === c.BLACK_BISHOP ? 'Y' : 'N'} onClick={() => {setPiece(c.BLACK_BISHOP);}}></td>
                    </tr>
                    <tr>
                        <td square-color='black' piece={c.WHITE_QUEEN} square-selected={piece === c.WHITE_QUEEN ? 'Y' : 'N'} onClick={() => {setPiece(c.WHITE_QUEEN);}}></td>
                        <td square-color='white' piece={c.BLACK_QUEEN} square-selected={piece === c.BLACK_QUEEN ? 'Y' : 'N'} onClick={() => {setPiece(c.BLACK_QUEEN);}}></td>
                    </tr>
                    <tr>
                        <td square-color='white' piece={c.WHITE_KING} square-selected={piece === c.WHITE_KING ? 'Y' : 'N'} onClick={() => {setPiece(c.WHITE_KING);}}></td>
                        <td square-color='black' piece={c.BLACK_KING} square-selected={piece === c.BLACK_KING ? 'Y' : 'N'} onClick={() => {setPiece(c.BLACK_KING);}}></td>
                    </tr>
                    <tr>
                        <td square-color='black' piece={c.WHITE_PAWN} square-selected={piece === c.WHITE_PAWN ? 'Y' : 'N'} onClick={() => {setPiece(c.WHITE_PAWN);}}></td>
                        <td square-color='white' piece={c.BLACK_PAWN} square-selected={piece === c.BLACK_PAWN ? 'Y' : 'N'} onClick={() => {setPiece(c.BLACK_PAWN);}}></td>
                    </tr>
                    <tr>
                        <td square-color='white' piece='none' onClick={() => {setPiece('');}}></td>
                        <td square-color='black' piece='none' onClick={() => {setPiece('');}}></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default Pieces;
