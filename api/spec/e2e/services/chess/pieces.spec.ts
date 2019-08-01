import _ from 'lodash'

import { possibleMoves } from '../../../../src/services/chess/pieces'
import { clearTestData, db } from '../../../spec-helper'

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
          const reachable = new Set([11, 13, 18, 22, 34, 38, 43, 45])

          expect(new Set(possibleMoves(position, turns))).toEqual(reachable)
        })
      })

      describe('edge of board', () => {
        let position = 'A1'

        it('returns list of positions with boundaries', async () => {
          const reachable = new Set([7, 11, 16, 18])

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
            1,
            5,
            17,
            21,
            26,
            28,
            3,
            7,
            19,
            23,
            30,
            8,
            12,
            24,
            33,
            35,
            16,
            32,
            37,
            39,
            40,
            44,
            49,
            51,
            48,
            53,
            55,
            58,
            60,
            62,
          ])

          expect(new Set(possibleMoves(position, turns))).toEqual(reachable)
        })
      })

      describe('edge of board', () => {
        let position = 'A1'

        it('returns list of positions with boundaries', async () => {
          const reachable = new Set([1, 13, 17, 22, 24, 5, 21, 26, 28, 6, 10, 31, 33, 3, 8, 12, 35])

          expect(new Set(possibleMoves(position, turns))).toEqual(reachable)
        })
      })
    })
  })
})
