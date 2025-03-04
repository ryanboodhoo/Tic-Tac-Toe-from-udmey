import { useState } from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './Winning-Combinations.js';

const PLAYERS = {
  X : "Player 1",
  O : "Player 2"
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gamesTurns) {
  let currentPlayer = 'X';

  if (gamesTurns.length > 0 && gamesTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function derivedWinner(gameBoard,players){
  let winner;

  for (const Combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[Combinations[0].row][Combinations[0].column];
    const secondSquareSymbol = gameBoard[Combinations[1].row][Combinations[1].column];
    const thridSquareSymbol = gameBoard[Combinations[2].row][Combinations[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thridSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;

}

function derivedGameBoard(gamesTurns){

  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gamesTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  
  const [players, setPlayers] = useState(PLAYERS);
  
  const [gamesTurns, setGameTurns] = useState([]);

  const activePlayer = derivedActivePlayer(gamesTurns);

const gameBoard = derivedGameBoard(gamesTurns);

 const winner = derivedWinner(gameBoard,players);
  
const hadsDraw  = gamesTurns.length === 9 && !winner;



  function handleSelectSquare(rowIndex, colIndex) {
     setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      console.log("Updated Turns:", updatedTurns); // Log the updated turns
      return updatedTurns;
    });
    console.log("Gameboard:", gameBoard); // log the gameboard after a turn.
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayers(
      prevPlayers => ({
        ...prevPlayers,
        [symbol]: newName
      })
    );
  }
  console.log("Current Gameboard:", gameBoard); // Log the gameBoard before rendering
  console.log("Current Turns:", gamesTurns); //log the current turns before rendering.


  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
          initialName={PLAYERS.X}
          symbol="X" 
          isActive={activePlayer === "X"} 
          onChangeName={handlePlayerNameChange}
          />
          <Player 
          initialName={PLAYERS.O}
          symbol="O" 
          isActive={activePlayer === "O"} 
          onChangeName={handlePlayerNameChange}

          />

        </ol>
        {(winner || hadsDraw) && <GameOver winner={winner} onRestart={handleRestart } />}
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} board={gameBoard} />
        </div>
      <Log turns={gamesTurns} />
    </main>
  );
}

export default App;