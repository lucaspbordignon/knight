import * as React from 'react'

import { Col } from 'antd'

import './square.scss'

interface SquareProps {
  algebraicPosition: string
  bitmapPosition: number
  boardSize: number
  selectedPositions: Array<string>
  currentPosition: string

  onClick: (position: any) => void
}

const Square: React.FunctionComponent<SquareProps> = (props) => {
  const { algebraicPosition, bitmapPosition, boardSize, selectedPositions, currentPosition } = props

  /* Check with which color paint the square, based on bitmap position */
  const isOddSquare = (): boolean => {
    const row = bitmapPosition % boardSize
    const colDelta = Math.floor(bitmapPosition / boardSize) % 2

    return (row + colDelta) % 2 === 0
  }

  /* Check current position to change square color */
  const isSelected = (): boolean => selectedPositions.indexOf(algebraicPosition) >= 0

  /* Check the knight position */
  const isKnight = (): boolean => currentPosition === algebraicPosition

  const squareClasses = (): string => {
    let classes = 'square'

    if (isKnight()) {
      classes = classes + ' knight'
    }

    if (isSelected()) {
      return classes + ' selected'
    }

    if (isOddSquare()) {
      return classes + ' odd'
    }

    return classes
  }

  return <Col span={3} onClick={() => props.onClick(algebraicPosition)} className={squareClasses()} />
}

export { Square }
