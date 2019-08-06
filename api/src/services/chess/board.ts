import { PositionConverter } from './utils/converter'

const BOARD_SIZE = 8

const renderBoard = (boardSize = BOARD_SIZE): Array<Array<object>> => {
  const board = []
  const allCols = PositionConverter.cols
  const allRows = [...PositionConverter.rows]

  allRows.reverse()

  allRows.map((row) => {
    const squares = []

    allCols.map((col) => {
      const algebraic = col + row.toString()

      squares.push({ bitmap: PositionConverter.toBitmap(algebraic, boardSize), algebraic })
    })

    board.push(squares)
  })

  return board
}

export { renderBoard }
