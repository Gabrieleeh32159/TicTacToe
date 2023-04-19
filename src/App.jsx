import { useState } from "react"
import Square from "./components/Square"

const TURNS = {
  X: 'X',
  O: 'O'
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) //null, no hay ganador, y false que hay un empate

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null
  }

  const checkEndGame = (boardToCheck) => {
    for (const element of boardToCheck) {
      if (element === null) {
        return false;
      }
    }
    return true
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return


    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className="flex flex-col justify-center items-center h-screen bg-slate-800 gap-10">
      <h1 className="text-6xl text-white">Tic Tac Toe</h1>
      <section className="grid grid-cols-3 grid-rows-3 gap-3">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          }

          )
        }
      </section>
      <section className="flex gap-10 scale-75">
        <Square isSelected={turn === TURNS.X} toTurn={true}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O} toTurn={true}>{TURNS.O}</Square>
      </section>
      {winner !== null && (
        <section className="text-4xl text-white flex flex-col items-center gap-3 -translate-y-6">
        <h1 className="">
          {winner === false ? 'Empate' : 'Gano ' + winner}
        </h1>
        <button className="bg-white text-black rounded-xl p-3 transition-all hover:bg-slate-400" onClick={resetGame}>Jugar de nuevo</button>
        </section>
      )}
    </main>
  )
}