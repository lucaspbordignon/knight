import { renderBoard } from '../../services/chess/board'

export const board = (req, res): void => {
  const board = renderBoard()

  if (!board) {
    res.send({ success: false, error: 'Failure rendering the board.' })
  }

  res.send({ success: true, board })
}
