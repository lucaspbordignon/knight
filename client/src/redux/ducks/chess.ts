import { handleActions } from 'redux-actions'
import { createActionThunk } from 'redux-thunk-actions'

import { getBoardData } from '../../api/chess/board'
import { getPossibleMovesData } from '../../api/chess/pieces'

/* Types */
const Types = {
  BOARD: 'chess/GET_BOARD',
  MOVES: 'chess/GET_POSSIBLE_MOVES',
}

/* Actions */
export const getBoard = createActionThunk(Types.BOARD, () => getBoardData())

export const getPossibleMoves = createActionThunk(Types.MOVES, ({ position, turns }) =>
  getPossibleMovesData(position, turns),
)

/* Reducers */

export const initialState = {
  board: [],
  boardSize: 8,
  currentPosition: null,
  possibleMoves: [],

  loading: false,
  error: null,
}

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

    [getPossibleMoves.STARTED]: (state, action) => ({
      ...state,
      currentPosition: action.payload.position,
    }),
    [getPossibleMoves.SUCCEEDED]: (state, action) => ({
      ...state,
      possibleMoves: action.payload.data.possibleMoves,
      error: null,
    }),
    [getPossibleMoves.FAILED]: (state, action) => ({
      ...state,
      error: action.payload.error,
    }),
  },
  initialState,
)
