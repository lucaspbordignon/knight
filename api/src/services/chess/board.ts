import { PositionConverter } from './utils/converter'

const BOARD_SIZE = 8

const renderBoard = (boardSize = BOARD_SIZE): Array<Array<object>> => {
  const board = []

  PositionConverter.cols.map((col) => {
    const squares = []

    PositionConverter.rows.map((row) => {
      const algebraic = col + row.toString()

      squares.push({ bitmap: PositionConverter.toBitmap(algebraic, boardSize), algebraic })
    })

    board.push(squares)
  })

  return board
}

export { renderBoard }
