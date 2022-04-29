import './App.css';
import {useState} from 'react';
import Board from './board';
import initialRows from './initialRows';
import Pieces from './pieces';
function App() {
  const [rows, setRows] = useState(initialRows);
  return (
    <div className='App'>
      <header>
        <div>
          <Board rows={rows}></Board>
        </div>
        <div>
          <Pieces></Pieces>
        </div>
      </header>
    </div>
  );
}

export default App;
