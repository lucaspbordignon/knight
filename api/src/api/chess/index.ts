import express from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'

import { config } from '../../config'
import { board } from './board'
import { moves } from './pieces'

const router = express.Router()

router.get('/board', asyncHandler(board))
router.get('/pieces/moves', asyncHandler(moves))

export const chessActions = router
