import { PositionChecker } from './utils'

const BOARD_SIZE = 8

const renderBoard = (boardSize = BOARD_SIZE): Array<Array<object>> => {
  const board = []

  PositionChecker.columns.map((col) => {
    const squares = []

    PositionChecker.rows.map((row) => {
      const algebraic = col + row.toString()
      const checker = new PositionChecker(algebraic)

      squares.push({ bitmap: checker.toBitmap(boardSize), algebraic })
    })

    board.push(squares)
  })

  return board
}

export { renderBoard }
