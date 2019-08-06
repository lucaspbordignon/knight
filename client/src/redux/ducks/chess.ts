import { handleActions } from 'redux-actions'
import { createActionThunk } from 'redux-thunk-actions'

import { getBoardData } from '../../api/chess/board'
import { getPossibleMovesData } from '../../api/chess/pieces'

/* Types */
const Types = {
  BOARD: 'chess/GET_BOARD',
  GRID: 'chess/SHOW_GRID',
  MOVES: 'chess/GET_POSSIBLE_MOVES',
  TURNS: 'chess/CHANGE_TURNS',
}

/* Actions */
export const getBoard = createActionThunk(Types.BOARD, () => getBoardData())

export const showGrid = createActionThunk(Types.GRID, ({ grid }) => {})

export const getPossibleMoves = createActionThunk(Types.MOVES, ({ position, turns }) =>
  getPossibleMovesData(position, turns),
)

export const changeTurns = createActionThunk(Types.TURNS, ({ turns }) => {})

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
