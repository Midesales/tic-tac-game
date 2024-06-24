

export default function GameBoard({ onSelectChange, board }) {
  
    // const [gameBoard, setGameBoard] = useState(initialGameBoard)

    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameBoard((prevGameBoard) => {
    //         const updateGameBoard = [...prevGameBoard.map((innerArray) => [...innerArray])]
    //         updateGameBoard[rowIndex][colIndex] = activePlayerSymbol
    //         return updateGameBoard
    //     })
    //     onSelect()
    // }
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                    {row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={()=>onSelectChange(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
                        </li>
                    ))}
                    </ol>
                </li>
            ))}
           
        </ol>
    )
}