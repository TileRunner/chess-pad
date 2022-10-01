import { useState } from "react";
import validateMove from "./validate";
import handleCastling from "./castle";
import squareAttacked from "./squareAttacked";
import * as c from './constants';

const Board = ({rows=[], setRows, piece, mode='', whiteup=true, savedPositions, setSavedPositions, moveStarted, setMoveStarted}) => {
    const [fromInfo, setFromInfo] = useState({rowIndex:-1,columnIndex:-1,piece:''});
    const [promotingPawn, setPromotingPawn] = useState(false);
    const [toInfo, setToInfo] = useState({rowIndex:-1,columnIndex:-1,color:''});
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
                // Must click on correct colour piece
                let tomove = savedPositions.length % 2 === 1 ? whiteup ? 'w' : 'b' : whiteup ? 'b' : 'w';
                if (clickedPiece[0] !== tomove) {
                    alert(`${tomove === "w" ? "White" : "Black"} to move`);
                    return;
                }
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
        let castle = handleCastling(rows, fromInfo, rindex, cindex, whiteup);
        if (castle.castled) {
            if (castle.fromCheck) {
                alert('Cannot castle out of check');
                return;
            }
            if (castle.thruCheck) {
                alert('Cannot castle through check');
                return;
            }
            if (castle.intoCheck) {
                alert('Cannot castle into check');
                return;
            }
            newrows = JSON.parse(JSON.stringify(castle.newrows));
        }
        // Detect en passant
        else if ((fromInfo.piece === c.WHITE_PAWN || fromInfo.piece === c.BLACK_PAWN) &&
            Math.abs(fromInfo.columnIndex - cindex) === 1 &&
            Math.abs(fromInfo.rowIndex - rindex) === 1 &&
            clickedPiece === '' &&
            rows[fromInfo.rowIndex].columns[cindex].piece === (fromInfo.piece === c.WHITE_PAWN ? c.BLACK_PAWN : c.WHITE_PAWN))
        {
            newrows[fromInfo.rowIndex].columns[cindex].piece = '';
            newrows[fromInfo.rowIndex].columns[fromInfo.columnIndex].piece = '';
            newrows[rindex].columns[cindex].piece = fromInfo.piece;
        }
        else {
            // Check validity
            let msg = validateMove(rows, fromInfo, rindex, cindex, whiteup);
            if (msg) {
                alert(msg);
                return;
            }
            newrows[fromInfo.rowIndex].columns[fromInfo.columnIndex].piece = '';
            newrows[rindex].columns[cindex].piece = fromInfo.piece;
        }
        // Did they move into check?
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (fromInfo.piece[0] === 'w' && newrows[r].columns[c].piece === c.WHITE_KING) {
                    if (squareAttacked(newrows, whiteup, 'black', r, c)) {
                        alert("You cannot move into check");
                        return;
                    }
                }
                if (fromInfo.piece[0] === 'b' && newrows[r].columns[c].piece === c.BLACK_KING) {
                    if (squareAttacked(newrows, whiteup, 'white', r, c)) {
                        alert("You cannot move into check");
                        return;
                    }
                }
            }
        }
        let newSavePositions = JSON.parse(JSON.stringify(savedPositions));
        newSavePositions.push(newrows);
        setMoveStarted(false);
        setSavedPositions(newSavePositions);
        setRows(newrows);
        let needToPromotePawn = (fromInfo.piece === c.WHITE_PAWN || fromInfo.piece === c.BLACK_PAWN) && (rindex % 7 === 0);
        if (needToPromotePawn) {
            setPromotingPawn(true);
            setToInfo({rowIndex: rindex, columnIndex: cindex, color: fromInfo.piece[0] === 'w' ? 'white' : 'black'});
        }
    }

    function promotePawn(targetPiece) {
        let newrows = JSON.parse(JSON.stringify(rows));
        newrows[toInfo.rowIndex].columns[toInfo.columnIndex].piece = targetPiece;
        setRows(newrows);
        setPromotingPawn(false);
    }

    const PromoteOptions =() => <div>
        <h2>Pawn Promotion</h2>
        <button onClick={() => {promotePawn(toInfo.color === 'white' ? c.WHITE_ROOK : c.BLACK_ROOK);}}
            piece={toInfo.color === 'white' ? c.WHITE_ROOK : c.BLACK_ROOK}
            square-color={(toInfo.rowIndex % 2 === 0 && toInfo.columnIndex % 2 === 0) ||
                (toInfo.rowIndex % 2 === 1 && toInfo.columnIndex % 2 === 1)
                ? 'white' : 'black'}
            className='promote'
            ></button>
        <button onClick={() => {promotePawn(toInfo.color === 'white' ? c.WHITE_KNIGHT : c.BLACK_KNIGHT);}}
            piece={toInfo.color === 'white' ? c.WHITE_KNIGHT : c.BLACK_KNIGHT}
            square-color={(toInfo.rowIndex % 2 === 0 && toInfo.columnIndex % 2 === 0) ||
                (toInfo.rowIndex % 2 === 1 && toInfo.columnIndex % 2 === 1)
                ? 'white' : 'black'}
            className='promote'
            ></button>
        <button onClick={() => {promotePawn(toInfo.color === 'white' ? c.WHITE_BISHOP : c.BLACK_BISHOP);}}
            piece={toInfo.color === 'white' ? c.WHITE_BISHOP : c.BLACK_BISHOP}
            square-color={(toInfo.rowIndex % 2 === 0 && toInfo.columnIndex % 2 === 0) ||
                (toInfo.rowIndex % 2 === 1 && toInfo.columnIndex % 2 === 1)
                ? 'white' : 'black'}
            className='promote'
            ></button>
        <button onClick={() => {promotePawn(toInfo.color === 'white' ? c.WHITE_QUEEN : c.BLACK_QUEEN);}}
            piece={toInfo.color === 'white' ? c.WHITE_QUEEN : c.BLACK_QUEEN}
            square-color={(toInfo.rowIndex % 2 === 0 && toInfo.columnIndex % 2 === 0) ||
                (toInfo.rowIndex % 2 === 1 && toInfo.columnIndex % 2 === 1)
                ? 'white' : 'black'}
            className='promote'
            ></button>
    </div>

    return (
        <div>
            <h1>Board</h1>
            {promotingPawn && <PromoteOptions></PromoteOptions>}
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
                                    onClick={() => {!promotingPawn && handleSquareClick(rindex,cindex);}}>
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