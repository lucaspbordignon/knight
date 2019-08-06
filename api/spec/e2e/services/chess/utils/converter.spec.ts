import _ from 'lodash'

import { PositionConverter } from '../../../../../src/services/chess/utils/converter'
import { clearTestData, db } from '../../../../spec-helper'

describe('chess utils', () => {
  afterEach(async () => {
    await clearTestData()
  })

  describe('position check', () => {
    let converter = PositionConverter

    describe('valid algebraic position', () => {
      let position = 'C3'

      describe('toBitmap()', () => {
        it('returns the right value to 8x8 board', async () => {
          const bitmapPosition = converter.toBitmap(position, 8)

          expect(bitmapPosition).toEqual(18)
        })
      })
    })

    describe('valid bitmap position', () => {
      let position = 20

      describe('toAlgebraic()', () => {
        it('returns the right value to 8x8 board', async () => {
          const algPosition = converter.toAlgebraic(position, 8)

          expect(algPosition).toEqual('C5')
        })

        it('returns the right value to 8x8 board on edge', async () => {
          position = 7

          const algPosition = converter.toAlgebraic(position, 8)

          expect(algPosition).toEqual('A8')
        })
      })
    })
  })
})
