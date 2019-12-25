import React, { useState } from 'react';
import './App.css';
import Grid from './GameBoard/Grid/Grid';
import Board from './Models/Board';
import { getHiscore } from './Models/Hiscore';

function App() {
  const [board, setBoard] = useState(new Board(3, 12, 400));
  return (
    <div className="App">
      <header className="App-header">
        <h1>shanali-snake</h1>
        <h1 style={{marginLeft: '30px'}}>Hiscore: {getHiscore()}</h1>
      </header>
      <Grid board={board} onRestart={() => setBoard(new Board(3, 12, 400))} />
    </div>
  );
}

export default App;
