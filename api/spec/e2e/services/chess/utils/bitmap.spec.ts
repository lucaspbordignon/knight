import _ from 'lodash'

import { Bitmap } from '../../../../../src/services/chess/utils/bitmap'
import { clearTestData, db } from '../../../../spec-helper'

describe('Bitmap data structure', () => {
  afterEach(async () => {
    await clearTestData()
  })

  let bitmap = new Bitmap()

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
})
