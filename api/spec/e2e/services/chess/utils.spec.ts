import _ from 'lodash'

import { PositionChecker } from '../../../../src/services/chess/utils'
import { clearTestData, db } from '../../../spec-helper'

describe('chess utils', () => {
  afterEach(async () => {
    await clearTestData()
  })

  describe('position check', () => {
    let checker

    describe('valid position', () => {
      let position = 'C3'

      beforeEach(() => {
        checker = new PositionChecker(position)
      })

      describe('valid()', () => {
        it('returns true', async () => {
          expect(checker.valid()).toBeTruthy()
          expect(checker.errors).toBeNull()
        })
      })

      describe('algebraicPosition()', () => {
        it('returns true', async () => {
          expect(checker.algebraicPosition()).toBeTruthy()
          expect(checker.errors).toBeNull()
        })
      })

      describe('toBitmap()', () => {
        it('returns the right value to 8x8 board', async () => {
          const position = checker.toBitmap(8)

          expect(position).toEqual(19) /* C: Third col, 3: Third row */
        })
      })
    })

    describe('invalid position', () => {
      let position = 'ANY_WRONG_POSITION'

      beforeEach(() => {
        checker = new PositionChecker(position)
      })

      describe('valid()', () => {
        it('returns false', async () => {
          expect(checker.valid()).toBeFalsy()
          expect(checker.errors).toEqual('The given position is not in algebraic notation')
        })
      })

      describe('algebraicPosition()', () => {
        it('returns false', async () => {
          expect(checker.algebraicPosition()).toBeFalsy()
          expect(checker.errors).toEqual('The given position is not in algebraic notation')
        })
      })

      describe('toBitmap()', () => {
        it('returns the right value to 8x8 board', async () => {
          const position = checker.toBitmap(8)

          expect(position).toBeNull()
        })
      })
    })
  })
})
