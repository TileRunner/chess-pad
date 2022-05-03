import { useState } from "react";
const Board = ({rows=[], setRows, piece, setPiece,mode='', whiteup=true, savedPositions, setSavedPositions, moveStarted, setMoveStarted}) => {
    const [fromInfo, setFromInfo] = useState({rowIndex:-1,columnIndex:-1,piece:''});
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

    function handleSquareClick(rindex, cindex) {
        let newrows = JSON.parse(JSON.stringify(rows));
        let clickedPiece = rows[rindex].columns[cindex].piece;
        if (mode === 'Setup') {
            // If they click a piece on the board that is the selected piece, empty the square
            if (clickedPiece === piece) {
                newrows[rindex].columns[cindex].piece = '';
            } else { // Otherwise put the selected piece on that square
                newrows[rindex].columns[cindex].piece =  piece;
            }
            setRows(newrows);
            return;
        }
        // mode === 'Solve'
        if (!moveStarted) {
            // Must click a piece to start a move. Ignore click on empty square.
            if (clickedPiece !== '') {
                setMoveStarted(true);
                setFromInfo({rowIndex:rindex, columnIndex:cindex, piece:clickedPiece});
            }
            return;
        } 
        // move was started
        // Detect if they re-clicked the same square
        if (rindex === fromInfo.rowIndex && cindex === fromInfo.columnIndex) {
            // Clicking same square again cancels move start
            setMoveStarted(false);
            return;
        }
        // Detect if they just clicked a different piece of the same colour
        if ( (clickedPiece[0] === 'w' && fromInfo.piece[0] === 'w')
        || (clickedPiece[0] === 'b' && fromInfo.piece[0] === 'b') )
        {
            // They changed their mind which piece to move
            // Reflect the newly selected from info
            setFromInfo({rowIndex:rindex, columnIndex:cindex, piece: clickedPiece});
            return;
        }
        // They decided where to put the piece, end the move
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
                newrows[7].columns[4].piece = '';
                newrows[7].columns[5].piece = 'white-rook';
                newrows[7].columns[6].piece = 'white-king';
                newrows[7].columns[7].piece = '';
        } 
        // Detect king side castle for black with white playing up
        else if (whiteup &&
            fromInfo.piece === 'black-king' &&
            fromInfo.rowIndex === 0 &&
            fromInfo.columnIndex === 4 &&
            rindex === 0 &&
            cindex === 6 &&
            rows[0].columns[7].piece === 'black-rook' &&
            rows[0].columns[6].piece === '' &&
            rows[0].columns[5].piece === '')
        {
            newrows[0].columns[4].piece = '';
            newrows[0].columns[5].piece = 'black-rook';
            newrows[0].columns[6].piece = 'black-king';
            newrows[0].columns[7].piece = '';
        }
        // Detect queen side castle for white with white playing up
        else if (whiteup &&
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
            newrows[7].columns[0].piece = '';
            newrows[7].columns[1].piece = '';
            newrows[7].columns[2].piece = 'white-king';
            newrows[7].columns[3].piece = 'white-rook';
            newrows[7].columns[4].piece = '';
        }
        // Detect queen side castle for black with white playing up
        else if (whiteup &&
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
            newrows[0].columns[0].piece = '';
            newrows[0].columns[1].piece = '';
            newrows[0].columns[2].piece = 'black-king';
            newrows[0].columns[3].piece = 'black-rook';
            newrows[0].columns[4].piece = '';
        }
        // Detect king side castle for white with black playing up
        else if (!whiteup &&
            fromInfo.piece === 'white-king' &&
            fromInfo.rowIndex === 0 &&
            fromInfo.columnIndex === 3 &&
            rindex === 0 &&
            cindex === 1 &&
            rows[0].columns[0].piece === 'white-rook' &&
            rows[0].columns[1].piece === '' &&
            rows[0].columns[2].piece === '')
        {
            newrows[0].columns[0].piece = '';
            newrows[0].columns[1].piece = 'white-king';
            newrows[0].columns[2].piece = 'white-rook';
            newrows[0].columns[3].piece = '';
        }
        // Detect king side castle for black with black playing up
        else if (!whiteup &&
            fromInfo.piece === 'black-king' &&
            fromInfo.rowIndex === 7 &&
            fromInfo.columnIndex === 3 &&
            rindex === 7 &&
            cindex === 1 &&
            rows[7].columns[0].piece === 'black-rook' &&
            rows[7].columns[1].piece === '' &&
            rows[7].columns[2].piece === '')
        {
            newrows[7].columns[0].piece = '';
            newrows[7].columns[1].piece = 'black-king';
            newrows[7].columns[2].piece = 'black-rook';
            newrows[7].columns[3].piece = '';
        }
        // Detect queen side castle for white with black playing up
        else if (!whiteup &&
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
            newrows[0].columns[7].piece = '';
            newrows[0].columns[6].piece = '';
            newrows[0].columns[5].piece = 'white-king';
            newrows[0].columns[4].piece = 'white-rook';
            newrows[0].columns[3].piece = '';
        }
        // Detect queen side castle for black with black playing up
        else if (!whiteup &&
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
            newrows[7].columns[7].piece = '';
            newrows[7].columns[6].piece = '';
            newrows[7].columns[5].piece = 'black-king';
            newrows[7].columns[4].piece = 'black-rook';
            newrows[7].columns[3].piece = '';
        }
        else {
            newrows[fromInfo.rowIndex].columns[fromInfo.columnIndex].piece = '';
            newrows[rindex].columns[cindex].piece = fromInfo.piece;
        }
        let newSavePositions = JSON.parse(JSON.stringify(savedPositions));
        newSavePositions.push(newrows);
        setMoveStarted(false);
        setSavedPositions(newSavePositions);
        setRows(newrows);
    }

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
                                     ? 'white' : 'black'
                                    }
                                    square-selected={mode === 'Solve' && moveStarted && rindex === fromInfo.rowIndex && cindex === fromInfo.columnIndex ? 'Y' : 'N'}
                                    piece={column.piece}
                                    onClick={() => {handleSquareClick(rindex,cindex);}}>
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