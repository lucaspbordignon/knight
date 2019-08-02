import _ from 'lodash'

import { renderBoard } from '../../../../src/services/chess/board'
import { clearTestData, db } from '../../../spec-helper'

describe('board service', () => {
  afterEach(async () => {
    await clearTestData()
  })

  it('renders an empty game board', async () => {
    const board = renderBoard()

    expect(board).not.toBeUndefined()
    expect(board.length).toEqual(8)

    const sampleSquare = board[0][0]

    expect(sampleSquare['algebraic']).not.toBeNull()
    expect(sampleSquare['bitmap']).not.toBeNull()
  })
})
