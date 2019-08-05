import { Knight } from './knight'

import { PositionChecker } from '../utils/checker'
import { PositionConverter } from '../utils/converter'

const BOARD_SIZE = 8

/* Apply Breadth First Search to find all positions */
const possibleMoves = (position: string, turns: number, boardSize: number = BOARD_SIZE): Array<string> => {
  const checker = new PositionChecker(position)

  if (checker.isAlgebraicPosition())
    return allValidMoves(PositionConverter.toBitmap(position, boardSize), turns, boardSize)

  return allValidMoves(parseInt(position), turns, boardSize)
}

/* Find all valid moves based on an initial position and number of turns */
const allValidMoves = (position: number, turns: number, boardSize: number): Array<string> => {
  const piece = new Knight(position)
  let lastPossibleMoves = []

  for (let i = 0; i < turns; i++) lastPossibleMoves = piece.possibleMoves(true)

  return lastPossibleMoves.map((index) => PositionConverter.toAlgebraic(index, boardSize))
}

export { possibleMoves }
