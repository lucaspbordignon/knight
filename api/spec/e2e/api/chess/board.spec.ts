import clone from 'lodash.clone'

import { apiRequest, clearTestData } from '../../../spec-helper'

describe('board', () => {
  let endpoint = '/api/chess/board'

  afterEach(async () => {
    await clearTestData()
  })

  it('returns success status with given board', async () => {
    const { status, text } = await apiRequest.get(endpoint)
    const data = JSON.parse(text)

    expect(status).toEqual(200)
    expect(data.success).toEqual(true)
    expect(data.board).not.toBeUndefined()
  })
})
