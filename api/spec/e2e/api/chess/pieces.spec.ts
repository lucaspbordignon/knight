import clone from 'lodash.clone'

import { apiRequest, clearTestData } from '../../../spec-helper'

describe('moves', () => {
  let endpoint = '/api/chess/pieces/moves'
  let boardSize = 8
  let piece = 'knight'
  let position = 'D4'
  let turns = 2

  afterEach(async () => {
    await clearTestData()
  })

  describe('success', () => {
    it('returns success status with possible moves', async () => {
      const { status, text } = await apiRequest.get(endpoint).query({
        boardSize,
        piece,
        position,
        turns,
      })
      const data = JSON.parse(text)

      expect(status).toEqual(200)
      expect(data.success).toEqual(true)
    })
  })

  describe('failure', () => {
    it('another piece', async () => {
      piece = 'king'

      const { text } = await apiRequest.get(endpoint).query({
        boardSize,
        piece,
        position,
        turns,
      })
      const data = JSON.parse(text)

      expect(data.success).toEqual(false)
      expect(data.error).toEqual('Only knight is a valid piece for moves checking')
    })

    it('invalid position', async () => {
      position = 'INVALID_POS'

      const { text } = await apiRequest.get(endpoint).query({
        boardSize,
        piece,
        position,
        turns,
      })
      const data = JSON.parse(text)

      expect(data.success).toEqual(false)
      expect(data.error).toEqual('The given position is not in algebraic notation')
    })
  })
})
