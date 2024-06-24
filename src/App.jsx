import { useState } from "react"
import PlayerInfo from "./component/PlayerInfo"
import GameBoard from "./component/gameBoard"
import Log from "./component/log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./component/gameOver"

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = '0'
  }
  return currentPlayer
}

function App() {
  // const [activePlayer, setActivePlayer] = useState('X')
  const [gameTurns, setGameTurns] = useState([])
  const [players, setPlayers] = useState({
    X: 'Player 1',
    0: 'Player 2'
  })
  const activePlayer = deriveActivePlayer(gameTurns)

  let gameBoard = [...initialGameBoard.map(array=>[...array])]

  for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square
      gameBoard[row][col] = player
  }
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol]
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;
  
  function handleSelectSquare(rowIdex, colIndex) {
    //setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? '0' : 'X')
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns)

      const updatedTurns = [
        {square: {row: rowIdex, col: colIndex}, player: currentPlayer}, ...prevTurns
      ]
      return updatedTurns
    })
  }

  function handleRestart() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }
  return (
    <main>
      <div id="game-container">
      <ol id="players" className="highlight-player">
          <PlayerInfo initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
        <PlayerInfo initialName = "Player 2" symbol = "0" isActive={activePlayer === '0'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectChange={handleSelectSquare} activePlayerSymbol={activePlayer} board={gameBoard} />
      </div>
      
      <Log turns={gameTurns} />
      </main>
  )
}

export default App
