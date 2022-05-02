const Pieces = ({setPiece}) => {
    return (
        <div>
            <h1>Pieces</h1>
            <table className="piece board">
                <tbody>
                    <tr>
                        <td square-color='white' piece='white-rook' onClick={() => {setPiece('white-rook');}}></td>
                        <td square-color='black' piece='black-rook' onClick={() => {setPiece('black-rook');}}></td>
                    </tr>
                    <tr>
                        <td square-color='black' piece='white-knight' onClick={() => {setPiece('white-knight');}}></td>
                        <td square-color='white' piece='black-knight' onClick={() => {setPiece('black-knight');}}></td>
                    </tr>
                    <tr>
                        <td square-color='white' piece='white-bishop' onClick={() => {setPiece('white-bishop');}}></td>
                        <td square-color='black' piece='black-bishop' onClick={() => {setPiece('black-bishop');}}></td>
                    </tr>
                    <tr>
                        <td square-color='black' piece='white-queen' onClick={() => {setPiece('white-queen');}}></td>
                        <td square-color='white' piece='black-queen' onClick={() => {setPiece('black-queen');}}></td>
                    </tr>
                    <tr>
                        <td square-color='white' piece='white-king' onClick={() => {setPiece('white-king');}}></td>
                        <td square-color='black' piece='black-king' onClick={() => {setPiece('black-king');}}></td>
                    </tr>
                    <tr>
                        <td square-color='black' piece='white-pawn' onClick={() => {setPiece('white-pawn');}}></td>
                        <td square-color='white' piece='black-pawn' onClick={() => {setPiece('black-pawn');}}></td>
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
