import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'

import { changeTurns, getBoard, getPossibleMoves, initialState, showGrid } from './chess'

describe('chess duck', () => {
  let store
  let httpMock

  beforeEach(() => {
    httpMock = new MockAdapter(axios)
    store = configureMockStore()(initialState)
  })

  describe('turns actions', () => {
    let turns = 20

    it('dispatch right action', async () => {
      await changeTurns({ turns })(store.dispatch)

      const executedActions = store.getActions()
      const startedPayload = executedActions.find((action) => action.type === changeTurns.STARTED)

      expect(executedActions.map((action) => action.type)).toEqual([
        changeTurns.STARTED,
        changeTurns.SUCCEEDED,
        changeTurns.ENDED,
      ])

      expect(startedPayload).toEqual({
        type: changeTurns.STARTED,
        payload: { turns },
      })
    })
  })

  describe('board actions', () => {
    let mockedBoard = [[{ bitmap: 0 }, { bitmap: 1 }]]
    let mockedPayload = {
      data: {
        board: mockedBoard,
      },
    }

    it('dispatch right action', async () => {
      httpMock.onGet('/chess/board').reply(200, mockedPayload)

      await getBoard()(store.dispatch)

      const executedActions = store.getActions()
      const successPayload = executedActions.find((action) => action.type === getBoard.SUCCEEDED)

      expect(executedActions.map((action) => action.type)).toEqual([
        getBoard.STARTED,
        getBoard.SUCCEEDED,
        getBoard.ENDED,
      ])

      expect(successPayload).toEqual({
        type: getBoard.SUCCEEDED,
        payload: { data: mockedPayload },
      })
    })

    it('whene request is invalid', async () => {
      let error = 'Invalid request by any means'

      httpMock.onGet('/chess/board').reply(400, { error })

      await getBoard()(store.dispatch)

      const executedActions = store.getActions()
      const failedPayload = executedActions.find((action) => action.type === getBoard.FAILED)

      expect(executedActions.map((action) => action.type)).toEqual([getBoard.STARTED, getBoard.FAILED, getBoard.ENDED])

      expect(failedPayload).toEqual({
        type: getBoard.FAILED,
        payload: { error },
      })
    })
  })

  describe('moves actions', () => {
    let turns = 2
    let position = 'C4'

    let possibleMoves = ['C4', 'C8', 'D2']
    let mockedPayload = { data: { possibleMoves } }

    it('dispatch right action', async () => {
      httpMock.onGet('/chess/pieces/moves').reply(200, mockedPayload)

      await getPossibleMoves({ position, turns })(store.dispatch)

      const executedActions = store.getActions()
      const successPayload = executedActions.find((action) => action.type === getPossibleMoves.SUCCEEDED)

      expect(executedActions.map((action) => action.type)).toEqual([
        getPossibleMoves.STARTED,
        getPossibleMoves.SUCCEEDED,
        getPossibleMoves.ENDED,
      ])

      expect(successPayload).toEqual({
        type: getPossibleMoves.SUCCEEDED,
        payload: { data: mockedPayload },
      })
    })

    it('whene request is invalid', async () => {
      let error = 'Invalid request by any means'

      httpMock.onGet('/chess/pieces/moves').reply(400, { error })

      await getPossibleMoves({ position, turns })(store.dispatch)

      const executedActions = store.getActions()
      const failedPayload = executedActions.find((action) => action.type === getPossibleMoves.FAILED)

      expect(executedActions.map((action) => action.type)).toEqual([
        getPossibleMoves.STARTED,
        getPossibleMoves.FAILED,
        getPossibleMoves.ENDED,
      ])

      expect(failedPayload).toEqual({
        type: getPossibleMoves.FAILED,
        payload: { error },
      })
    })
  })

  describe('grid actions', () => {
    let grid = false

    it('dispatch right action', async () => {
      await showGrid({ grid })(store.dispatch)

      const executedActions = store.getActions()
      const startedPayload = executedActions.find((action) => action.type === showGrid.STARTED)

      expect(executedActions.map((action) => action.type)).toEqual([
        showGrid.STARTED,
        showGrid.SUCCEEDED,
        showGrid.ENDED,
      ])

      expect(startedPayload).toEqual({
        type: showGrid.STARTED,
        payload: { grid },
      })
    })
  })
})
