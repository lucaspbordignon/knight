import { possibleMoves } from '../../services/chess/pieces'
import { PositionChecker } from '../../services/chess/utils'

export const moves = (req, res): void => {
  const { boardSize, piece, position, turns } = req.query
  const checker = new PositionChecker(position)

  if (!checker.valid()) res.send({ success: false, error: checker.errors })

  if (piece != 'knight') res.send({ success: false, error: 'Only knight is a valid piece for moves checking' })

  res.send({
    success: true,
    possibleMoves: possibleMoves(position, parseInt(turns), parseInt(boardSize)),
  })
}
