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
  return (
    <div className='App'>
      <header>
        <Options mode={mode} setMode={setMode} whiteup={whiteup} setWhiteup={setWhiteup}></Options>
        <div>
          <Board rows={rows} setRows={setRows} piece={piece} setPiece={setPiece} mode={mode} whiteup={whiteup}></Board>
        </div>
        <div>
          <Pieces setPiece={setPiece}></Pieces>
        </div>
      </header>
    </div>
  );
}

export default App;
