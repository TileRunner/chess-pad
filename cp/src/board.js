import {useState} from 'react';
const Board = ({rows=[],setRows,piece,setPiece,mode='',whiteup=true}) => {
    const [moveStarted, setMoveStarted] = useState(false);
    const EdgeRow =() =>
        <tr>
            <td className='edgeCorner'></td>
            <td className='edgeColumnHeader'>{whiteup ? 'A' : 'H'}</td>
            <td className='edgeColumnHeader'>{whiteup ? 'B' : 'G'}</td>
            <td className='edgeColumnHeader'>{whiteup ? 'C' : 'F'}</td>
            <td className='edgeColumnHeader'>{whiteup ? 'D' : 'E'}</td>
            <td className='edgeColumnHeader'>{whiteup ? 'E' : 'D'}</td>
            <td className='edgeColumnHeader'>{whiteup ? 'F' : 'C'}</td>
            <td className='edgeColumnHeader'>{whiteup ? 'G' : 'B'}</td>
            <td className='edgeColumnHeader'>{whiteup ? 'H' : 'A'}</td>
            <td className='edgeCorner'></td>
        </tr>                    

    return (
        <div>
            <h1>Board</h1>
            <table className="board">
                <tbody>
                    <EdgeRow></EdgeRow>
                    {rows.map((row, rindex) => (
                        <tr key={`row${rindex}`}>
                            <td className='edgeRowHeader'>{whiteup ? 8 - rindex : rindex + 1}</td>
                            {row.columns.map((column, cindex) => (
                                <td key={`row${rindex}col${cindex}`}
                                    className='square'
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
                            <td className='edgeRowHeader'>{whiteup ? 8 - rindex : rindex + 1}</td>
                        </tr>
                    ))}
                    <EdgeRow></EdgeRow>
                </tbody>
            </table>
        </div>
    )
}

export default Board;