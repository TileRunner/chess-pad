import {useState} from 'react';
const Board = ({rows=[],setRows,piece,setPiece,mode='',whiteup=true}) => {
    const [moveStarted, setMoveStarted] = useState(false);
    return (
        <div>
            <h1>Board</h1>
            <table className="board">
                <tbody>
                    {rows.map((row, rindex) => (
                        <tr key={`row${rindex}`}>
                            {row.columns.map((column, cindex) => (
                                <td key={`row${rindex}col${cindex}`}
                                    square-color=
                                    {(rindex % 2 === 0 && cindex % 2 === 0) ||
                                     (rindex % 2 === 1 && cindex % 2 === 1)
                                     ? whiteup ? 'white' : 'black' : whiteup ? 'black' : 'white'
                                    }
                                    piece={column.piece}
                                    onClick={() => {
                                        let newrows = JSON.parse(JSON.stringify(rows));
                                        if (mode === 'Setup') {
                                            if (newrows[rindex].columns[cindex].piece === piece) {
                                                newrows[rindex].columns[cindex].piece = '';
                                            } else {
                                                newrows[rindex].columns[cindex].piece =  piece;
                                            }
                                        } else {
                                            if (moveStarted) {
                                                setMoveStarted(false);
                                                setPiece('');
                                                newrows[rindex].columns[cindex].piece = piece;
                                            } else {
                                                if (newrows[rindex].columns[cindex].piece !== '') {
                                                    setMoveStarted(true);
                                                    setPiece(newrows[rindex].columns[cindex].piece);
                                                    newrows[rindex].columns[cindex].piece = '';
                                                }
                                            }
                                        }
                                        setRows(newrows);
                                    }}>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Board;