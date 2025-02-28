import Player from './components/Player.jsx'
function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initinalName = "Player 1" symbol = "X" />
          <Player initinalName = "Player 2" symbol = "O" />
        </ol>
        Game Board
      </div>
      LOG
    </main>
  );
}

export default App
