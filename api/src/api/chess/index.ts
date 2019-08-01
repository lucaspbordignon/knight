import express from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'

import { config } from '../../config'
import { board } from './board'

const router = express.Router()

router.get('/board', asyncHandler(board))

export const chessActions = router
