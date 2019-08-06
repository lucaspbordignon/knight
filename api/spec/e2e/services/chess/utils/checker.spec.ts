import { PositionChecker } from '../../../../../src/services/chess/utils/checker'
import { clearTestData } from '../../../../spec-helper'

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

      describe('isAlgebraicPosition()', () => {
        it('returns true', async () => {
          expect(checker.isAlgebraicPosition()).toBeTruthy()
          expect(checker.errors).toBeNull()
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

      describe('isAlgebraicPosition()', () => {
        it('returns false', async () => {
          expect(checker.isAlgebraicPosition()).toBeFalsy()
          expect(checker.errors).toEqual('The given position is not in algebraic notation')
        })
      })
    })
  })
})
