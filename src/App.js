import React from 'react';
import './App.css';
import Grid from './GameBoard/Grid/Grid';
import Board from './Models/Board';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>react-snake</h1>
      </header>
      <Grid board={new Board(4, 8, 500)} />
    </div>
  );
}

export default App;
