import { possibleMoves } from '../../../../../src/services/chess/pieces'
import { Knight } from '../../../../../src/services/chess/pieces/knight'

import { clearTestData, db } from '../../../../spec-helper'

describe('Knight', () => {
  afterEach(async () => {
    await clearTestData()
  })

  describe('moves', () => {
    let piece
    let position
    let bitmap

    describe('find all possible moves', () => {
      it('edge of the board', () => {
        position = 0
        piece = new Knight(position)

        expect(piece.possibleMoves()).toEqual([10, 17])
      })

      it('center of the board', () => {
        position = 31
        piece = new Knight(position)

        expect(piece.possibleMoves()).toEqual([14, 21, 37, 46])
      })

      it('updating bitboard', () => {
        position = 0
        piece = new Knight(position)

        bitmap = piece.bitmap

        expect(piece.possibleMoves(true)).toEqual([10, 17])
        expect(piece.bitmap).not.toEqual(bitmap)
      })
    })
  })
})
