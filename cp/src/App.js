import './App.css';
import {useState} from 'react';
import Options from './options';
import Board from './board';
import initialRows from './initialRows';
import Pieces from './pieces';
function App() {
  const [rows, setRows] = useState(initialRows);
  const [piece, setPiece] = useState('');
  const [mode, setMode] = useState('Setup');
  const [whiteup, setWhiteup] = useState(true);
  const [startPosition, setStartPosition] = useState([]);
  const [savedPositions, setSavedPositions] = useState([]);
  const [moveStarted, setMoveStarted] = useState(false);
  return (
    <div className='App'>
      <header>
        <Options
          mode={mode}
          setMode={setMode}
          whiteup={whiteup}
          setWhiteup={setWhiteup}
          rows={rows}
          setRows={setRows}
          startPosition={startPosition}
          setStartPosition={setStartPosition}
          savedPositions={savedPositions}
          setSavedPositions={setSavedPositions}
          setMoveStarted={setMoveStarted}
          >
        </Options>
        <Board
          rows={rows}
          setRows={setRows}
          piece={piece}
          setPiece={setPiece}
          mode={mode}
          whiteup={whiteup}
          savedPositions={savedPositions}
          setSavedPositions={setSavedPositions}
          moveStarted={moveStarted}
          setMoveStarted={setMoveStarted}
          >
        </Board>
        {mode === 'Setup' && <Pieces setPiece={setPiece}></Pieces>}
      </header>
    </div>
  );
}

export default App;
