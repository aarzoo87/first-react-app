import { useState } from "react";
import './App.css';
import Confetti from 'react-confetti';
import WinnerModal from './WinnerModal';

function Square({ value, onSquareClick }) {

  return (
      <button className="square" onClick={onSquareClick}>{value}</button>
  );
}

function Board() {
  const[xIsNext, setXIsNext] = useState(true);
  const[square, setSquare] = useState(Array(9).fill(null));
  const[gameover, setgameover] = useState(false);
  const [playerX, setPlayerX] = useState("Player X");
  const [playerO, setPlayerO] = useState("Player O");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleClick(i) {
    if(gameover || square[i]){
      return;
    }
    const nextsquare = square.slice();
    if(xIsNext){
      nextsquare[i] = 'X';
    }else{
      nextsquare[i] = 'O';
    }
    if(calculateWinner(nextsquare)){
      setgameover(true);
      setIsModalOpen(true);
    }
    setSquare(nextsquare);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = `Winner: ${winner === 'X' ? playerX : playerO}`;
  } else {
    status = `Next player: ${xIsNext ? playerX : playerO}`;
  }
  const isDraw = square.every(Boolean) && !winner;

  if (isDraw) {
    status = "It's a draw!";
  }

  function resetGame() {
    setSquare(Array(9).fill(null));
    setXIsNext(true);
    setgameover(false);
    setIsModalOpen(false);
  }

  return(
    <div className="board">
      <h1>Tic Tac Toe Game</h1>
      <div className="player-inputs">
        <input
          type="text"
          value={playerX}
          onChange={(e) => setPlayerX(e.target.value)}
          placeholder="Enter Player X's name"
        />
        <input
          type="text"
          value={playerO}
          onChange={(e) => setPlayerO(e.target.value)}
          placeholder="Enter Player O's name"
        />
      </div>
      <h2>{status}</h2>
      <div className="board-row">
        <Square value={square[0]} onSquareClick={() => handleClick(0)} />
        <Square value={square[1]} onSquareClick={() => handleClick(1)} />
        <Square value={square[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={square[3]} onSquareClick={() => handleClick(3)} />
        <Square value={square[4]} onSquareClick={() => handleClick(4)} />
        <Square value={square[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={square[6]} onSquareClick={() => handleClick(6)} />
        <Square value={square[7]} onSquareClick={() => handleClick(7)} />
        <Square value={square[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <button onClick={() => resetGame()} className="reset-button">Reset Game</button>
      {gameover && <Confetti />}
      <WinnerModal winner={winner} playerName={winner === 'X' ? playerX : playerO} isOpen={isModalOpen} onClose={resetGame} />
    </div>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


export default Board;