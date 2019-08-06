import Long from 'long'

import { Bitmap } from '../../../../../src/services/chess/utils/bitmap'
import { clearTestData, db } from '../../../../spec-helper'

describe('Bitmap data structure', () => {
  afterEach(async () => {
    await clearTestData()
  })

  let bitmap = new Bitmap()

  it('custom constructor', () => {
    const pos = new Long(0xf00000000, Long.UZERO)

    bitmap = new Bitmap(pos)

    expect(bitmap.map).toEqual(pos)
  })

  describe('setPosition()', () => {
    it('must set upper bits', () => {
      const position = 8

      expect(bitmap.isSet(position)).toBeFalsy()
      bitmap.setPosition(position)
      expect(bitmap.isSet(position)).toBeTruthy()
    })

    it('must set lower bits', () => {
      const position = 58

      expect(bitmap.isSet(position)).toBeFalsy()
      bitmap.setPosition(position)
      expect(bitmap.isSet(position)).toBeTruthy()
    })
  })

  describe('unsetPosition()', () => {
    it('must unset upper bits', () => {
      const position = 0

      expect(bitmap.isSet(position)).toBeFalsy()
      bitmap.setPosition(position)
      expect(bitmap.isSet(position)).toBeTruthy()

      bitmap.unsetPosition(position)
      expect(bitmap.isSet(position)).toBeFalsy()
    })

    it('must unset lower bits', () => {
      const position = 45

      expect(bitmap.isSet(position)).toBeFalsy()
      bitmap.setPosition(position)
      expect(bitmap.isSet(position)).toBeTruthy()

      bitmap.unsetPosition(position)
      expect(bitmap.isSet(position)).toBeFalsy()
    })
  })

  describe('columnMask()', () => {
    const size = 8

    it('for column A', () => {
      const index = 0
      const columnIndexes = [...new Array(size).keys()].map((i) => index + i * size)

      const mask = Bitmap.columnMask(index, size)

      columnIndexes.forEach((item) => {
        expect(mask.isSet(item)).toBeTruthy()
      })
    })

    it('for other column', () => {
      const index = 1 /* Column B */
      const otherIndex = 0 /* Column A */
      const columnIndexes = [...new Array(size).keys()].map((i) => index + i * size)
      const otherColumnIndexes = [...new Array(size).keys()].map((i) => otherIndex + i * size)

      const mask = Bitmap.columnMask(index, size)

      columnIndexes.forEach((item) => {
        expect(mask.isSet(item)).toBeTruthy()
      })

      otherColumnIndexes.forEach((item) => {
        expect(mask.isSet(item)).toBeFalsy()
      })
    })
  })

  describe('applyMask()', () => {
    const size = 8

    it('present on that column', () => {
      const position = 10 /* Column C */

      expect(bitmap.setPosition(position)).toBeTruthy()
      expect(bitmap.isSet(position)).toBeTruthy()

      bitmap.applyMask(['C'])

      expect(bitmap.isSet(position)).toBeFalsy()
    })

    it('not present on that column', () => {
      const position = 10 /* Column C */

      expect(bitmap.setPosition(position)).toBeTruthy()
      expect(bitmap.isSet(position)).toBeTruthy()

      bitmap.applyMask(['H'])

      expect(bitmap.isSet(position)).toBeTruthy()
    })

    describe('multiple masks', () => {
      it('not present on that column', () => {
        const position = 10 /* Column C */

        expect(bitmap.setPosition(position)).toBeTruthy()
        expect(bitmap.isSet(position)).toBeTruthy()

        bitmap.applyMask(['G', 'H'])

        expect(bitmap.isSet(position)).toBeTruthy()
      })
    })
  })
})
