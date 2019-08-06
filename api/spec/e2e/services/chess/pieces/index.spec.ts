import { possibleMoves } from '../../../../../src/services/chess/pieces'
import { clearTestData, db } from '../../../../spec-helper'

describe('chess pieces service', () => {
  afterEach(async () => {
    await clearTestData()
  })

  describe('find next moves', () => {
    let position, turns

    describe('single turn', () => {
      let turns = 1

      describe('center of board', () => {
        let position = 'D4'

        it('returns list of bitmap positions', async () => {
          const reachable = new Set(['B3', 'B5', 'C2', 'C6', 'E2', 'E6', 'F3', 'F5'])

          expect(new Set(possibleMoves(position, turns))).toEqual(reachable)
        })
      })

      describe('edge of board', () => {
        let position = 'A1'

        it('returns list of positions with boundaries', async () => {
          const reachable = new Set(['B3', 'C2'])

          expect(new Set(possibleMoves(position, turns))).toEqual(reachable)
        })
      })
    })

    describe('multiple turns', () => {
      let turns = 2

      describe('center of board', () => {
        let position = 'D4'

        it('returns list of bitmap positions', async () => {
          const reachable = new Set([
            'A1',
            'A3',
            'A5',
            'A7',
            'B4',
            'B8',
            'C1',
            'C3',
            'C5',
            'C7',
            'D2',
            'D4',
            'D6',
            'D8',
            'E1',
            'E3',
            'E5',
            'E7',
            'F4',
            'F8',
            'G1',
            'G3',
            'G5',
            'G7',
            'H2',
            'H4',
            'H6',
          ])

          expect(new Set(possibleMoves(position, turns))).toEqual(reachable)
        })
      })

      describe('edge of board', () => {
        let position = 'A1'

        it('returns list of positions with boundaries', async () => {
          const reachable = new Set(['A1', 'A3', 'A5', 'B4', 'C1', 'C5', 'D2', 'D4', 'E1', 'E3'])

          expect(new Set(possibleMoves(position, turns))).toEqual(reachable)
        })
      })
    })
  })
})
