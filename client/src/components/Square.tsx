import * as React from 'react'

import { Col } from 'antd'

import './square.scss'

interface SquareProps {
  algebraicPosition: string
  bitmapPosition: number
  boardSize: number
  selectedPositions: Array<string>

  onClick: (position: any) => void
}

const Square: React.FunctionComponent<SquareProps> = (props) => {
  const { algebraicPosition, bitmapPosition, boardSize, selectedPositions } = props

  /* Check with which color paint the square, based on bitmap position */
  const isOddSquare = (): boolean => {
    const row = bitmapPosition % boardSize
    const colDelta = Math.floor(bitmapPosition / boardSize) % 2

    if (row === 0) return (row + 1 + colDelta) % 2 === 0

    return (row + colDelta) % 2 === 0
  }

  /* Check current position to change square color */
  const isSelected = (): boolean => selectedPositions.indexOf(algebraicPosition) >= 0

  const squareClasses = (): string => {
    if (isSelected()) {
      return 'square selected'
    }
    if (isOddSquare()) {
      return 'square odd'
    }

    return 'square'
  }

  return <Col span={3} className={squareClasses()} onClick={() => props.onClick(algebraicPosition)} />
}

export { Square }
