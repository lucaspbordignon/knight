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

    describe('find all possible moves', () => {
      it('edge of the board', () => {
        position = 0
        piece = new Knight(position)

        expect(piece.possibleMoves(true)).toEqual([])
      })

      it('center of the board', () => {
        position = 31
        piece = new Knight(position)

        expect(piece.possibleMoves()).toEqual([])
      })
    })
  })
})
