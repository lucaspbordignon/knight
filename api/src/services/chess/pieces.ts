import _ from 'lodash'

import { PositionChecker } from './utils'

const BOARD_SIZE = 8

/* Apply Breadth First Search to find all positions */
const possibleMoves = (position: string, turns: number, boardSize: number = BOARD_SIZE): Array<Number> => {
  const bitmapPosition = new PositionChecker(position).toBitmap(boardSize)

  return [bitmapPosition]
}

export { possibleMoves }
