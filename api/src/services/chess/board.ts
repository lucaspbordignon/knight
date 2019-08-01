import _ from 'lodash'

const BOARD_SIZE = 8

const renderBoard = (boardSize = BOARD_SIZE): Array<Array<Boolean>> => {
  const board = new Array(boardSize)

  board.fill(new Array(boardSize).fill(false))

  return board
}

export { renderBoard }
