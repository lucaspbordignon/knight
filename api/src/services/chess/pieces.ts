import { PositionChecker } from './utils/checker'
import { PositionConverter } from './utils/converter'

const BOARD_SIZE = 8

/* Apply Breadth First Search to find all positions */
const possibleMoves = (position: string, turns: number, boardSize: number = BOARD_SIZE): Array<Number> => {
  const checker = new PositionChecker(position)

  if (checker.isAlgebraicPosition()) {
    return allValidMoves(0, turns, PositionConverter.toBitmap(position, boardSize))
  }

  return allValidMoves(0, turns, parseInt(position))
}

/* Find all valid moves based on an initial position and number of turns */
const allValidMoves = (
  currentTurn: number,
  finalTurn: number,
  initialPosition?: number,
  computedMoves: object = {},
): Array<number> => {
  if (currentTurn === 0) computedMoves[currentTurn.toString()] = new Set([initialPosition])

  const nextTurn = currentTurn + 1
  const reachablePositions = [...computedMoves[currentTurn.toString()]]

  computedMoves[nextTurn.toString()] = new Set()

  reachablePositions.map((position) => validMoves(position).map((move) => computedMoves[nextTurn].add(move)))

  if (nextTurn === finalTurn) {
    return [...computedMoves[finalTurn]]
  }

  return allValidMoves(nextTurn, finalTurn, initialPosition, computedMoves)
}

/* All valid moves for the given position */
const validMoves = (position: number): Array<number> =>
  PositionConverter.displacements
    .map((delta) => {
      const finalPos = delta + position

      if (PositionChecker.validMove(finalPos)) {
        return finalPos
      }
    })
    .filter((pos) => pos)

export { possibleMoves }
