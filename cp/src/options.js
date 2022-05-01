import initialRows from './initialRows';

const Options = ({mode='', setMode, whiteup=true, setWhiteup, rows, setRows, startPosition, setStartPosition}) => {
    return (
        <div>
            <h1>Options</h1>
            <div className='optionsDiv'>
                {mode === 'Setup' ?
                    <div>
                        <h1>Setup Mode</h1>
                        <p>Click a piece from the Pieces to select.</p>
                        <p>Click a square on the Board to place it there.</p>
                        <p>Once the Board matches your chess puzzle, Click
                            <button onClick={() => {
                                setMode('Solve');
                                setStartPosition(rows);
                                }}>Start Solving</button>
                        </p>
                        <h1>Orientation</h1>
                        <div className={whiteup ? 'optionsRadio On' : 'optionsRadio'}
                            onClick={() => {setWhiteup(true);}}>
                            <label>White playing upwards</label>
                        </div>
                        <div className={!whiteup ? 'optionsRadio On' : 'optionsRadio'}
                            onClick={() => {setWhiteup(false);}}>
                            <label>Black playing upwards</label>
                        </div>
                    </div>
                :
                    <div>
                        <h1>Solve Mode</h1>
                        <p>Click the piece you want to move, then click the square you want to move it to.</p>
                        <p>To restart the puzzle, click
                            <button onClick={() => {setRows(startPosition);}}>Start Position</button>
                        </p>
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