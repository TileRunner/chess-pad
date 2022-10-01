import initialRows from './initialRows';
import standardGameStartRows from './standardGameStartPosition';

const Options = ({
    mode='', setMode,
    whiteup=true, setWhiteup,
    rows, setRows,
    startPosition, setStartPosition,
    savedPositions, setSavedPositions,
    setMoveStarted}) => {
    return (
        <div>
            <h1>Options</h1>
            <div className='optionsDiv'>
                {mode === 'Setup' ?
                    <div>
                        <h1>Setup Mode</h1>
                        <p>Click a piece from the Pieces to select.</p>
                        <p>Click each desired square on the Board to place it there.</p>
                        <h1>You Are Playing As:</h1>
                        <div className={whiteup ? 'optionsRadio On' : 'optionsRadio'}
                            onClick={() => {setWhiteup(true);}}>
                            <label>White</label>
                        </div>
                        <div className={!whiteup ? 'optionsRadio On' : 'optionsRadio'}
                            onClick={() => {setWhiteup(false);}}>
                            <label>Black</label>
                        </div>
                        <p>
                            <button onClick={() => {
                                let newrows=standardGameStartRows(whiteup);
                                setRows(newrows);
                            }}>
                                Standard Game Start Position
                            </button>
                        </p>
                        <p>
                            <button onClick={() => {
                                setMode('Solve');
                                setStartPosition(rows);
                                setSavedPositions([rows]);
                                setMoveStarted(false);
                                }}>Start Solving</button>
                        </p>
                    </div>
                :
                    <div>
                        <h1>Solve Mode</h1>
                        <p>Click the piece you want to move, then click the square you want to move it to.</p>
                        <p>To restart the puzzle, click
                            <button onClick={() => {
                                setRows(startPosition);
                                setSavedPositions([startPosition]);
                                setMoveStarted(false);
                                }}>Return To Start Position</button>
                        </p>
                        {savedPositions.length > 1 && <p>To undo the last move, click
                            <button onClick={() => {
                                console.log(savedPositions.length);
                                let newrows = JSON.parse(JSON.stringify(savedPositions[savedPositions.length-2]));
                                let newSavedPositions = JSON.parse(JSON.stringify(savedPositions));
                                newSavedPositions.pop();
                                setSavedPositions(newSavedPositions);
                                setRows(newrows);
                                setMoveStarted(false);
                                }}>Undo Last Move</button>
                        </p>}
                        <p>To begin a new puzzle, click
                            <button onClick={() => {
                                setMode('Setup');
                                setRows(initialRows());
                            }}>
                                New Puzzle
                            </button>
                        </p>
                    </div>
                }
            </div>
        </div>
    );
}
export default Options;