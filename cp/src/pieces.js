const Pieces = ({piece, setPiece}) => {
    return (
        <div>
            <h1>Pieces</h1>
            <table className="piece board">
                <tbody>
                    <tr>
                        <td square-color='white' piece='white-rook' square-selected={piece === 'white-rook' ? 'Y' : 'N'} onClick={() => {setPiece('white-rook');}}></td>
                        <td square-color='black' piece='black-rook' square-selected={piece === 'black-rook' ? 'Y' : 'N'} onClick={() => {setPiece('black-rook');}}></td>
                    </tr>
                    <tr>
                        <td square-color='black' piece='white-knight' square-selected={piece === 'white-knight' ? 'Y' : 'N'} onClick={() => {setPiece('white-knight');}}></td>
                        <td square-color='white' piece='black-knight' square-selected={piece === 'black-knight' ? 'Y' : 'N'} onClick={() => {setPiece('black-knight');}}></td>
                    </tr>
                    <tr>
                        <td square-color='white' piece='white-bishop' square-selected={piece === 'white-bishop' ? 'Y' : 'N'} onClick={() => {setPiece('white-bishop');}}></td>
                        <td square-color='black' piece='black-bishop' square-selected={piece === 'black-bishop' ? 'Y' : 'N'} onClick={() => {setPiece('black-bishop');}}></td>
                    </tr>
                    <tr>
                        <td square-color='black' piece='white-queen' square-selected={piece === 'white-queen' ? 'Y' : 'N'} onClick={() => {setPiece('white-queen');}}></td>
                        <td square-color='white' piece='black-queen' square-selected={piece === 'black-queen' ? 'Y' : 'N'} onClick={() => {setPiece('black-queen');}}></td>
                    </tr>
                    <tr>
                        <td square-color='white' piece='white-king' square-selected={piece === 'white-king' ? 'Y' : 'N'} onClick={() => {setPiece('white-king');}}></td>
                        <td square-color='black' piece='black-king' square-selected={piece === 'black-king' ? 'Y' : 'N'} onClick={() => {setPiece('black-king');}}></td>
                    </tr>
                    <tr>
                        <td square-color='black' piece='white-pawn' square-selected={piece === 'white-pawn' ? 'Y' : 'N'} onClick={() => {setPiece('white-pawn');}}></td>
                        <td square-color='white' piece='black-pawn' square-selected={piece === 'black-pawn' ? 'Y' : 'N'} onClick={() => {setPiece('black-pawn');}}></td>
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
