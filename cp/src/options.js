const Options = ({mode='', setMode, whiteup=true, setWhiteup}) => {
    return (
        <div>
            <h1>Options</h1>
            <div className='optionsDiv'>
            <h1>Mode</h1>
            <div className={mode === 'Setup' ? 'optionsRadio On' : 'optionsRadio'}
                onClick={() => {setMode('Setup');}}>
                <label>Setting up the position</label>
            </div>
            <div className={mode === 'Solving' ? 'optionsRadio On' : 'optionsRadio'}
                onClick={() => {setMode('Solving');}}>
                <label>Solving the puzzle</label>
            </div>
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
        </div>
    );
}
export default Options;