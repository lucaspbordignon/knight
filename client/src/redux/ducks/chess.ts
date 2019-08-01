import { handleActions } from 'redux-actions'
import { createActionThunk } from 'redux-thunk-actions'

import { getBoardData } from '../../api/chess/board'

export const initialState = {
  board: [],
  loading: false,
  error: null,
}

export const getBoard = createActionThunk('GET_BOARD', () => getBoardData())

export const chess = handleActions(
  {
    [getBoard.STARTED]: (state) => ({
      ...state,
      loading: true,
    }),
    [getBoard.SUCCEEDED]: (state, action) => ({
      ...state,
      board: action.payload.data.board,
      error: null,
    }),
    [getBoard.FAILED]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }),
    [getBoard.ENDED]: (state) => ({
      ...state,
      loading: false,
    }),
  },
  initialState,
)
