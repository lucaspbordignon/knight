import { handleActions } from 'redux-actions'
import { createActionThunk } from 'redux-thunk-actions'

import { getBoardData } from '../../api/chess/board'
import { getPossibleMovesData } from '../../api/chess/pieces'

/* Types */
export const Types = {
  CHANGE_TURNS: 'chess/CHANGE_TURNS',
  GET_BOARD: 'chess/GET_BOARD',
  GET_POSSIBLE_MOVES: 'chess/GET_POSSIBLE_MOVES',
  SHOW_GRID: 'chess/SHOW_GRID',
}

/* Actions */
export const changeTurns = createActionThunk(Types.CHANGE_TURNS, ({ turns }) => {})

export const getBoard = createActionThunk(Types.GET_BOARD, () => getBoardData())

export const getPossibleMoves = createActionThunk(Types.GET_POSSIBLE_MOVES, ({ position, turns }) =>
  getPossibleMovesData(position, turns),
)

export const showGrid = createActionThunk(Types.SHOW_GRID, ({ grid }) => {})

/* Reducers */

export const initialState = {
  board: [],
  boardSize: 8,
  currentPosition: null,
  possibleMoves: [],
  turns: 2,
  grid: true,

  loading: false,
  error: null,
}

export const chess = handleActions(
  {
    [changeTurns.STARTED]: (state, action) => ({
      ...state,
      turns: action.payload.turns,
    }),
    [showGrid.STARTED]: (state, action) => ({
      ...state,
      grid: action.payload.grid,
    }),
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
